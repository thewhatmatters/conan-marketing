import { useState } from "react";

// Windows/Linux waitlist capture (the macOS-first platform handling, per the
// story doc §2 — capture the email, never a greyed-out "Windows" button).
// Posts to /api/waitlist (a stub today; Upstash KV persistence is the follow-up).
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const invalid = status === "error";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage("By steel — you're on the list.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="font-mono text-sm text-gold"
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address for the Windows and Linux waitlist
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@domain.com"
          aria-invalid={invalid}
          aria-describedby={message ? "waitlist-status" : undefined}
          className="flex-1 rounded-full border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ember focus-visible:ring-2 focus-visible:ring-ring/50 aria-[invalid=true]:border-destructive"
        />
        {/* Honeypot — hidden from users + AT; bots fill it and get silently dropped. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? "Summoning…" : "Summon me →"}
        </button>
      </div>
      {invalid && (
        <p
          id="waitlist-status"
          role="alert"
          className="mt-2 font-mono text-xs text-destructive"
        >
          {message}
        </p>
      )}
    </form>
  );
}
