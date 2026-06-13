const FROM   = "Dr. Dullu <hello@dullugroup.co.ke>";
const REPLY  = "dr.dullu@outlook.com";
const RESEND = "https://api.resend.com/emails";

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html?: string;  // HTML body (use for designed emails)
  text?: string;  // Plain text body (use for reply-bait and breakup emails — higher reply rates)
  scheduledAt?: string; // ISO 8601 — Resend delivers at this time (min 5 min in future)
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");

  const { scheduledAt, ...rest } = opts;

  const res = await fetch(RESEND, {
    method:  "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body:    JSON.stringify({
      from:    FROM,
      replyTo: REPLY,
      ...rest,
      ...(scheduledAt ? { scheduled_at: scheduledAt } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
}
