import type { APIRoute } from "astro";
import { createClient } from "@vercel/kv";

// On-demand server route (the rest of the site is static). Served as a Vercel
// serverless function via the adapter.
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WAITLIST_KEY = "waitlist:emails";

// Reuse the conan-license Vercel KV store (Upstash Redis under the hood). Read
// creds from Vite env (local .env) or process.env (Vercel function). When they
// aren't set — e.g. local dev before `vercel env pull` — we skip persistence
// and still accept the signup, so the form works end-to-end either way.
const url = import.meta.env.KV_REST_API_URL ?? process.env.KV_REST_API_URL;
const token = import.meta.env.KV_REST_API_TOKEN ?? process.env.KV_REST_API_TOKEN;
const kv = url && token ? createClient({ url, token }) : null;

// Resend — forward each new signup to the team inbox. Optional: when the API key
// isn't set we skip the email (the KV record is the source of truth), so the form
// still works end-to-end. NOTIFY_FROM must be on a Resend-verified domain
// (conan.sh); both addresses are env-overridable.
const resendKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
const NOTIFY_TO =
  import.meta.env.WAITLIST_NOTIFY_TO ?? process.env.WAITLIST_NOTIFY_TO ?? "hello@conan.sh";
const NOTIFY_FROM =
  import.meta.env.WAITLIST_FROM ?? process.env.WAITLIST_FROM ?? "Conan <noreply@conan.sh>";

// Best-effort notification — never throws into the request path. A failed
// forward must not fail the signup (the address is already saved in KV).
async function forwardSignup(email: string, total: number | null) {
  if (!resendKey) {
    console.warn("[waitlist] RESEND_API_KEY not set — new signup NOT forwarded:", email);
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${resendKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        reply_to: email, // hit reply → reaches the subscriber
        subject: `New Conan signup: ${email}`,
        text:
          `New Conan news/updates signup.\n\n` +
          `Email: ${email}\n` +
          (total != null ? `Total subscribers: ${total}\n` : "") +
          `\nSource: conan.sh updates form`,
      }),
    });
    if (!res.ok) {
      console.error(
        "[waitlist] Resend forward failed:",
        res.status,
        await res.text().catch(() => ""),
      );
    }
  } catch (err) {
    console.error("[waitlist] Resend forward error:", err);
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let data: { email?: string; company?: string };
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "Malformed request." }, 400);
  }

  // Honeypot: real users never fill this. Pretend success so bots learn nothing.
  if (data.company) return json({ ok: true });

  const email = (data.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Enter a valid email address." }, 422);
  }

  if (!kv) {
    // No store configured — accept the signup so the UI works, but make the gap
    // visible in logs. Still forward so the address isn't lost while storage is down.
    console.warn("[waitlist] KV not configured — signup accepted, NOT stored:", email);
    await forwardSignup(email, null);
    return json({ ok: true });
  }

  try {
    // Set membership dedupes for free; sadd returns 1 only when the member is new.
    const added = await kv.sadd(WAITLIST_KEY, email);
    if (added === 1) {
      const total = await kv.scard(WAITLIST_KEY).catch(() => null);
      await forwardSignup(email, total); // forward new signups only — no dupes
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[waitlist] KV write failed:", err);
    return json({ ok: false, error: "Something went wrong. Try again." }, 500);
  }
};
