import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import {
  subscriberWelcomeHtml,      subscriberWelcomeSubject,
  coldEmailToolWelcomeHtml,   coldEmailToolWelcomeSubject,
  coldEmailReplyBaitText,     coldEmailReplyBaitSubject,
  coldEmailNurture1Html,      coldEmailNurture1Subject,
  coldEmailCaseStudyHtml,     coldEmailCaseStudySubject,
  coldEmailNurture2Html,      coldEmailNurture2Subject,
  tyafInviteHtml,             tyafInviteSubject,
  coldEmailSoftPitchHtml,     coldEmailSoftPitchSubject,
  coldEmailBreakupText,       coldEmailBreakupSubject,
} from "@/lib/email-templates";

const SUPA_URL = process.env.SUPABASE_URL!;
const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY!;

const H  = 60 * 60 * 1000;
const D  = 24 * H;

// Schedule an email at a fixed offset from now.
// Resend requires scheduled_at to be at least 5 minutes in the future.
function at(offsetMs: number) {
  return new Date(Date.now() + offsetMs).toISOString();
}

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

    if (isNew) {
      const to = email.trim().toLowerCase();

      if (source === "cold-email-tool") {
        // ── 7-email cold email tool funnel ──────────────────────────────────
        // Cadence: daily for first 3 emails (peak interest), then every 2-3 days.
        // Format: HTML for educational emails, plain text for reply-bait + breakup.
        // Value:pitch ratio: 5 value emails before the pitch (emails 1-5), soft pitch at 6, close at 7.

        // Email 1 — Day 0 — Welcome + #1 fix (immediate)
        await sendEmail({ to, subject: coldEmailToolWelcomeSubject, html: coldEmailToolWelcomeHtml() });

        // Email 2 — Day 1 — Reply-bait (plain text, ~50 words, drives engagement signal)
        await sendEmail({ to, subject: coldEmailReplyBaitSubject, text: coldEmailReplyBaitText, scheduledAt: at(1 * D) });

        // Email 3 — Day 3 — 5 mistakes (educational, data-backed)
        await sendEmail({ to, subject: coldEmailNurture1Subject, html: coldEmailNurture1Html(), scheduledAt: at(3 * D) });

        // Email 4 — Day 5 — Case study: 3 rounds, 11 replies (social proof)
        await sendEmail({ to, subject: coldEmailCaseStudySubject, html: coldEmailCaseStudyHtml(), scheduledAt: at(5 * D) });

        // Email 5 — Day 7 — Good email breakdown: 22% reply rate (authority/validation)
        await sendEmail({ to, subject: coldEmailNurture2Subject, html: coldEmailNurture2Html(), scheduledAt: at(7 * D) });

        // Email 6 — Day 10 — Community invite: belonging + opportunity (TYAF)
        // Leads with the room of people, not the service — trust before pitch.
        await sendEmail({ to, subject: tyafInviteSubject, html: tyafInviteHtml(), scheduledAt: at(10 * D) });

        // Email 7 — Day 12 — Soft pitch: what DDi builds for teams
        await sendEmail({ to, subject: coldEmailSoftPitchSubject, html: coldEmailSoftPitchHtml(), scheduledAt: at(12 * D) });

        // Email 8 — Day 14 — Breakup (plain text, short, loss aversion close)
        await sendEmail({ to, subject: coldEmailBreakupSubject, text: coldEmailBreakupText, scheduledAt: at(14 * D) });

      } else {
        // Generic homepage subscriber — single welcome, then weekly digest handles ongoing comms
        await sendEmail({ to, subject: subscriberWelcomeSubject, html: subscriberWelcomeHtml() });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json({ error: "Network error." }, { status: 500 });
  }
}
