import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const SUPA = process.env.SUPABASE_URL!;
const KEY  = process.env.SUPABASE_SERVICE_KEY!;
const RESEND_KEY = process.env.RESEND_API_KEY!;

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-KE", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi",
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { contentType, contentId, contentTitle, startsAt, location, registrationUrl } =
    await req.json() as {
      contentType: "workshop" | "event";
      contentId: string;
      contentTitle: string;
      startsAt?: string;
      location?: string;
      registrationUrl?: string;
    };

  if (!contentType || !contentId || !contentTitle)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  // Upsert registration (ignore duplicate)
  const insert = await fetch(
    `${SUPA}/rest/v1/dr_dullu_registrations`,
    {
      method: "POST",
      headers: {
        apikey: KEY, Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=minimal",
      },
      body: JSON.stringify({
        user_id: session.id,
        content_type: contentType,
        content_id: contentId,
        content_title: contentTitle,
      }),
    }
  );

  if (!insert.ok && insert.status !== 409) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }

  // Send confirmation email
  const typeLabel = contentType === "workshop" ? "Workshop" : "Event";
  const dateLine  = startsAt ? `<p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:15px;color:#444">${fmt(startsAt)}${location ? ` · ${location}` : ""}</p>` : "";
  const linkBlock = registrationUrl
    ? `<p style="margin:20px 0 0;font-family:Arial,sans-serif;font-size:14px;color:#666">Join link / details: <a href="${registrationUrl}" style="color:#D4580A">${registrationUrl}</a></p>`
    : "";

  const html = `
<div style="background:#111111;padding:32px 24px 24px;font-family:Arial,sans-serif;max-width:560px">
  <p style="margin:0 0 24px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#D4580A;font-weight:700">
    DR.DULLU · ${typeLabel} Confirmation
  </p>
  <h2 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#F8F5EB;line-height:1.2">
    You're registered!
  </h2>
  <p style="margin:0 0 24px;font-size:15px;color:rgba(248,245,235,0.75);line-height:1.6">
    Hey ${session.name.split(" ")[0]}, you're confirmed for:
  </p>
</div>
<div style="background:#FFFFFF;padding:28px 24px;max-width:560px;border-left:4px solid #D4580A">
  <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#D4580A;font-weight:700">${typeLabel}</p>
  <h3 style="margin:0 0 10px;font-size:18px;font-weight:900;color:#111111;line-height:1.3">${contentTitle}</h3>
  ${dateLine}
  ${linkBlock}
</div>
<div style="background:#F8F5EB;padding:24px;max-width:560px">
  <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:14px;color:#555555;line-height:1.6">
    I'll follow up with any updates closer to the date. Reply to this email if you have questions.
  </p>
  <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#888888">
    — Dr. Dullu
  </p>
</div>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Dr. Dullu <shop@dullugroup.co.ke>",
      to:   session.email,
      subject: `You're registered: ${contentTitle}`,
      html,
    }),
  });

  return NextResponse.json({ ok: true });
}
