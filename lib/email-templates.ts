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

const WA_COMMUNITY = "https://whatsapp.com/channel/0029VbCyuTQGufIzlFkQ2f0p";

// ── Newsletter welcome ────────────────────────────────────────────────────────

export function subscriberWelcomeHtml(): string {
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      You're not alone in this.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      Most people building businesses from East Africa are doing it without a room of peers who actually get it.
      Not peers who nod politely — peers who are working through the same constraints, the same market realities,
      the same gap between where things are and where they need to be.
    </p>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      TYAF is that room. Founders building lean, from cities nobody expected, without institutional backing.
      We share what's working, make introductions, and show up when things are hard.
    </p>
    <div style="background:#111111;padding:24px;margin:0 0 28px;">
      <p style="font-size:13px;color:rgba(248,245,235,0.7);line-height:1.8;margin:0 0 16px;font-family:Arial,sans-serif;">
        The community lives on WhatsApp. Join it — introduce yourself with one sentence about what you're building.
        Someone in there needs to know you exist.
      </p>
      ${CTA(WA_COMMUNITY, "Join the Community")}
    </div>
    <p style="font-size:13px;color:#888888;margin:0 0 6px;font-family:Arial,sans-serif;">
      Free tools: <a href="${SITE}/tools/cold-email" style="color:#D4580A;text-decoration:none;">Cold Email Diagnostic</a> — score any cold email in 30 seconds.
    </p>
    <p style="font-size:13px;color:#888888;margin:0;font-family:Arial,sans-serif;">
      Weekly drops on automation and outreach land in your inbox. No fluff. Unsubscribe any time.
    </p>
  `);
}

export const subscriberWelcomeSubject = "You're not alone in this";

// ── Account registration welcome ─────────────────────────────────────────────

export function registrationWelcomeHtml(name: string): string {
  const first = name.split(" ")[0];
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:28px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      ${first}. You just joined something real.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      Not a course. Not a content library. A community of founders who are actively building —
      sharing what's working, asking for help without embarrassment, making introductions
      that actually mean something.
    </p>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 28px;font-family:Arial,sans-serif;">
      Your dashboard has the tools and resources. But the people are what you're here for.
    </p>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 10px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 8px;">Step 1</p>
      <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">Join the WhatsApp community</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0 0 12px;font-family:Arial,sans-serif;">
        Introduce yourself with one sentence — what you're building and where you're based.
        Someone in there needs to know you exist.
      </p>
      ${CTA(WA_COMMUNITY, "Join on WhatsApp")}
    </div>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 10px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 8px;">Step 2</p>
      <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">Use the free tools</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0 0 12px;font-family:Arial,sans-serif;">
        The Cold Email Diagnostic is live — paste any cold email, get a score and the exact fixes.
        More tools coming. Your dashboard has everything released so far.
      </p>
      ${GHOST_CTA(DASH, "Open Dashboard")}
    </div>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 28px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 8px;">Step 3</p>
      <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">Ask for what you need</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Need an intro? A second opinion? Someone who's done what you're trying to do?
        Reply to this email. That's what I'm here for.
      </p>
    </div>

    <p style="color:#888888;font-size:13px;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
      Knowledge. Audacity. Empire. Built in public from Kilifi, Kenya.
    </p>
  `);
}

