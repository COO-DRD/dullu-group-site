const WA   = "254790117187";
const SITE = "https://dullugroup.co.ke";
const DASH = `${SITE}/dashboard`;

const SHELL = (body: string) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="font-family:Arial,sans-serif;background:#FAFAF8;margin:0;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;padding:48px;border:1px solid #F0EDE8;">
    ${body}
    <p style="font-size:12px;color:#888888;line-height:1.7;margin:28px 0 0;border-top:1px solid #F0EDE8;padding-top:24px;font-family:Arial,sans-serif;">
      Questions? Reply to this email or
      <a href="https://wa.me/${WA}" style="color:#D4580A;text-decoration:none;font-weight:600;">message me on WhatsApp</a>
      — I read every one.<br/>
      <span style="color:#BBBBBB;">Dr. Dullu · dullugroup.co.ke</span>
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
    ${LABEL("DR.DULLU — Subscriber Drop")}
    <h1 style="font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      You're in.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      Automation walkthroughs, raw case studies from Kenyan businesses, and
      short insights that don't get posted publicly. The real stuff. No AI fluff.
    </p>
    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 28px;background:#FFF8F4;">
      <p style="font-size:14px;color:#111111;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
        First drop lands in your inbox shortly. While you wait — there are
        <strong>6 free resources</strong> in the shop you can grab right now, no card required.
      </p>
    </div>
    ${CTA(`${SITE}/shop`, "Browse Free Resources")}
  `);
}

export const subscriberWelcomeSubject = "You're in — here's what's coming";

// ── Account registration welcome ─────────────────────────────────────────────

export function registrationWelcomeHtml(name: string): string {
  const first = name.split(" ")[0];
  return SHELL(`
    ${LABEL("DR.DULLU — Welcome")}
    <h1 style="font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      Welcome, ${first}.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      Your account is live. Your dashboard is where the real content lives —
      workshops, drops, announcements, and your downloads. Bookmark it.
    </p>
    <div style="background:#F8F5EB;padding:24px;margin:0 0 28px;border-left:3px solid #D4580A;">
      <p style="font-size:10px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;margin:0 0 10px;font-family:Arial,sans-serif;font-weight:700;">
        Start here — free, no card
      </p>
      <p style="font-size:14px;color:#111111;line-height:1.8;margin:0 0 16px;font-family:Arial,sans-serif;">
        6 free downloads: WhatsApp automation scripts, AI prompt starters, Excel packs,
        and business audit frameworks built for East African business reality.
      </p>
      ${CTA(`${SITE}/shop`, "Get Your Free Resources")}
    </div>
    <p style="color:#666666;font-size:14px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      When you're ready to go deeper, paid playbooks are step-by-step implementation
      guides — not theory, actual workflows. And if you want a 30-minute call to map
      the highest-leverage automation in your business, that's available too.
    </p>
    <div>
      ${CTA(`${SITE}/shop`, "Browse the Shop")}
      &nbsp;&nbsp;
      ${GHOST_CTA(`${SITE}/office`, "Book a Call")}
    </div>
  `);
}

export const registrationWelcomeSubject = "Your DR.DULLU account is live";

// ── Weekly member digest ──────────────────────────────────────────────────────

interface DigestWorkshop    { title: string; description: string }
interface DigestEvent       { title: string; starts_at: string; location: string }
interface DigestAnnouncement{ title: string; body: string }
interface DigestRelease     { title: string; description: string; version?: string }

export interface DigestData {
  name:          string;
  workshops:     DigestWorkshop[];
  events:        DigestEvent[];
  announcements: DigestAnnouncement[];
  releases:      DigestRelease[];
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short" });
}

export function weeklyDigestHtml(d: DigestData): string {
  const first  = d.name.split(" ")[0];
  const total  = d.workshops.length + d.events.length + d.announcements.length + d.releases.length;

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
  `);
}

export function weeklyDigestSubject(count: number): string {
  return count === 1
    ? "1 new drop in your dashboard this week"
    : `${count} new drops in your dashboard this week`;
}
