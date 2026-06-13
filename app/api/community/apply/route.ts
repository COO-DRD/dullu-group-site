// Run this SQL in Supabase before deploying:
//
// create table community_applications (
//   id           uuid        default gen_random_uuid() primary key,
//   name         text        not null,
//   email        text        not null,
//   building     text        not null,
//   stage        text        not null,
//   needs        text        not null,
//   created_at   timestamptz default now(),
//   reviewed_at  timestamptz,
//   approved_at  timestamptz,
//   notes        text
// );
// create unique index community_applications_email_idx on community_applications(email);

import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import {
  applicationConfirmationHtml, applicationConfirmationSubject,
  applicationNotificationText, applicationNotificationSubject,
} from "@/lib/email-templates";
import { rateLimit, getIp } from "@/lib/rate-limit";

const SUPA_URL  = process.env.SUPABASE_URL!;
const SUPA_KEY  = process.env.SUPABASE_SERVICE_KEY!;
const IAN_EMAIL = "dr.dullu@outlook.com";

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { ok } = rateLimit(`community-apply:${ip}`, 3, 60 * 60 * 1000);
  if (!ok) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });

  const body = await req.json().catch(() => null) as {
    name?: string; email?: string; building?: string; stage?: string; needs?: string;
  } | null;

  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { name, email, building, stage, needs } = body;

  if (!name?.trim() || !email?.trim() || !building?.trim() || !stage || !needs) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  if (building.trim().length > 300) {
    return NextResponse.json({ error: "Keep the description under 300 characters." }, { status: 400 });
  }

  const res = await fetch(`${SUPA_URL}/rest/v1/community_applications`, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "apikey":        SUPA_KEY,
      "Authorization": `Bearer ${SUPA_KEY}`,
      "Prefer":        "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify({
      name:     name.trim(),
      email:    email.trim().toLowerCase(),
      building: building.trim(),
      stage,
      needs,
    }),
  });

  if (!res.ok && res.status !== 409) {
    console.error("[community/apply] DB error", res.status);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  const isNew = res.status !== 409;

  if (isNew) {
    // Notify Ian
    sendEmail({
      to:      IAN_EMAIL,
      subject: applicationNotificationSubject(name.trim()),
      text:    applicationNotificationText({ name: name.trim(), email: email.trim(), building: building.trim(), stage, needs }),
    }).catch(err => console.error("[community/apply] notify failed:", err));

    // Confirm to applicant
    sendEmail({
      to:      email.trim().toLowerCase(),
      subject: applicationConfirmationSubject,
      html:    applicationConfirmationHtml(name.trim()),
    }).catch(err => console.error("[community/apply] confirm failed:", err));
  }

  return NextResponse.json({ ok: true });
}