export const registrationWelcomeSubject = "You just joined something real";

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
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      Seriously. This keeps the tools free for the next founder who finds them at 11pm
      trying to figure something out.
    </p>
    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 24px;background:#FFF8F4;">
      <p style="font-size:14px;color:#111111;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
        Your name goes in the credits of everything built from here — publicly, permanently.
        That's the deal. The people who make the free work possible deserve to be seen.
      </p>
    </div>
    <p style="color:#444444;font-size:14px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      If you haven't joined the community yet — that's where things actually happen.
      Not content drops. Founders making introductions, asking real questions, sharing
      what's working. People you can actually talk to.
    </p>
    ${CTA(WA_COMMUNITY, "Join the Community")}
    <p style="font-size:13px;color:#999999;margin:20px 0 0;font-family:Arial,sans-serif;">
      Or reply to this email. I read every one.
    </p>
  `);
}

export const goodwillThankYouSubject = "Thank you — you're in the credits";

// ── Goodwill follow-up ────────────────────────────────────────────────────────

export function goodwillFollowUpHtml(name: string): string {
  const first = name.split(" ")[0];
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:24px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      You're in the credits, ${first}. Now let me introduce you to the room.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      TYAF isn't a newsletter. It's a community of founders building lean, from cities
      nobody expected, without institutional backing. Some are pre-revenue. Some are
      scaling. All of them show up.
    </p>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      What happens in the community:
    </p>

    <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 8px;background:#FFF8F4;">
      <p style="font-size:14px;color:#111111;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        <strong>Introductions.</strong> Need to talk to someone who's done what you're trying to do?
        Someone in there has. The community is where you find them.
      </p>
    </div>
    <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 8px;background:#FFF8F4;">
      <p style="font-size:14px;color:#111111;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        <strong>Real questions.</strong> Not "thought leadership." Founders sharing actual problems
        and getting actual answers from people with skin in the game.
      </p>
    </div>
    <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 28px;background:#FFF8F4;">
      <p style="font-size:14px;color:#111111;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        <strong>Opportunities.</strong> Client leads, partnerships, tools early — shared inside
        the community before anywhere else.
      </p>
    </div>

    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      Join, introduce yourself with one sentence about what you're building.
      Someone in there needs to know you exist.
    </p>
    ${CTA(WA_COMMUNITY, "Join the Community")}
    <p style="font-size:13px;color:#999999;margin:20px 0 0;font-family:Arial,sans-serif;">
      And if you ever want to suggest what to build next — hit reply. I read every one.
    </p>
  `);
}

export const goodwillFollowUpSubject = "You're in the credits — meet the room";

// ── Cold email tool — immediate welcome ───────────────────────────────────────

export function coldEmailToolWelcomeHtml(): string {
  return SHELL(`
    ${LABEL("DR.DULLU — Cold Email Diagnostic")}
    <h1 style="font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      Your score + the first fix.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      You just ran your cold email through the diagnostic. Good — most people guess.
    </p>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      Whatever score you got: the single highest-impact fix in most cold emails is the first sentence.
      If it starts with "I" or "We", you've already lost most readers before they've decided
      whether to care.
    </p>
    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 28px;background:#FFF8F4;">
      <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 8px;font-family:Arial,sans-serif;">
        The data behind it:
      </p>
      <p style="font-size:14px;color:#333333;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
        Yesware tracked 2.5 million emails. "I"-first cold emails get 20% fewer replies than
        emails that open with something about the recipient. One word change. Measurable difference.
      </p>
    </div>
    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0 0 28px;font-family:Arial,sans-serif;">
      Rewrite your first sentence to start with them — an observation, a question, a reference
      to something specific. Then run the diagnostic again and see if the score moves.
    </p>
    ${CTA(`${SITE}/tools/cold-email`, "Back to the Diagnostic")}
    <p style="font-size:13px;color:#888888;margin:24px 0 0;line-height:1.7;font-family:Arial,sans-serif;">
      In 3 days I'll send you the 5 cold email mistakes I see in 90% of outreach — with the exact fixes.
      All based on the same research data behind the scorer.
    </p>
  `);
}

export const coldEmailToolWelcomeSubject = "Your cold email score + the #1 fix";

// ── Cold email tool — day 3 nurture ──────────────────────────────────────────

