const FROM    = "Dr. Dullu <hello@dullugroup.co.ke>";
const REPLY   = "dr.dullu@outlook.com";
const RESEND  = "https://api.resend.com/emails";

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set");

  const res = await fetch(RESEND, {
    method:  "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body:    JSON.stringify({ from: FROM, replyTo: REPLY, ...opts }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
}
