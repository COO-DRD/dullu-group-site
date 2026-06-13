<!-- converted from 4unter_Blueprint_May2026.docx -->

4UNTER
AI Lead Intelligence Platform
Built for the Kenyan B2B Market

PRODUCT BLUEPRINT & BUSINESS MODEL

Version 1.0  ·  May 2026

Dullu Digital  ·  hunter.dullugroup.co.ke

────────────────────────────────────────────────────────────────────────────────

1. EXECUTIVE SUMMARY
4unter is a B2B lead intelligence SaaS platform built exclusively for the Kenyan market. It automates the entire prospecting workflow — discovering quality businesses from public databases, enriching each lead with website intelligence and contact data, scoring fit using proprietary AI, and generating personalised WhatsApp and email outreach copy. The full pipeline runs in under three minutes per 50 leads.
There is no direct SaaS competitor targeting Kenyan SMBs with AI-powered lead intelligence. Global tools (Apollo.io, Hunter.io, ZoomInfo) are USD-priced, North America–centric, and have no WhatsApp generation, no Google Maps scraping, and no understanding of the Kenyan market. 4unter fills a clear gap.



2. PRODUCT OVERVIEW
2.1  The Problem
Kenyan sales teams spend 70–80% of prospecting time on manual tasks: searching Google Maps, copying business details into spreadsheets, researching websites, and writing generic outreach messages that get ignored. No affordable tool automates this for the local market.
2.2  The Solution: The 4unter Pipeline

2.3  Data Sources
4unter pulls from multiple sources to maximise data quality while controlling cost:
- Premium mapping database (rated, reviewed businesses with website + phone) — used for high-quality scrapes
- Community geographic database (OpenStreetMap Overpass API) — free, no quota, used for bulk volume
- Live website crawl — enrichment fetches each business's own website for contact data and signals
- Social platform OG-tag intelligence — Instagram/Facebook/TikTok follower and activity signals
- Kenya phone normalisation — E.164 normalisation for 07xx, +254, 020 formats
2.4  Quality Protocol
Every lead passes through a protocol filter before entering the database. The filter enforces:
- Minimum Google rating (configurable per vertical — typically 3.5–4.0 stars)
- Minimum review count (typically 10–30 reviews, vertical-specific)
- Business name blocklist (removes chains, franchises, irrelevant categories)
- Duplicate detection via (org_id, name) unique constraint
- Honeypot and bot-detection on all public-facing forms

3. FEATURE SET
3.1  Lead Discovery
- 36 Kenyan B2B verticals (restaurants, beauty salons, law firms, hotels, clinics, schools, car dealers, etc.)
- City-scoped searches across all major Kenyan cities
- Dual-source: premium database (richer data) and community database (free, no quota)
- Real-time scrape job tracking with progress bar
- Automatic deduplication per workspace
- Protocol-filtered output — quality leads only, not raw directory dumps
3.2  Lead Enrichment (v2)
- Website crawl: email extraction, phone normalisation, booking system detection
- Tech stack detection (WordPress, Shopify, Wix, custom dev)
- Live chat detection (WhatsApp widget, Tidio, Intercom, etc.)
- Social profiles: Instagram, Facebook, TikTok, YouTube follower/activity signals
- Online payment capability detection
- SSL and HTTPS verification
- Year established estimation from copyright footers
- Staff size signal from About/Team pages
- Kenya certifications and regulatory markers
- Opportunity Score: composite of reachability + gap count + social activity + business maturity
- Vertical-aware enrichment — 28 vertical configs with subpages, signal regex, gap detection
3.3  AI Scoring
- 0–100 Fit Score — calibrated per vertical
- Specific pain signals surfaced (e.g. 'No booking system', 'WhatsApp button missing', 'No SSL')
- Proprietary scoring engine (not disclosed publicly)
- Bulk scoring — score entire lead list in one click
- Scores stored and searchable; leads sortable by score
3.4  Outreach Copy Generation
- WhatsApp opener — casual, specific, pain-led, under 160 characters
- Email opener — professional, subject line + body, personalised per lead
- Pain-led copywriting — uses vertical-specific pain signals, not templates
- Bulk outreach — generate copy for all scored leads at once
- Outreach channels: WhatsApp (default) + Email
- Copy stored per lead; editable before sending
3.5  Pipeline Management
- Kanban-style pipeline view: New → Contacted → Replied → Won → Lost
- Stage transitions tracked with timestamps
- Filter leads by stage, vertical, city, score, enrichment status
- Export to CSV
- Lead detail view: full enrichment data, score, copy, notes
3.6  Team & Corporate Features
- Multi-seat corporate accounts (5 / 15 / 30 seats depending on plan)
- Admin can invite members by email (individual or bulk comma-separated)
- Suspend / reinstate members without losing their data
- Domain auto-join: users signing up with a company email auto-join the org
- Role system: Admin (org owner) / Member (all features, no billing/settings)
- Corporate account requires KRA PIN, company registration, billing email
3.7  Settings & Compliance
- KRA PIN storage (format-validated: A123456789B)
- Company registration number
- Billing email (separate from account email)
- Kenya Data Protection Act 2019 consent audit trail (IP + user agent + timestamp)
- Operating county and physical address (required for corporate)
- Domain auto-join configuration
- Hunter Enrichment Mode: Standard / Aggressive (configurable per org)