export function coldEmailNurture1Html(): string {
  return SHELL(`
    ${LABEL("DR.DULLU — Cold Email")}
    <h1 style="font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      5 mistakes killing your reply rate.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      These show up in 90% of cold emails. They're all fixable in under 10 minutes.
    </p>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 12px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 6px;">01</p>
      <p style="font-size:15px;font-weight:700;color:#111111;margin:0 0 6px;font-family:Arial,sans-serif;">Starts with "I" or "We"</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Yesware data: 20% fewer replies. Your first sentence is about you before the reader has decided to care.
        <strong style="color:#111111;">Fix:</strong> Lead with something about them — an observation, a question, a specific detail.
      </p>
    </div>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 12px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 6px;">02</p>
      <p style="font-size:15px;font-weight:700;color:#111111;margin:0 0 6px;font-family:Arial,sans-serif;">Subject line over 9 words</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Boomerang analysed 40M emails. Under 9 words = 36% higher open rate. Most email clients
        truncate anything longer anyway.
        <strong style="color:#111111;">Fix:</strong> Cut the subject to 5–9 words. Lead with the most interesting part.
      </p>
    </div>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 12px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 6px;">03</p>
      <p style="font-size:15px;font-weight:700;color:#111111;margin:0 0 6px;font-family:Arial,sans-serif;">More than one ask</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Close.io research: a single CTA doubles reply rate versus two asks. Two options feels like
        homework. One feels like a decision.
        <strong style="color:#111111;">Fix:</strong> Pick your best ask. Delete the rest. Save the second one for a follow-up.
      </p>
    </div>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 12px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 6px;">04</p>
      <p style="font-size:15px;font-weight:700;color:#111111;margin:0 0 6px;font-family:Arial,sans-serif;">"Let me know if you're interested"</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Passive CTAs get passive responses — which is silence. Putting the decision entirely on the
        reader without giving them anything to push back on is a dead end.
        <strong style="color:#111111;">Fix:</strong> Ask a yes/no question with a specific commitment: "Would you be open to a 15-minute call this week?"
      </p>
    </div>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 28px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 6px;">05</p>
      <p style="font-size:15px;font-weight:700;color:#111111;margin:0 0 6px;font-family:Arial,sans-serif;">Over 200 words</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Boomerang's sweet spot is 50–125 words — 43–44% reply rate. Past 200 words, most prospects
        skim to the end and don't reply.
        <strong style="color:#111111;">Fix:</strong> Cut everything that's about you rather than them. If it doesn't help them decide, cut it.
      </p>
    </div>

    ${CTA(`${SITE}/tools/cold-email`, "Score My Email")}

    <p style="font-size:13px;color:#888888;margin:24px 0 0;line-height:1.7;font-family:Arial,sans-serif;">
      Building full outreach systems — sequences, targeting, automation — for sales teams is what DDi does.
      If you want one built for your business, reply to this email.
    </p>
  `);
}

export const coldEmailNurture1Subject = "5 cold email mistakes killing your reply rate";

// ── Cold email tool — day 7 nurture ──────────────────────────────────────────

export function coldEmailNurture2Html(): string {
  return SHELL(`
    ${LABEL("DR.DULLU — Cold Email")}
    <h1 style="font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      A cold email that got 22% reply rate.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 8px;font-family:Arial,sans-serif;">
      Industry average for cold email is 1–5%. Here's one that hit 22% on a 500-person sequence.
      Full breakdown below.
    </p>
    <p style="color:#888888;font-size:13px;line-height:1.7;margin:0 0 28px;font-family:Arial,sans-serif;">
      I ran it through the diagnostic. Score: 91/100.
    </p>

    <div style="background:#111111;padding:28px;margin:0 0 28px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 16px;">The email</p>
      <p style="font-size:13px;font-weight:700;color:#F8F5EB;margin:0 0 16px;font-family:Arial,sans-serif;line-height:1.5;">
        Subject: Saw your post on scaling outbound
      </p>
      <p style="font-size:13px;color:rgba(248,245,235,0.8);line-height:1.8;margin:0;font-family:Arial,sans-serif;">
        Your LinkedIn post on SDR burnout landed — you're describing exactly what we see in teams
        that are still running outbound manually.<br/><br/>
        We built a system for a 6-person team in Nairobi that went from 200 manual outreach
        emails a week to 1,400 — with the same headcount. Reply rate stayed above 8%.<br/><br/>
        Worth a 15-minute call to see if the same applies to your setup?
      </p>
    </div>

    <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 16px;font-family:Arial,sans-serif;">Why it works — element by element:</p>

    <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 10px;background:#FFF8F4;">
      <p style="font-size:13px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">Subject (20/20)</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        6 words. References something real they published. Opens a loop without revealing anything. You open it.
      </p>
    </div>
    <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 10px;background:#FFF8F4;">
      <p style="font-size:13px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">Opening (18/20)</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Starts with "Your" — immediately about them. References a specific thing they wrote.
        Shows the sender actually looked.
      </p>
    </div>
    <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 10px;background:#FFF8F4;">
      <p style="font-size:13px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">Value prop (19/20)</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Specific numbers (200 → 1,400, same headcount, 8% reply rate). No buzzwords.
        Outcome is clear in two sentences.
      </p>
    </div>
    <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 10px;background:#FFF8F4;">
      <p style="font-size:13px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">CTA (20/20)</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Single question. Specific time ask. Easy yes or no. Doesn't ask for commitment — asks for a conversation.
      </p>
    </div>
    <div style="border-left:3px solid #D4580A;padding:12px 16px;margin:0 0 28px;background:#FFF8F4;">
      <p style="font-size:13px;font-weight:700;color:#111111;margin:0 0 4px;font-family:Arial,sans-serif;">Length (14/20)</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        83 words. In the optimal range. Could tighten the second paragraph — "same headcount"
        is slightly redundant after context is set. Minor.
      </p>
    </div>

    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0 0 28px;font-family:Arial,sans-serif;">
      The pattern: <strong style="color:#111111;">their words first, your proof second, one question at the end.</strong>
      That's it. Every sentence either earns their attention or gets cut.
    </p>

    ${CTA(`${SITE}/tools/cold-email`, "Test Your Own Email")}

    <p style="font-size:13px;color:#888888;margin:24px 0 0;line-height:1.7;font-family:Arial,sans-serif;">
      If you want a complete outreach system built for your business — sequences, targeting, automation,
      the whole stack — reply with <strong style="color:#111111;">"build it"</strong> and I'll tell you what that looks like.
    </p>
  `);
}

