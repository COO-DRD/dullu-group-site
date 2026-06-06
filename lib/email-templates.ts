const WA   = "254790117187";
const SITE = "https://dullugroup.co.ke";

const SHELL = (body: string) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="font-family:Georgia,serif;background:#f5f2ed;margin:0;padding:40px 20px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:48px;border:1px solid #e3ddd4;">
    ${body}
    <p style="font-size:12px;color:#8b7355;line-height:1.6;margin:32px 0 0;border-top:1px solid #e3ddd4;padding-top:24px;">
      Questions? Reply to this email or
      <a href="https://wa.me/${WA}" style="color:#8b4513;text-decoration:none;">WhatsApp me directly</a>
      — I read every one.<br/>
      <span style="color:#c8a96e;">Dr. Dullu · dullugroup.co.ke</span>
    </p>
  </div>
</body>
</html>`;

const CTA = (href: string, text: string) =>
  `<a href="${href}" style="display:inline-block;background:#8b4513;color:#fff;padding:13px 28px;text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">${text}</a>`;

// ── Newsletter welcome ────────────────────────────────────────────────────────

export function subscriberWelcomeHtml(): string {
  return SHELL(`
    <p style="font-size:11px;letter-spacing:0.15em;color:#8b4513;text-transform:uppercase;margin:0 0 32px;">
      DR.DULLU — Subscriber Drop
    </p>
    <h1 style="font-size:28px;color:#2d241e;font-weight:400;margin:0 0 8px;line-height:1.3;">
      You're in.
    </h1>
    <p style="color:#3d3028;font-size:15px;line-height:1.8;margin:16px 0 28px;">
      Here's exactly what you signed up for:
    </p>
    <div style="border-left:3px solid #8b4513;padding:16px 20px;margin:0 0 28px;background:#faf8f5;">
      <p style="font-size:14px;color:#3d3028;line-height:1.9;margin:0;">
        <strong>Subscriber-only content drops</strong> — automation walkthroughs,
        raw case studies from Kenyan businesses, and short insights that don't get
        posted anywhere publicly. The real stuff. No AI fluff.
      </p>
    </div>
    <p style="color:#3d3028;font-size:15px;line-height:1.8;margin:0 0 8px;">
      First drop lands in your inbox shortly. While you wait — there are
      <strong>6 free resources</strong> in the shop you can grab right now,
      no card required.
    </p>
    <p style="color:#8b7355;font-size:13px;line-height:1.8;margin:0 0 28px;">
      WhatsApp automations, AI prompts, Excel shortcuts, business audit frameworks.
      Pick what's most useful for where you are right now.
    </p>
    ${CTA(`${SITE}/shop`, 'Browse Free Resources')}
  `);
}

export const subscriberWelcomeSubject = "You're in — here's what's coming";

// ── Account registration welcome ─────────────────────────────────────────────

export function registrationWelcomeHtml(name: string): string {
  const first = name.split(" ")[0];
  return SHELL(`
    <p style="font-size:11px;letter-spacing:0.15em;color:#8b4513;text-transform:uppercase;margin:0 0 32px;">
      DR.DULLU — Welcome
    </p>
    <h1 style="font-size:28px;color:#2d241e;font-weight:400;margin:0 0 8px;line-height:1.3;">
      Welcome, ${first}.
    </h1>
    <p style="color:#3d3028;font-size:15px;line-height:1.8;margin:16px 0 28px;">
      Your account is live. Here's the best place to start:
    </p>
    <div style="background:#f5f2ed;padding:24px;margin:0 0 28px;">
      <p style="font-size:11px;letter-spacing:0.12em;color:#8b4513;text-transform:uppercase;margin:0 0 10px;">
        Free for you — right now
      </p>
      <p style="font-size:15px;color:#2d241e;font-weight:400;margin:0 0 8px;">
        6 free downloads, no card required
      </p>
      <p style="font-size:13px;color:#8b7355;line-height:1.7;margin:0 0 20px;">
        WhatsApp automation scripts, AI prompt starters, an Excel automation pack,
        and business audit frameworks — all built for East African business reality.
        Grab whatever is most relevant to where you are right now.
      </p>
      ${CTA(`${SITE}/shop`, 'Get Your Free Resources')}
    </div>
    <p style="color:#3d3028;font-size:14px;line-height:1.8;margin:0 0 8px;">
      When you're ready to go deeper, the paid playbooks are step-by-step
      implementation guides — not theory, actual workflows.
    </p>
    <p style="color:#8b7355;font-size:13px;line-height:1.8;margin:0 0 28px;">
      And if you want a 30-minute call to map the highest-leverage automation
      in your business, that's available too.
    </p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;">
      ${CTA(`${SITE}/shop`, 'Browse the Shop')}
      &nbsp;&nbsp;
      <a href="${SITE}/office" style="display:inline-block;border:1px solid #8b4513;color:#8b4513;padding:13px 28px;text-decoration:none;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">Book a Call</a>
    </div>
  `);
}

export const registrationWelcomeSubject = "Your DR.DULLU account is live";
