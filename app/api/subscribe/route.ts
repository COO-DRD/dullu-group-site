import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { subscriberWelcomeHtml, subscriberWelcomeSubject } from "@/lib/email-templates";

const SUPA_URL = process.env.SUPABASE_URL!;
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { email, name, source } = await req.json() as {
      email: string;
      name?: string;
      source?: string;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const res = await fetch(`${SUPA_URL}/rest/v1/email_subscribers`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SUPA_KEY,
        "Authorization": `Bearer ${SUPA_KEY}`,
        "Prefer":        "return=minimal,resolution=ignore-duplicates",
      },
      body: JSON.stringify({
        email:  email.trim().toLowerCase(),
        name:   name?.trim() ?? null,
        source: source ?? "homepage",
      }),
    });

    const isNew = res.status !== 409;

    if (!res.ok && isNew) {
      return NextResponse.json({ error: "Could not subscribe. Try again." }, { status: 500 });
    }

    // Only send welcome to new subscribers, not duplicates
    if (isNew) {
      try {
        await sendEmail({
          to:      email.trim().toLowerCase(),
          subject: subscriberWelcomeSubject,
          html:    subscriberWelcomeHtml(),
        });
      } catch (emailErr) {
        console.error("[subscribe] welcome email failed:", emailErr);
        // Don't fail the subscribe — DB write succeeded
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Network error." }, { status: 500 });
  }
}
