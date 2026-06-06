import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, hashPassword } from "@/lib/auth";

const SUPA = process.env.SUPABASE_URL;
const KEY  = process.env.SUPABASE_SERVICE_KEY;

async function createUser(email: string, name: string, passwordHash: string) {
  const res = await fetch(`${SUPA}/rest/v1/site_users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: KEY!,
      Authorization: `Bearer ${KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({ email, name, password_hash: passwordHash }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    if (res.status === 409 || (body?.code ?? "").includes("unique")) {
      throw new Error("EMAIL_TAKEN");
    }
    throw new Error("DB_ERROR");
  }
  const [user] = await res.json();
  return user as { id: string; email: string; name: string; onboarded: boolean };
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser(email.toLowerCase().trim(), name.trim(), passwordHash);

    await createSessionCookie({ id: user.id, email: user.email, name: user.name, onboarded: false });

    return NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, onboarded: false } });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "EMAIL_TAKEN") {
      return NextResponse.json({ error: "That email is already registered." }, { status: 409 });
    }
    console.error("[register]", err);
    return NextResponse.json({ error: "Registration failed. Try again." }, { status: 500 });
  }
}