export const coldEmailNurture2Subject = "A cold email that got 22% reply rate (full breakdown)";

// ── Cold email tool — day 1 reply-bait (plain text) ──────────────────────────
// Plain text = 15–25% higher reply rate than HTML for relationship emails.
// Goal: get a reply, create a two-way signal, improve deliverability.

export const coldEmailReplyBaitText = `Quick question — what's your biggest challenge with cold email right now?

Getting people to open? Getting replies? Writing something that doesn't sound like everyone else's?

Reply to this with one sentence. I read every one and it helps me figure out what to send you next.

— Ian`;

export const coldEmailReplyBaitSubject = "Quick question";

// ── Cold email tool — day 5 case study ───────────────────────────────────────

export function coldEmailCaseStudyHtml(): string {
  return SHELL(`
    ${LABEL("DR.DULLU — Cold Email")}
    <h1 style="font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      3 rounds. 11 replies. Here's exactly what changed.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      A founder in Nairobi running a logistics SaaS came to me after 3 weeks of cold outreach with zero replies.
      500 emails sent. Not a single response.
    </p>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 8px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#888888;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 8px;">Round 1 — the original</p>
      <p style="font-size:13px;color:#555555;line-height:1.8;margin:0 0 8px;font-family:Arial,sans-serif;">
        Subject: "Our logistics automation platform for African businesses"<br/>
        Opener: "Hi [Name], I hope this message finds you well. My name is David and I'm the founder of..."<br/>
        Length: 280 words.
      </p>
      <p style="font-size:13px;font-weight:700;color:#CC3333;margin:0;font-family:Arial,sans-serif;">Score: 31/100. Result: 0 replies from 180 sends.</p>
    </div>

    <div style="border:1px solid #F0EDE8;padding:20px;margin:0 0 8px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 8px;">Round 2 — first rewrite</p>
      <p style="font-size:13px;color:#555555;line-height:1.8;margin:0 0 8px;font-family:Arial,sans-serif;">
        Changes: shorter subject (6 words), cut "I hope this finds you well", removed company intro, cut to 95 words.
        Still opened with "We built a platform that..."
      </p>
      <p style="font-size:13px;font-weight:700;color:#D4580A;margin:0;font-family:Arial,sans-serif;">Score: 58/100. Result: 4 replies from 180 sends (2.2%).</p>
    </div>

    <div style="border:1px solid #D4580A;padding:20px;margin:0 0 28px;">
      <p style="font-size:11px;letter-spacing:0.18em;color:#D4580A;text-transform:uppercase;font-family:Arial,sans-serif;font-weight:700;margin:0 0 8px;">Round 3 — the version that worked</p>
      <p style="font-size:13px;color:#555555;line-height:1.8;margin:0 0 8px;font-family:Arial,sans-serif;">
        Changes: opener now starts with "Saw your fleet just expanded to Mombasa —", value prop flipped to
        outcomes ("cut delivery exceptions by 30%"), single yes/no CTA.
      </p>
      <p style="font-size:13px;font-weight:700;color:#2A8A4A;margin:0;font-family:Arial,sans-serif;">Score: 84/100. Result: 11 replies from 140 sends (7.9%).</p>
    </div>

    <p style="color:#444444;font-size:14px;line-height:1.8;margin:0 0 8px;font-family:Arial,sans-serif;">
      <strong style="color:#111111;">The three changes that moved the needle:</strong>
    </p>
    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0 0 6px;font-family:Arial,sans-serif;">1. Opener about them, not us. ("Saw your fleet..." vs "I'm the founder of...")</p>
    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0 0 6px;font-family:Arial,sans-serif;">2. Outcome in the value prop, not features. ("Cut delivery exceptions 30%" vs "our platform does X")</p>
    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0 0 28px;font-family:Arial,sans-serif;">3. One question at the end, not a block of CTAs.</p>

    ${CTA(`${SITE}/tools/cold-email`, "Score Your Email")}

    <p style="font-size:13px;color:#888888;margin:24px 0 0;line-height:1.7;font-family:Arial,sans-serif;">
      In 2 days: a cold email that got a 22% reply rate — with the full element-by-element breakdown.
    </p>
  `);
}

