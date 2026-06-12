const WA   = "254790117187";
const SITE = "https://dullugroup.co.ke";
const DASH = `${SITE}/dashboard`;

const SHELL = (body: string, unsubscribeUrl?: string) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="font-family:Arial,sans-serif;background:#FAFAF8;margin:0;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;padding:48px;border:1px solid #F0EDE8;">
    ${body}
    <p style="font-size:12px;color:#888888;line-height:1.7;margin:28px 0 0;border-top:1px solid #F0EDE8;padding-top:24px;font-family:Arial,sans-serif;">
      Questions? Reply to this email or
      <a href="https://wa.me/${WA}" style="color:#D4580A;text-decoration:none;font-weight:600;">message me on WhatsApp</a>
      — I read every one.<br/>
      <span style="color:#BBBBBB;">Dr. Dullu · dullugroup.co.ke</span>${unsubscribeUrl ? `<br/><a href="${unsubscribeUrl}" style="color:#CCCCCC;text-decoration:underline;font-size:11px;">Unsubscribe from digest</a>` : ""}
    </p>
  </div>
</body>
</html>`;

const LABEL = (text: string) =>
  `<p style="font-size:10px;letter-spacing:0.2em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;margin:0 0 28px;">${text}</p>`;

const CTA = (href: string, text: string) =>
  `<a href="${href}" style="display:inline-block;background:#D4580A;color:#FFFFFF;padding:13px 28px;text-decoration:none;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;">${text}</a>`;

const GHOST_CTA = (href: string, text: string) =>
  `<a href="${href}" style="display:inline-block;border:1px solid #D4580A;color:#D4580A;padding:13px 28px;text-decoration:none;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;">${text}</a>`;

// ── Newsletter welcome ────────────────────────────────────────────────────────

export function subscriberWelcomeHtml(): string {
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      You're in.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      This is a community of young African founders who share what they learn —
      no gatekeeping, no paywalls, no fluff. Automation walkthroughs, raw case studies,
      tools built for the East African reality. Free. Always.
    </p>
    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 28px;background:#FFF8F4;">
      <p style="font-size:14px;color:#111111;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
        The first drop lands in your inbox shortly. In the meantime — everything in the
        library is already yours. No card, no catch.
      </p>
    </div>
    ${CTA(`${SITE}/shop`, "Open the Free Library")}
  `);
}

export const subscriberWelcomeSubject = "You're in — The Young African Founder";

// ── Account registration welcome ─────────────────────────────────────────────

