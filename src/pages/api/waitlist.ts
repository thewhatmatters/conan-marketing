import type { APIRoute } from "astro";

// On-demand server route (the rest of the site is static). Served as a Vercel
// serverless function via the adapter.
export const prerender = false;

// STUB — validates + honeypots, but does NOT persist yet. Follow-up wires this
// to the Upstash KV instance shared with conan-license (UPSTASH_REDIS_REST_URL
// / _TOKEN env). Until then it accepts valid emails so the form UI is testable.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const email = (data.email ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Enter a valid email address." }, 422);
  }

  // TODO(waitlist-backend): persist to Upstash KV (SADD waitlist:emails) +
  // dedupe. Stubbed until env creds are wired into this project + Vercel.
  return json({ ok: true });
};