4. TECHNICAL ARCHITECTURE
4.1  Stack

4.2  Data Architecture
All data is scoped by org_id. Every API route calls resolveOrgId(user.id) — corporate members transparently share their admin's workspace without any code changes.
Key tables:

4.3  Auth Flow (Post-Confirmation Deferred Writes)
Security-hardened signup flow: no database rows are created until the user clicks the email confirmation link. All org setup data (account type, trial length, consents, corporate fields, client IP for DPA audit) is stored in Supabase user_metadata at sign-up time. The /auth/callback route creates hunter_orgs and hunter_legal_consents only after exchangeCodeForSession confirms the email.
- Email signup → user_metadata stored → confirmation email sent → /auth/callback → org + consents created
- Google OAuth → /auth/callback → minimal org created (no email confirmation needed)
- Corporate invite → fn_accept_invite_safe RPC (atomic, seat-guarded) → member added to existing org
4.4  Background Processing
Scrape jobs use Next.js after() to run in the background after the HTTP response is returned. Vercel Fluid Compute keeps the function alive for up to 300 seconds post-response. The client polls /api/scrape/[jobId]/status every 2 seconds for real-time progress.
4.5  Security Posture


5. PRICING MODEL
5.1  Three-Tier Structure
Pricing is KES-first. Local pricing eliminates USD conversion friction and positions Hunter as a product built for Kenya, not adapted for it.

5.2  Add-On Credits

5.3  Trial Strategy
Time-gated free trial — not permanent freemium (AI scoring has real marginal cost):
- 7-day full Team-tier trial for individual signups
- 14-day full Corporate-tier trial for corporate signups
- No credit card required to start (reduces friction)
- Day 5 automated reminder via email + WhatsApp
- Workshop attendees receive 30 days Solo tier free as onboarding conversion tool
- Referral: existing user refers → both receive 50 bonus lead credits
5.4  Revenue Target Analysis
To reach KES 40,000/month (KES 10,000/week):

KES 10,000/week is achievable with 15–27 paying accounts — within reach of a 60-day Hunter outreach campaign targeting Nairobi sales teams.

6. RUNNING COSTS & INFRASTRUCTURE
6.1  Monthly Infrastructure Cost by Scale

6.2  Payment Infrastructure

6.3  Gross Margin at 100 Paying Accounts
Illustrative mix: 60 Solo + 30 Team + 10 Corporate


7. COMPETITIVE LANDSCAPE
7.1  Global Competitors

7.2  Kenya / Africa Landscape
There is no credible dedicated lead intelligence SaaS targeting Kenyan SMBs with Maps scraping + AI scoring. The closest competitors are:
- Manual scraping freelancers (KES 5,000–15,000 per batch, one-time, no AI)
- Facebook/Meta Lead Ads (CPM-based reach, not a data tool)
- Greydale Africa (lead gen agency, custom pricing, not SaaS)
- Africa's Talking / Infobip (messaging infrastructure, not lead intelligence)
Gap confirmed: 4unter has no direct SaaS competitor in the Kenyan SMB lead intelligence space.
7.3  Willingness to Pay (Kenya)