export const coldEmailCaseStudySubject = "3 rounds, 11 replies — here's what changed";

// ── Cold email tool — day 10 soft pitch (DDi services) ───────────────────────

export function coldEmailSoftPitchHtml(): string {
  return SHELL(`
    ${LABEL("DR.DULLU — DDi")}
    <h1 style="font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      What we actually build for teams.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      You've been using the cold email diagnostic, which is a free tool. Here's what the paid side looks like — in case it's relevant.
    </p>

    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 12px;background:#FFF8F4;">
      <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 6px;font-family:Arial,sans-serif;">Outreach system build</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Full cold outreach stack — ICP definition, lead sourcing, enrichment, personalised sequence
        (3–5 touches), automation, and delivery infrastructure. One-time build, runs itself.
      </p>
    </div>

    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 12px;background:#FFF8F4;">
      <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 6px;font-family:Arial,sans-serif;">CRM + pipeline automation</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Connect your stack — lead capture, CRM updates, follow-up triggers, handoff to sales.
        No more manual copy-pasting between tools.
      </p>
    </div>

    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 28px;background:#FFF8F4;">
      <p style="font-size:14px;font-weight:700;color:#111111;margin:0 0 6px;font-family:Arial,sans-serif;">Monthly retainer</p>
      <p style="font-size:13px;color:#555555;line-height:1.7;margin:0;font-family:Arial,sans-serif;">
        Ongoing: maintain, update, and expand what we build. New sequences, A/B tests, stack changes.
        Most clients stay on retainer after the initial build.
      </p>
    </div>

    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0 0 28px;font-family:Arial,sans-serif;">
      If any of that fits where you are — reply with "tell me more" and I'll send you specifics.
      No call required upfront.
    </p>

    ${GHOST_CTA(`${SITE}/office`, "Or book a call directly")}
  `);
}

export const coldEmailSoftPitchSubject = "What DDi builds for sales teams";

// ── TYAF community invite ─────────────────────────────────────────────────────
// Used after value has been delivered (e.g. end of cold email nurture sequence).
// Leads with belonging and opportunity — not content.

