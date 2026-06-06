import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { rateLimit, getIp } from "@/lib/rate-limit";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  if (!rateLimit(`reset:${getIp(req)}`, 10).ok) {
    return NextResponse.json({ error: "Too many attempts. Wait a minute." }, { status: 429 });
  }

  const { token, password } = await req.json().catch(() => ({}));

  if (!token || !password || typeof token !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const res = await fetch(
    `${SUPA}/rest/v1/dr_dullu_site_users?reset_token=eq.${encodeURIComponent(token)}&select=id,reset_token_exp&limit=1`,
    { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } }
  );
  const [user] = await res.json() as [{ id: string; reset_token_exp: string | null }?];

  if (!user) {
    return NextResponse.json({ error: "This reset link is invalid or has already been used." }, { status: 400 });
  }
  if (!user.reset_token_exp || new Date(user.reset_token_exp) < new Date()) {
    return NextResponse.json({ error: "This reset link has expired. Request a new one." }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);

  // Update password and invalidate token in one PATCH
  await fetch(`${SUPA}/rest/v1/dr_dullu_site_users?id=eq.${user.id}`, {
    method:  "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey:         KEY,
      Authorization:  `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      password_hash:    passwordHash,
      reset_token:      null,
      reset_token_exp:  null,
    }),
  });

  return NextResponse.json({ ok: true });
}
