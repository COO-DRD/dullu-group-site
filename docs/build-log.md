# Build Log — dullugroup.co.ke
Running log of what's been built, changed, and shipped. Most recent first.

---

## 2026-06-13 — Full session: tools, community, emails, deploy

### Deployed to production
- Pushed to `github.com/COO-DRD/dullu-group-site` → Vercel auto-deployed
- Supabase `community_applications` table created via migration
- `GROQ_API_KEY` needs adding to Vercel dashboard (env var)
- WhatsApp channel link corrected across all 8 source files (`Gufl` → `GufI`)
- `graphify-out/` added to `.gitignore` (was accidentally committed)

---

### Cold Email Diagnostic — `/tools/cold-email`
Full interactive tool. No LLM for scoring — deterministic TypeScript rules engine based on proven benchmarks. Groq generates the natural language feedback.

**Files created:**
- `lib/tools/cold-email-scorer.ts` — 5-category scorer (Subject Line, Personalization, Value Prop, CTA, Length & Tone). 20pts each = 100 total. Benchmarks: Boomerang, Yesware, Outreach, Close.io.
- `app/api/tools/cold-email/route.ts` — POST handler. Runs scorer → Groq (`llama-3.1-8b-instant`) → pre-written fallback if Groq is down. Rate limited 5/IP/hour.
- `app/tools/cold-email/page.tsx` — server component, SEO metadata, `robots: index`
- `components/tools/ColdEmailChecker.tsx` — animated score counter, category bars, quick wins, soft email capture, goodwill nudge

**Environment:** `GROQ_API_KEY` in `.env.local` and Vercel dashboard

---

### Community Application Page — `/community/apply`
Gate for TYAF Layer 2 (private WhatsApp group). Not indexed by Google — invite-only feel.

**Files created:**
- `app/community/apply/page.tsx`
- `components/community/ApplyForm.tsx` — 3 questions (what building, stage, needs). Styled toggle buttons, not dropdowns. Disabled submit until all answered.
- `app/api/community/apply/route.ts` — stores in Supabase `community_applications`, notifies Ian (plain text email), confirms to applicant. Rate limited.

**Supabase table:**
```sql
create table community_applications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  building text not null,
  stage text not null,
  needs text not null,
  created_at timestamptz default now(),
  reviewed_at timestamptz,
  approved_at timestamptz,
  notes text
);
create unique index community_applications_email_idx on community_applications(email);
```

---

### Email Sequences — full rewrite and extension

**`lib/email.ts`** — added `scheduledAt` and `text` (plain text) options. Resend delivers at scheduled time; plain text used for reply-bait and breakup emails.

**`lib/email-templates.ts`** — new and updated templates:

| Template | Type | Purpose |
|---|---|---|
| `subscriberWelcomeHtml` | Updated | Identity/belonging framing. CTA → community, not shop |
| `registrationWelcomeHtml` | Updated | 3-step onboarding: WhatsApp → tools → ask for help |
| `goodwillThankYouHtml` | Updated | Credits + community invite |
| `goodwillFollowUpHtml` | Updated | Full community onboarding: "meet the room" |
| `coldEmailToolWelcomeHtml` | New | Day 0 — welcome + #1 fix (the "I"-first data) |
| `coldEmailReplyBaitText` | New | Day 1 — plain text, "what's your biggest challenge?" |
| `coldEmailNurture1Html` | New | Day 3 — 5 mistakes (data-backed) |
| `coldEmailCaseStudyHtml` | New | Day 5 — 3 rounds, 11 replies case study |
| `coldEmailNurture2Html` | New | Day 7 — 22% reply rate breakdown |
| `tyafInviteHtml` | New | Day 10 — community invite before pitch |
| `coldEmailSoftPitchHtml` | New | Day 12 — what DDi builds |
| `coldEmailBreakupText` | New | Day 14 — plain text, loss aversion close |
| `applicationNotificationText` | New | To Ian when someone applies |
| `applicationConfirmationHtml` | New | To applicant after applying |

**`/api/subscribe/route.ts`** — branches on `source`:
- `cold-email-tool` → 8-email funnel, all scheduled via Resend `scheduled_at`
- default → generic subscriber welcome

