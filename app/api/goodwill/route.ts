import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { goodwillThankYouHtml, goodwillThankYouSubject } from "@/lib/email-templates";

const SUPA_URL = process.env.SUPABASE_URL!;
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json() as { name: string; email: string };

    if (!name?.trim() || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Name and valid email required." }, { status: 400 });
    }

    const res = await fetch(`${SUPA_URL}/rest/v1/goodwill_supporters`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SUPA_KEY,
        "Authorization": `Bearer ${SUPA_KEY}`,
        "Prefer":        "return=minimal,resolution=ignore-duplicates",
      },
      body: JSON.stringify({
        name:   name.trim(),
        email:  email.trim().toLowerCase(),
        method: "mpesa",
      }),
    });

    const isNew = res.status !== 409;

    if (!res.ok && isNew) {
      return NextResponse.json({ error: "Could not save. Try again." }, { status: 500 });
    }

    if (isNew) {
      try {
        await sendEmail({
          to:      email.trim().toLowerCase(),
          subject: goodwillThankYouSubject,
          html:    goodwillThankYouHtml(name.trim()),
        });
      } catch (err) {
        console.error("[goodwill] thank-you email failed:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Network error." }, { status: 500 });
  }
}
