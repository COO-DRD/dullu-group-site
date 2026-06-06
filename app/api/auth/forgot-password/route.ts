import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { rateLimit, getIp } from "@/lib/rate-limit";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dullugroup.co.ke";

export async function POST(req: NextRequest) {
  if (!rateLimit(`forgot:${getIp(req)}`, 5).ok) {
    return NextResponse.json({ ok: true }); // silent — never reveal rate limit on this route
  }

  const { email } = await req.json().catch(() => ({}));
  if (!email || typeof email !== "string") {
    return NextResponse.json({ ok: true }); // always 200 — never reveal whether email exists
  }

  const res = await fetch(
    `${SUPA}/rest/v1/dr_dullu_site_users?email=eq.${encodeURIComponent(email.toLowerCase().trim())}&select=id,name&limit=1`,
    { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } }
  );
  const [user] = await res.json() as [{ id: string; name: string }?];

  if (!user) return NextResponse.json({ ok: true }); // email not found — silent

  const token     = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

  await fetch(`${SUPA}/rest/v1/dr_dullu_site_users?id=eq.${user.id}`, {
    method:  "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey:         KEY,
      Authorization:  `Bearer ${KEY}`,
    },
    body: JSON.stringify({ reset_token: token, reset_token_exp: expiresAt }),
  });

  const first      = user.name.split(" ")[0];
  const resetLink  = `${SITE}/reset-password?token=${token}`;

  await sendEmail({
    to:      email.toLowerCase().trim(),
    subject: "Reset your DR.DULLU password",
    html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#FAFAF8;margin:0;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;padding:48px;border:1px solid #F0EDE8;">
    <p style="font-size:10px;letter-spacing:0.2em;color:#D4580A;text-transform:uppercase;margin:0 0 28px;">DR.DULLU — Password Reset</p>
    <h1 style="font-size:26px;font-weight:900;color:#111111;margin:0 0 16px;text-transform:uppercase;letter-spacing:-0.02em;">
      Reset your password, ${first}.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 28px;">
      Click the button below to set a new password. This link expires in <strong>1 hour</strong> and can only be used once.
    </p>
    <a href="${resetLink}" style="display:inline-block;background:#D4580A;color:#FFFFFF;padding:13px 28px;text-decoration:none;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700;">
      Reset Password
    </a>
    <p style="font-size:12px;color:#888888;line-height:1.7;margin:28px 0 0;border-top:1px solid #F0EDE8;padding-top:24px;">
      If you didn't request this, ignore this email — your password won't change.<br/>
      <span style="color:#BBBBBB;">Dr. Dullu · dullugroup.co.ke</span>
    </p>
  </div>
</body>
</html>`,
  }).catch((err) => console.error("[forgot-password] email failed:", err));

  return NextResponse.json({ ok: true });
}