8. GO-TO-MARKET STRATEGY
8.1  Primary Channel: Hunter Outreach
The product sells itself — use 4unter to generate and close its own customers. Target Nairobi-based sales managers, founders, and agencies using the tool's own discovery pipeline.
- Discovery: Use 4unter to scrape 'sales consultants', 'marketing agencies', 'business development' across Nairobi, Mombasa, Kisumu
- Enrichment + Score: Identify leads with weak outreach infrastructure (no CRM mentions, manual pipeline tools)
- Outreach: Send WhatsApp opener using 4unter's own generated copy
- Estimated CAC: ~KES 0 hard cost (time only during Hunter outreach phase)
- Expected reply rate: 8–15% (WhatsApp cold outreach, Kenyan SMBs)
- Expected trial conversion: 20–30% of replies
- Expected paid conversion: 20–30% of trials
- Effective: 500 outreaches → ~3 paying customers
8.2  Workshop Funnel
- Weekly 'Find 50 Leads in 30 Minutes' workshop — free or KES 500 entry
- Live demo: scrape → enrich → score → copy in real time
- Every attendee receives 30-day Solo trial
- Target conversion: 20–30% to paid within 30 days
- Workshop format: Thursday 6–7:30 PM EAT, Zoom, 25 seats max
8.3  Content + Referral
- LinkedIn short-form content: before/after demos, KPI proof (cost per lead, time saved)
- Referral loop: existing user refers → both get 50 bonus lead credits
- Workshop testimonials → social proof for sign-up page
- Dullu Digital brand positioning: 'We use Hunter daily for our own AI automation pipeline'

9. PRODUCT ROADMAP
9.1  Now (Live in Production)
- Full 4-stage pipeline: Discover → Enrich → Score → Outreach
- 36 Kenyan verticals, dual-source discovery
- Enrichment v2: phones, social profiles, opportunity score, vertical-aware signals
- Corporate accounts: multi-seat, invites, domain auto-join, suspend/reinstate
- Stripe billing: 3 plans (Starter KES 5K / Growth KES 12K / Enterprise KES 25K) + payment ledger
- Kenya DPA compliance: consent audit trail, KRA PIN, company reg
- Deferred DB writes: org created only after email confirmation
- Workshop registration page + API
- PWA: installable as mobile app
9.2  Next 30 Days
- Switch payment stack from Stripe to Paystack (Stripe not available for Kenyan merchants)
- M-Pesa STK Push for add-on credit top-ups via Daraja 3.0
- Resend for transactional email (replace Supabase built-in SMTP)
- /api/health endpoint for uptime monitoring
- Background job timeout + heartbeat (scrape jobs capped at 250s)
- Missing DB indexes: (org_id, status) on scrape_jobs; (org_id, stage) on leads
- Analytics route pagination (current full-table scan risk)
9.3  Next 90 Days
- Zapier integration (Corporate tier)
- WhatsApp Business API direct send (own API key)
- Google Sheets sync export (Team + Corporate)
- Credit enforcement: gate scoring/outreach on credits_used < credits_total
- Proactive credit warning emails at 80% utilisation
- Row-level credit deduction via Postgres function (prevent double-spend)
- LPO invoicing for corporate annual contracts
9.4  H2 2026
- Native M-Pesa subscription billing (monthly recurring via Daraja 3.0)
- Custom scoring rubric per org (Corporate tier)
- White-label outreach templates (Corporate tier)
- API access for external integrations (Corporate tier)
- Multi-language outreach copy (Swahili + English)
- Expanded verticals: East Africa (Uganda, Tanzania) coverage
- AI-powered follow-up sequence generator

10. COMPLIANCE & LEGAL
10.1  Kenya Data Protection Act 2019
4unter is built with Kenya DPA 2019 compliance as a first-class requirement, not an afterthought:
- Consent collected explicitly at signup: Terms of Service + DPA data collection + DPA third-party enrichment
- Corporate accounts additionally capture Data Processing Agreement consent
- All consents recorded with: consent type, version (1.0), IP address, user agent, timestamp
- Consent records are immutable — no UPDATE or DELETE on hunter_legal_consents table
- Data collected is publicly available business information (names, addresses, phones, websites) — not personal data of private individuals
- Email, name, and phone of business contacts are collected only from public sources and with user-initiated enrichment
- Data retention: lead history per tier (90 days / 12 months / unlimited)
- Right to erasure: org deletion cascades to all associated leads and consents
10.2  Data Sources Disclosure (Terms of Service)
4unter's Terms of Service explicitly discloses data sources: business names, phone numbers, website URLs, addresses, and ratings from public sources (mapping platforms and public business websites). This disclosure is preserved even when provider names are omitted from marketing materials.
10.3  Security Certifications (Roadmap)
- SOC 2 Type I — target Q3 2026 (prerequisite for enterprise contracts)
- ISO 27001 — target 2027