export function registrationWelcomeHtml(name: string): string {
  const first = name.split(" ")[0];
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      Welcome, ${first}.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      You're now part of The Young African Founder — a community where the tools are
      free and the knowledge is real. Your dashboard is where everything lives:
      workshops, drops, and resources built for the East African business reality.
    </p>
    <div style="background:#F8F5EB;padding:24px;margin:0 0 28px;border-left:3px solid #D4580A;">
      <p style="font-size:14px;color:#111111;line-height:1.8;margin:0 0 16px;font-family:Arial,sans-serif;">
        WhatsApp automation scripts, AI prompt starters, Excel packs, business audit
        frameworks — all in the free library. No card, no catch. Take what helps.
      </p>
      ${CTA(DASH, "Open Your Dashboard")}
    </div>
    <p style="color:#888888;font-size:13px;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
      We lift as we climb. Share anything useful with another founder who needs it.
    </p>
  `);
}

export const registrationWelcomeSubject = "Welcome to The Young African Founder";

// ── Weekly member digest ──────────────────────────────────────────────────────

interface DigestWorkshop    { title: string; description: string }
interface DigestEvent       { title: string; starts_at: string; location: string }
interface DigestAnnouncement{ title: string; body: string }
interface DigestRelease     { title: string; description: string; version?: string }

export interface DigestData {
  name:             string;
  unsubscribeToken: string;
  workshops:        DigestWorkshop[];
  events:           DigestEvent[];
  announcements:    DigestAnnouncement[];
  releases:         DigestRelease[];
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" });
}

export function weeklyDigestHtml(d: DigestData): string {
  const first        = d.name.split(" ")[0];
  const total        = d.workshops.length + d.events.length + d.announcements.length + d.releases.length;
  const unsubUrl     = `${SITE}/unsubscribe?token=${encodeURIComponent(d.unsubscribeToken)}`;

  if (total === 0) return "";

  const sections: string[] = [];

  if (d.announcements.length) {
    sections.push(`
      <p style="font-size:10px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 12px;">
        Announcements
      </p>
      ${d.announcements.map((a) => `
        <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 12px;background:#FFF8F4;">
          <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">${a.title}</p>
          <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">${a.body}</p>
        </div>`).join("")}
    `);
  }

  if (d.workshops.length) {
    sections.push(`
      <p style="font-size:10px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 12px;">
        New Workshops
      </p>
      ${d.workshops.map((w) => `
        <div style="border:1px solid #F0EDE8;padding:16px;margin:0 0 10px;">
          <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">${w.title}</p>
          <p style="font-size:13px;color:#666666;line-height:1.7;margin:0;font-family:Arial,sans-serif;">${w.description}</p>
        </div>`).join("")}
    `);
  }

  if (d.events.length) {
    sections.push(`
      <p style="font-size:10px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 12px;">
        Upcoming Events
      </p>
      ${d.events.map((e) => `
        <div style="display:flex;gap:12px;align-items:flex-start;border-bottom:1px solid #F0EDE8;padding:12px 0;margin:0;">
          <div style="background:#D4580A;color:#FFFFFF;padding:8px 12px;text-align:center;min-width:48px;flex-shrink:0;">
            <p style="font-size:16px;font-weight:900;margin:0;font-family:Arial,sans-serif;line-height:1;">${new Date(e.starts_at).getDate()}</p>
            <p style="font-size:9px;letter-spacing:0.1em;margin:2px 0 0;font-family:Arial,sans-serif;">${new Date(e.starts_at).toLocaleDateString("en-KE",{month:"short"}).toUpperCase()}</p>
          </div>
          <div>
            <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 2px;font-family:Arial,sans-serif;">${e.title}</p>
            <p style="font-size:11px;color:#888888;margin:0;font-family:Arial,sans-serif;">${fmtDate(e.starts_at)} · ${e.location}</p>
          </div>
        </div>`).join("")}
    `);
  }

  if (d.releases.length) {
    sections.push(`
      <p style="font-size:10px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 12px;">
        New Releases
      </p>
      ${d.releases.map((r) => `
        <div style="border:1px solid #F0EDE8;padding:16px;margin:0 0 10px;">
          <span style="background:#111111;color:#D4580A;font-size:9px;letter-spacing:0.12em;padding:3px 8px;font-family:Arial,sans-serif;font-weight:700;">${r.version ? `v${r.version}` : "NEW"}</span>
          <p style="font-size:14px;font-weight:700;color:#111111;margin:8px 0 4px;font-family:Arial,sans-serif;">${r.title}</p>
          <p style="font-size:13px;color:#666666;line-height:1.7;margin:0;font-family:Arial,sans-serif;">${r.description}</p>
        </div>`).join("")}
    `);
  }

  return SHELL(`
    ${LABEL("DR.DULLU — Member Digest")}
    <h1 style="font-family:Arial,sans-serif;font-size:24px;font-weight:900;color:#111111;margin:0 0 8px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      ${total} new thing${total === 1 ? "" : "s"} dropped this week, ${first}.
    </h1>
    <p style="color:#666666;font-size:14px;line-height:1.8;margin:0 0 28px;font-family:Arial,sans-serif;">
      Members only. Open your dashboard to access everything.
    </p>
    ${sections.join('<div style="margin:24px 0;border-top:1px solid #F0EDE8;"></div>')}
    <div style="margin-top:28px;">
      ${CTA(DASH, "Open Dashboard")}
    </div>
  `, unsubUrl);
}

export function weeklyDigestSubject(count: number): string {
  return count === 1
    ? "1 new drop in your dashboard this week"
    : `${count} new drops in your dashboard this week`;
}

// ── Goodwill thank-you ────────────────────────────────────────────────────────

export function goodwillThankYouHtml(name: string): string {
  const first = name.split(" ")[0];
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      Thank you, ${first}.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      Seriously. Support like yours is what keeps everything here free for the next
      founder who needs it.
    </p>
    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 28px;background:#FFF8F4;">
      <p style="font-size:14px;color:#111111;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
        Your name will appear in the credits of everything I build from here —
        that's the deal. The Young African Founder community builds together.
      </p>
    </div>
    <p style="color:#666666;font-size:14px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      I'll follow up in a few days with what's dropping next for the community.
      In the meantime — grab anything from the free library that's useful.
    </p>
    ${GHOST_CTA(`${SITE}/shop`, "Open the Free Library")}
  `);
}

export const goodwillThankYouSubject = "Thank you — you're in the credits";

// ── Goodwill follow-up ────────────────────────────────────────────────────────

export function goodwillFollowUpHtml(name: string): string {
  const first = name.split(" ")[0];
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:24px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      You're in the credits, ${first}.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      Your name is live on the site — listed under the supporters who make the
      free work possible. Thank you again.
    </p>
    <p style="color:#666666;font-size:14px;line-height:1.8;margin:0 0 28px;font-family:Arial,sans-serif;">
      If you ever want to share feedback, suggest what to build next, or just say
      something — hit reply. I read every message.
    </p>
    ${CTA(`${SITE}`, "See What's New")}
  `);
}

export const goodwillFollowUpSubject = "You're in the credits — and here's what's next";