**Cold email funnel cadence (data-backed — Boomerang/Mailchimp/Encharge research):**
```
Day 0  — Welcome + tip             (HTML)
Day 1  — Reply-bait                (plain text — 15–25% higher reply rate)
Day 3  — 5 mistakes                (HTML)
Day 5  — Case study                (HTML)
Day 7  — Good email breakdown      (HTML)
Day 10 — TYAF community invite     (HTML — community before pitch)
Day 12 — DDi soft pitch            (HTML)
Day 14 — Breakup                   (plain text — 10–20% reply rate on warm lists)
```

---

### Shop → Library rename

The shop (static downloadables) reframed as a resource library that complements the tools.

**Changes:**
- `components/shop/ShopClient.tsx` — "The Shop" → "The Library", description updated
- `app/shop/page.tsx` — metadata updated
- `components/Navbar.tsx` — "Shop" → "Library" (desktop + mobile)

**All homepage CTAs retargeted:**
- `components/Hero.tsx` — "Get the Free Library" → "Try the Free Tools" → `/tools/cold-email`
- `components/Problem.tsx` — all 6 leak CTAs → `/tools/cold-email`
- `components/Proof.tsx` — "Get the Free Library" → "Try the Free Tools" → `/tools/cold-email`
- `components/WhatIBuild.tsx` — panel 01 already updated in previous commit

---

### Folder restructure — local machine

| Before | After | Why |
|---|---|---|
| `~/ops/` | `~/hq/` | Business HQ — clearer name |
| `~/dev/dullu-group-site-src/` | `~/dev/dullugroup/` | Cleaner name |
| `~/dev/hunter-saas/` | `~/dev/hunter/` | Cleaner name |
| `~/dev/dullu-shop-worker/` | `~/dev/shop-api/` | Cleaner name |
| `~/dev/dullu-group-site/` | `~/dev/_archive/dullu-group-site-static/` | Static built version, inactive |
| `~/dev/vuka-trader/` | `~/dev/_archive/` | Trading bot, inactive |
| `~/dev/job-hunter/` | `~/dev/_archive/` | Personal tool, inactive |
| `~/dev/project/` | `~/dev/_archive/unnamed-project/` | Unknown, inactive |

**Also:**
- `~/media/` created — `photos/`, `videos/`, `brand/` (11 photos, 12 videos, 18 brand assets)
- `~/.drd-digital/` removed (empty hidden folder)
- `~/Documents/brand/`, `~/Documents/content/`, `~/Documents/sales/` removed (empty duplicates)
- `~/Documents/stemconcepts-next/` → `~/dev/_archive/`
- Hunter prospect CSVs → `~/hq/outreach/data/`
- Resumés → `~/hq/personal/`
- `~/graphify-out/` moved inside `~/dev/dullugroup/` (where it belongs)
- Root-level `node_modules/` + `package.json` deleted (stray npm install)

---

## What still needs doing

- [ ] Add `GROQ_API_KEY` to Vercel environment variables dashboard
- [ ] Set up the private WhatsApp group (Layer 2)
- [ ] Build the private group link into the application approval flow (Ian DMs manually for now)
- [ ] Move `secrets.txt` from home root to `~/hq/personal/` or delete
- [ ] Rotate the Groq API key (was exposed in chat session)
- [ ] First 30-day community plan (see `docs/tyaf-community-strategy.md`)

---

## Reference — key URLs

| Resource | URL |
|---|---|
| Main site | dullugroup.co.ke |
| Cold email tool | dullugroup.co.ke/tools/cold-email |
| Community apply | dullugroup.co.ke/community/apply |
| Library | dullugroup.co.ke/shop |
| TYAF public channel | whatsapp.com/channel/0029VbCyuTQGufIzlFkQ2f0p |
| Supabase project | gjxadcttrtoqtzddxyzs |
| GitHub repo | github.com/COO-DRD/dullu-group-site |

---

## Reference — key files

| File | What it does |
|---|---|
| `lib/tools/cold-email-scorer.ts` | Deterministic email scoring engine |
| `lib/email-templates.ts` | All email HTML + plain text templates |
| `lib/email.ts` | Resend wrapper (supports scheduledAt, text) |
| `app/api/tools/cold-email/route.ts` | Cold email API (scorer + Groq) |
| `app/api/community/apply/route.ts` | Application submission handler |
| `app/api/subscribe/route.ts` | Subscribe + drip sequence scheduler |
| `docs/session-cold-email-tool.md` | Full cold email tool build documentation |
| `docs/tyaf-community-strategy.md` | Full TYAF community strategy |
