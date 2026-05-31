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
    // No store configured yet — accept the signup so the UI works, but make the
    // gap visible in logs rather than silently dropping the address.
    console.warn("[waitlist] KV not configured — signup accepted, NOT stored:", email);
    return json({ ok: true });
  }

  try {
    // Set membership dedupes for free (sadd is a no-op on an existing member).
    await kv.sadd(WAITLIST_KEY, email);
    return json({ ok: true });
  } catch (err) {
    console.error("[waitlist] KV write failed:", err);
    return json({ ok: false, error: "Something went wrong. Try again." }, 500);
  }
};