export function tyafInviteHtml(): string {
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      You've been building alone long enough.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      I've been sending you cold email strategy for a couple of weeks. Here's something different.
    </p>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      TYAF is a community of founders building lean — from Nairobi, Mombasa, Lagos, Accra,
      and places the global tech conversation ignores. Not a content library. Not a course.
      A room of people who are actually doing it and will tell you what's true.
    </p>

    <div style="background:#111111;padding:24px;margin:0 0 24px;">
      <p style="font-size:13px;color:rgba(248,245,235,0.6);text-transform:uppercase;letter-spacing:0.15em;font-family:Arial,sans-serif;margin:0 0 16px;">What's in the room</p>
      <p style="font-size:14px;color:#F8F5EB;line-height:1.8;margin:0 0 10px;font-family:Arial,sans-serif;">
        → Founders making real introductions to clients, investors, and collaborators
      </p>
      <p style="font-size:14px;color:#F8F5EB;line-height:1.8;margin:0 0 10px;font-family:Arial,sans-serif;">
        → Opportunities shared inside the community before they go anywhere else
      </p>
      <p style="font-size:14px;color:#F8F5EB;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
        → People who understand the constraints you're working in because they're in them too
      </p>
      ${CTA(`${SITE}/community/apply`, "Apply to Join")}
    </div>

    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
      Three questions. Two minutes. Ian reviews every application himself.
    </p>
  `);
}

export const tyafInviteSubject = "You've been building alone long enough";

// ── Community application — notification to Ian (plain text) ─────────────────

interface ApplicationData {
  name: string;
  email: string;
  building: string;
  stage: string;
  needs: string;
}

export function applicationNotificationText(app: ApplicationData): string {
  const stageLabel: Record<string, string> = {
    "pre-revenue":   "Pre-revenue",
    "first-revenue": "First revenue",
    "scaling":       "Scaling",
  };
  const needsLabel: Record<string, string> = {
    "clients":     "Clients",
    "co-founder":  "Co-founder",
    "capital":     "Capital",
    "knowledge":   "Knowledge",
    "just-a-room": "Just a room",
  };

  return `New TYAF community application.

Name: ${app.name}
Email: ${app.email}

Building: ${app.building}

Stage: ${stageLabel[app.stage] ?? app.stage}
Needs: ${needsLabel[app.needs] ?? app.needs}

---
Reply to this email or DM them on WhatsApp to send the group link.`;
}

export const applicationNotificationSubject = (name: string) => `New application — ${name}`;

// ── Community application — confirmation to applicant ────────────────────────

export function applicationConfirmationHtml(name: string): string {
  const first = name.split(" ")[0];
  return SHELL(`
    ${LABEL("The Young African Founder")}
    <h1 style="font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#111111;margin:0 0 16px;line-height:1.1;text-transform:uppercase;letter-spacing:-0.02em;">
      Got it, ${first}.
    </h1>
    <p style="color:#444444;font-size:15px;line-height:1.8;margin:0 0 20px;font-family:Arial,sans-serif;">
      Your application is in. Ian reviews every one himself — no filters, no automated approvals.
    </p>
    <div style="border-left:3px solid #D4580A;padding:16px 20px;margin:0 0 24px;background:#FFF8F4;">
      <p style="font-size:14px;color:#111111;line-height:1.8;margin:0;font-family:Arial,sans-serif;">
        If it's a fit, you'll get a WhatsApp DM directly from Ian with the private group link.
        Usually within a few days. When you get in — introduce yourself with one sentence.
        What you're building and where you're based. That's all you need.
      </p>
    </div>
    <p style="color:#555555;font-size:14px;line-height:1.8;margin:0 0 24px;font-family:Arial,sans-serif;">
      In the meantime, the public channel is where the tools, case studies, and weekly drops live.
      Follow it while you wait.
    </p>
    ${GHOST_CTA("https://whatsapp.com/channel/0029VbCyuTQGufIzlFkQ2f0p", "Follow the Channel")}
    <p style="font-size:13px;color:#999999;margin:20px 0 0;font-family:Arial,sans-serif;">
      Questions? Reply to this email.
    </p>
  `);
}

export const applicationConfirmationSubject = "Application received — TYAF";

// ── Cold email tool — day 14 breakup (plain text) ────────────────────────────
// Short. Loss aversion. Final touch before disengaging from the cold email sequence.
// Research: breakup emails on warm lists get 10–20% reply rates.

export const coldEmailBreakupText = `This is my last email on cold email strategy.

Over the past two weeks I've sent you the data on what makes emails get replies, walked through real sequences, and shared what actually changed the numbers.

If you want a full outreach system built for your business — sequences, targeting, automation, the whole thing — reply "build it" and I'll tell you what that looks like.

If not, no pressure. You'll still get the weekly drops when I publish something useful.

— Ian

P.S. The diagnostic is always free at dullugroup.co.ke/tools/cold-email — run any email any time.`;

export const coldEmailBreakupSubject = "Last one from me on this";