11. TEAM & CONTACTS


Domains under Dullu Group


12. APPENDIX — PRODUCTION SECURITY AUDIT (May 2026)
Full code review conducted across 7 categories. 34 findings. Status as of this document:


All CRITICAL and HIGH-FIXED issues have been committed to main and are production-ready. Remaining OPEN items are tracked in the 30/90-day roadmap (Section 9.2–9.3).
────────────────────────────────────────────────────────────────────────────────
4unter Blueprint  ·  Dullu Digital  ·  Confidential  ·  May 2026
| Metric | Value |
| --- | --- |
| Target Market | Kenyan founders, sales leads, consultants, agencies |
| Verticals Covered | 36 Kenyan B2B verticals (restaurants to legal firms) |
| AI Engine | Proprietary Hunter Intelligence (not disclosed publicly) |
| Infrastructure | Next.js 16 · Supabase · Vercel · Stripe |
| Monthly Infrastructure Cost (MVP) | ~KES 7,060 (~$55) |
| Monthly Infrastructure Cost (100 users) | ~KES 20,330 (~$157) |
| Time to Revenue Target (KES 40K/month) | 15–27 paying accounts |
| Gross Margin (blended) | ~75–92% depending on tier |
| Launch Date | Live — hunter.dullugroup.co.ke |
| Stage | What Happens | Time |
| --- | --- | --- |
| 01  DISCOVER | Scan 36 Kenyan verticals by city. Hunter's quality protocol filters for rated, reviewed businesses only — no spam, no irrelevant entries. | ~2 min per 50 leads |
| 02  ENRICH | Crawl each business website: extract emails, phone numbers, WhatsApp CTAs, booking systems, live chat, social profiles, tech stack, certifications, online payment capability. | ~1 min per lead |
| 03  SCORE | Hunter Intelligence rates every lead 0–100. Surfaces specific pain signals: missing booking system, no live chat, weak social presence. Calculates Opportunity Score. | ~10 sec per lead |
| 04  OUTREACH | Generate personalised WhatsApp opener and email copy — written with the lead's real pain, not a template. Ready to send in one click. | ~5 sec per lead |
| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend Framework | Next.js 16 (App Router) | Server components, API routes, ISR, PWA |
| UI Library | Tailwind CSS + shadcn/ui | Dark-theme component library |
| Auth | Supabase Auth | Email/password + Google OAuth, email confirmation required |
| Database | Supabase Postgres (service role) | All data — orgs, leads, jobs, billing events |
| File Storage | Supabase Storage | Lead exports, attachments |
| AI Engine | Proprietary (Hunter Intelligence) | Scoring + outreach generation |
| Hosting | Vercel (Fluid Compute) | Background functions, CDN, edge caching |
| Payments | Stripe (current) / Paystack (roadmap) | Subscription billing + one-time payments |
| Email | Supabase SMTP / Resend | Auth emails, workshop confirmations, alerts |
| PWA | @ducanh2912/next-pwa | Installable mobile app, service worker |
| Table | Purpose |
| --- | --- |
| hunter_orgs | One row per workspace. Stores plan, credits, trial dates, compliance data, onboarding config. |
| hunter_leads | Core entity. All discovery, enrichment, scoring, and outreach fields live here. |
| hunter_scrape_jobs | Job tracking: status, progress/total for real-time polling. |
| hunter_org_members | Corporate member roster: role (admin/member), status (active/suspended). |
| hunter_org_invites | Pending email invitations with expiry and token-based acceptance. |
| hunter_legal_consents | Immutable Kenya DPA audit trail: consent type, version, IP, user agent, timestamp. |
| hunter_subscriptions | Stripe subscription lifecycle: plan, status, period dates, seat limit. |
| hunter_payment_intents | Payment intent ledger with idempotency keys. |
| hunter_payment_events | Immutable Stripe webhook event log — every event recorded regardless of outcome. |
| Control | Implementation |
| --- | --- |
| SSRF Protection | isSafeUrl() blocks all private ranges (RFC1918, link-local 169.254.x.x, localhost, .internal, .local) |
| Rate Limiting | In-memory per-IP: 60 RPM general API, 15 RPM auth API (/api/auth/*). Page navigations never rate-limited. |
| Bot Blocking | Middleware blocks known headless UA strings (curl, puppeteer, selenium, scrapy, etc.) |
| Honeypot | Hidden _hp field on signup/workshop forms; bots get fake success, never reach DB |
| Disposable Email Blocking | 70+ temp-mail domains blocked at signup |
| Gibberish Detection | Keyboard-walk pattern + repeated-char detection on name fields |
| Kenya DPA Compliance | Consent audit trail (IP, UA, timestamp, version) for terms/DPA/DPA-enrichment/DPA-3rd-party |
| Webhook Signature | Stripe signature verified via constructEvent(); STRIPE_WEBHOOK_SECRET validated at startup |
| Org Isolation | Service role client + manual .eq('org_id', orgId) on every query — RLS decorative |
| Email Confirmation Gate | Middleware blocks unconfirmed sessions from all app routes; deferred DB writes enforce this at data level |
| Corporate Account Rigor | KRA PIN regex, company reg min 3 chars, address min 8 chars, operating county validated against 47 Kenya counties |
|  | SOLO / HUSTLER | TEAM / AGENCY | CORPORATE |
| --- | --- | --- | --- |
| Monthly (KES) | 1,500 | 5,500 | 18,000 |
| Monthly (USD approx.) | ~$12 | ~$42 | ~$139 |
| Annual (KES) | 15,000 | 55,000 | 180,000 |
| Leads / month | 200 | 1,500 | 8,000 |
| AI Scores / month | 200 | 1,500 | 8,000 |
| WhatsApp copy / month | 200 | 1,500 | 8,000 |
| Email copy / month | 100 | 1,500 | 8,000 |
| Seats | 1 | 3 | 10 |
| Lead history | 90 days | 12 months | Unlimited |
| Export | CSV | CSV + Excel | CSV + Excel + API |
| Integrations | None | Basic webhook | Zapier + API + WhatsApp API |
| Custom scoring rubric | No | No | Yes |
| White-label templates | No | No | Yes |
| Onboarding support | Email (48hr) | Email (24hr) | 1-hour setup call + SLA |
| Invoicing | Card only | Card only | LPO / company invoice available |
| Gross margin | ~92% | ~80% | ~63% |
| Add-on | Price |
| --- | --- |
| Extra 500 leads (scored + copy) | KES 900 |
| Extra 100 leads | KES 200 |
| Bulk historical export (10K) | KES 500 one-time |
| Additional seat | KES 1,500/seat/month |
| Scenario | Accounts | Monthly Revenue |
| --- | --- | --- |
| 27 × Solo | 27 | KES 40,500 |
| 10 × Solo + 5 × Team | 15 | KES 42,500 |
| 2 × Corporate + 2 × Team | 4 | KES 47,000 |
| 1 × Corporate + 5 × Team | 6 | KES 45,500 |
| Cost Item | MVP (0–50 users) | Mid-Scale (100 users) | Growth (500 users) |
| --- | --- | --- | --- |
| Vercel Pro | KES 2,590 ($20) | KES 5,180 ($40) | KES 5,180 ($40) |
| Supabase Pro | KES 3,240 ($25) | KES 4,535 ($35) | KES 10,360 ($80) |
| Premium Mapping API | KES 0 (free tier) | KES 2,590 ($20) | KES 19,425 ($150) |
| AI Engine | KES 1,036 ($8) | KES 5,180 ($40) | KES 25,900 ($200) |
| Email (Resend) | KES 0 (free tier) | KES 2,590 ($20) | KES 11,655 ($90) |
| Domain (amortized) | KES 195 (~$1.50) | KES 195 (~$1.50) | KES 648 ($5) |
| TOTAL (KES) | ~KES 7,061 | ~KES 20,270 | ~KES 73,168 |
| TOTAL (USD) | ~$55 | ~$157 | ~$565 |
| Gateway | Transaction Fee | Use Case | Notes |
| --- | --- | --- | --- |
| Paystack | 1.95% local / 3.8% intl | Monthly/annual card subscriptions | Stripe-owned; best Kenyan DX; KES subscriptions supported; T+1 settlement |
| M-Pesa (Daraja 3.0) | ~0.5% capped KES 200 | One-time top-ups, add-on credits | Safaricom Daraja 3.0 (Nov 2025); STK Push; no customer fee |
| Wise Invoice | ~0.5–1% transfer fee | Diaspora / USD annual contracts | For international clients paying in USD |
| Stripe | — | NOT recommended | Stripe does not support Kenyan merchant accounts — accounts get frozen |
| Segment | Revenue (KES) | COGS (KES) | Margin |
| --- | --- | --- | --- |
| 60 × Solo @ 1,500 | 90,000 | 7,800 | 91% |
| 30 × Team @ 5,500 | 165,000 | 33,150 | 80% |
| 10 × Corporate @ 18,000 | 180,000 | 67,600 | 62% |
| Infrastructure floor | — | 20,000 | — |
| Paystack fees (~1.95%) | — | 8,483 | — |
| TOTAL | 435,000 | 137,033 | ~69% |
| Net monthly | 297,967 | — |  |
| Product | Entry Price (USD) | Key Gap vs 4unter |
| --- | --- | --- |
| Apollo.io | $49/user/mo | No Kenya data, no WhatsApp, no Maps scraping. Requires annual contract. |
| Hunter.io | $34/mo (email only) | Email finder only — no scoring, no outreach, no Maps, no Kenyan market data. |
| Seamless.AI | $147/mo (250 credits) | US-centric contact DB. No Africa data. No AI scoring for local signals. |
| ZoomInfo | $14,995/yr minimum | Enterprise-only pricing. Zero relevance to Kenyan SMBs. |
| LinkedIn Sales Navigator | $99/user/mo | No Maps scraping, no enrichment, no AI copy. Weak Kenya business data. |
| Segment | Typical WTP/Month | 4unter Price | Position |
| --- | --- | --- | --- |
| Micro-business (1–5 staff) | KES 500–1,500 | KES 1,500 Solo | At upper end — needs clear ROI pitch |
| SMB (5–50 staff) | KES 2,000–8,000 | KES 5,500 Team | Middle of range — strong value |
| Mid-market (50–200 staff) | KES 10,000–30,000 | KES 18,000 Corporate | Middle of range — excellent value |
| Corporate (200+ staff) | KES 30,000+ | Custom | Custom enterprise contracts |
| Role | Name | Contact |
| --- | --- | --- |
| Founder & CEO | Dr. Dullu (Ian Jillo) | dr.dullu@outlook.com |
| Brand | Dullu Digital | dullugroup.co.ke |
| Social | @iandullu | LinkedIn / X |
| Product | hunter.dullugroup.co.ke | Live production URL |
| Workshops | hunter.dullugroup.co.ke/workshop | Every Thursday, 6 PM EAT |
| Subdomain | Purpose |
| --- | --- |
| dr.dullugroup.co.ke | Personal / consultancy profile |
| digital.dullugroup.co.ke | Dullu Digital agency |
| hunter.dullugroup.co.ke | 4unter SaaS platform (this product) |
| media.dullugroup.co.ke | Media / content arm |
| Finding | Severity | Status |
| --- | --- | --- |
| Team DELETE: .ilike('%@%') wiped all org invites | CRITICAL | FIXED |
| Onboarding IDOR: user.id vs resolveOrgId() | CRITICAL | FIXED |
| Stripe checkout: empty price IDs passed to Stripe | CRITICAL | FIXED |
| priceIdToPlan: silent downgrade to 'starter' | CRITICAL | FIXED |
| Leads API limit: unbounded (DoS vector) | HIGH | FIXED |
| Leads search q: unbounded string (expensive regex) | HIGH | FIXED |
| SSRF: link-local 169.254.x.x block | HIGH | ALREADY PROTECTED |
| SSRF: metadata.google.internal suffix check | HIGH | ALREADY PROTECTED |
| Stripe webhook signature try/catch | HIGH | ALREADY PROTECTED |
| Rate limiter: page nav counted toward auth quota | HIGH | FIXED (prior commit) |
| Confirmation link blocked by rate limiter | HIGH | FIXED (prior commit) |
| Dashboard safety-net upsert bypassed deferred writes | HIGH | FIXED (prior commit) |
| Rate limiter unbounded memory growth | HIGH | OPEN — recommend Redis at scale |
| Background scrape: no explicit timeout | HIGH | OPEN — 30-day roadmap |
| Analytics route: full table scan (no pagination) | MEDIUM | OPEN — 30-day roadmap |
| Missing indexes: (org_id, status), (org_id, stage) | MEDIUM | OPEN — 30-day roadmap |
| Invite batch: no max batch size (email flood risk) | MEDIUM | OPEN |
| Gemini error: non-200 not checked before streaming | MEDIUM | OPEN |
| Missing /api/health endpoint | MEDIUM | OPEN — 30-day roadmap |
| No credit double-spend protection (Postgres lock) | MEDIUM | OPEN — credits not enforced yet |