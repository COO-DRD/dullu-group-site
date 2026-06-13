<!-- converted from Hunter_Security_Privacy_Checklist.docx -->



Hunter Platform
Security & Privacy Checklist

Dullu Digital  |  Version 1.0  |  May 2026

Stack: Next.js · Supabase · Python scripts · Google Places · Gemini · Stripe



Severity guide:  CRITICAL = data breach / auth bypass risk  HIGH = serious exposure  MEDIUM = hardens posture  LOW = best practice

1. Secrets & Environment Variables
1.1 Secret Management
☐  hunter/.env is listed in .gitignore and has NEVER been committed  [CRITICAL]
Run: git log --all --full-history -- .env to verify
☐  contacts.json is in .gitignore — it may contain personal data (names, phones, emails)  [CRITICAL]
Run: git log --all --full-history -- contacts.json
☐  SUPABASE_SERVICE_ROLE_KEY is never exposed in any frontend file or Next.js NEXT_PUBLIC_ variable  [CRITICAL]
grep -r 'SERVICE_ROLE' hunter-saas/src/ should return zero results
☐  GOOGLE_PLACES_API_KEY has HTTP referrer restrictions in Google Cloud Console  [HIGH]
Without restrictions, key can be stolen and used fraudulently
☐  GEMINI_API_KEY has per-day quota limits set in Google AI Studio  [MEDIUM]
☐  Stripe secret key is never in any frontend bundle (NEXT_PUBLIC_)  [CRITICAL]
Only NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY should be public
☐  All secrets in Vercel Environment Variables are set to the correct environment (prod/preview/dev)  [HIGH]
☐  A secret rotation schedule exists — rotate all keys at least every 90 days  [MEDIUM]
1.2 Local Development
☐  Team members use .env.example to set up local env — no sharing of actual .env files over WhatsApp or email  [HIGH]
☐  No API keys appear in any console.log(), print(), or log file output  [HIGH]
☐  Python scripts fail loudly (RuntimeError) if env vars are missing — confirmed working  [MEDIUM]

2. Authentication & Access Control
2.1 Supabase Auth (Frontend — hunter-saas)
☐  Middleware redirects all unauthenticated requests to /sign-in (confirmed in middleware.ts)  [CRITICAL]
☐  API routes under /api are NOT unintentionally public — middleware currently skips /api/* paths  [CRITICAL]
Fix: add explicit auth checks inside each /api/route handler, or remove the !pathname.startsWith('/api') exception in middleware
☐  The /api/webhooks route is public by design — verify it validates Stripe-Signature header on every request  [CRITICAL]
Without signature verification, anyone can fake a Stripe webhook
☐  Supabase Row Level Security (RLS) is enabled on all tables  [CRITICAL]
Dashboard → Authentication → Policies — every table needs at least one policy
☐  Password reset emails use Supabase's secure link flow — no custom token handling  [HIGH]
☐  Email confirmation is required before account activation  [MEDIUM]
☐  Failed login rate limiting is enabled in Supabase Auth settings  [HIGH]
2.2 Python Scripts (hunter/)
☐  Scripts run with service-role key — only run in trusted, local environments; never deployed as a public endpoint  [CRITICAL]
☐  HUNTER_OPERATOR is logged to DB for every insert — audit trail exists  [MEDIUM]
☐  Scripts are not exposed via any web server or cron job running on a public IP  [CRITICAL]
2.3 Access Control — Multi-User (future-proofing)
☐  If multiple users/agents are added: each has their own Supabase account, not a shared login  [HIGH]
☐  Admin vs agent roles are enforced via Supabase RLS policies, not just frontend UI checks  [HIGH]
☐  There is a process to revoke access immediately when an agent leaves  [HIGH]

3. API & Network Security
3.1 Next.js API Routes
☐  Every /api/ route that writes data (import, enrich, score, scrape, opener) checks that the caller is authenticated  [CRITICAL]
Use: const { data: { user } } = await supabase.auth.getUser() in each handler
☐  Input validation is in place on all API routes — no raw user strings passed to external APIs or DB queries  [HIGH]
Especially /api/import and /api/scrape which accept user-supplied data
☐  API routes return generic error messages to the client — no stack traces or DB errors leaked  [HIGH]
☐  CORS is restricted — only your own domain can call your API routes  [MEDIUM]
Set in next.config.ts or via route-level headers
☐  Rate limiting is in place on expensive routes (/api/scrape, /api/enrich, /api/opener)  [HIGH]
Without it, a single user can exhaust your Google Places and Gemini quotas
3.2 Webhook Security
☐  Stripe webhook handler verifies the stripe-signature header using STRIPE_WEBHOOK_SECRET  [CRITICAL]
stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
☐  Raw request body (not parsed JSON) is used for Stripe signature verification  [CRITICAL]
Next.js parses body by default — use export const config = { api: { bodyParser: false } }
☐  Webhook endpoint logs all events with timestamps for audit  [LOW]
3.3 External API Calls (Python Scripts)
☐  Google Places API calls do not log the full API key in output or log files  [HIGH]
☐  Gemini API responses are not stored raw if they contain personal data about prospects  [MEDIUM]
☐  httpx client in lib/db.py has a 30s timeout — confirmed adequate for your Supabase region latency  [LOW]
☐  HTTP requests to external services go over HTTPS only — no http:// URLs in any script  [HIGH]

4. Database Security (Supabase)
4.1 Row Level Security
☐  RLS is enabled on: prospects, prospect_outreach, and any other tables containing personal data  [CRITICAL]
☐  The anon key (used in frontend) cannot read or write data without a valid authenticated user session  [CRITICAL]
☐  No policy uses (true) or 1=1 — all policies are scoped to auth.uid()  [HIGH]
☐  Test RLS policies with a test user account to confirm they block access as expected  [HIGH]
4.2 Data Minimisation
☐  Only the fields needed for outreach are stored — no unnecessary personal data collected from scraping  [HIGH]
Kenya DPA 2019 requires data minimisation
☐  A data retention policy exists — prospect records older than X months are archived or deleted  [MEDIUM]
☐  contacts.json (local file) is not a permanent store — data lives in Supabase, not local JSON files  [MEDIUM]
4.3 Backup & Recovery
☐  Supabase point-in-time recovery (PITR) is enabled on the project  [HIGH]
☐  You know how to restore from a backup — tested at least once  [MEDIUM]
☐  Database schema migrations are version-controlled  [MEDIUM]

5. Frontend Security (Next.js — hunter-saas)
5.1 Dependencies
☐  npm audit returns zero high/critical vulnerabilities  [HIGH]
Run: npm audit --audit-level=high
☐  Dependencies are updated at least monthly — especially next, @supabase/ssr, stripe  [HIGH]
☐  No unused packages in package.json  [LOW]
5.2 XSS & Injection
☐  No use of dangerouslySetInnerHTML anywhere in the codebase  [CRITICAL]
grep -r 'dangerouslySetInnerHTML' src/
☐  All user-supplied content rendered in the UI is escaped by React (default behaviour) — no raw HTML injection  [HIGH]
☐  No eval() or Function() calls with user-supplied strings  [CRITICAL]
5.3 Security Headers
☐  Content-Security-Policy header is set in next.config.ts  [HIGH]
☐  X-Frame-Options: DENY is set (prevents clickjacking)  [MEDIUM]
☐  X-Content-Type-Options: nosniff is set  [MEDIUM]
☐  Strict-Transport-Security (HSTS) is set via Vercel or next.config.ts  [MEDIUM]
☐  Referrer-Policy is set to strict-origin-when-cross-origin  [LOW]
Quick check: run your deployed URL through securityheaders.com
5.4 Stripe & Payment
☐  Stripe Elements or Stripe Checkout is used — raw card numbers never touch your server  [CRITICAL]
☐  Stripe publishable key (NEXT_PUBLIC_) is the only Stripe key in frontend code  [CRITICAL]
☐  Payment confirmation uses server-side intent verification — not just client-side success callback  [CRITICAL]

6. Outreach Compliance & Data Privacy
6.1 Kenya Data Protection Act 2019 (DPA)
☐  Hunter is registered (or exempt) under the Kenya DPA — check with the Office of the Data Protection Commissioner (ODPC)  [CRITICAL]
Registration required for data controllers/processors handling personal data
☐  A Privacy Notice exists explaining what data is collected, why, and how long it is kept  [HIGH]
☐  Prospects have a way to request deletion of their data ('right to erasure')  [HIGH]
☐  Data collected via Google Places / OSM scraping is limited to publicly available business information — no personal home addresses  [HIGH]
☐  Personal data is not transferred outside Kenya without adequate safeguards (Supabase region is documented)  [MEDIUM]
6.2 WhatsApp / Meta Compliance
☐  send_outreach.py and auto_followup.py only message contacts who have previously interacted or opted in  [CRITICAL]
Sending bulk unsolicited WhatsApp messages violates Meta's Acceptable Use Policy and can get the number banned
☐  Message templates used in sequences are pre-approved in WhatsApp Business Manager (if using API)  [HIGH]
☐  An unsubscribe / opt-out mechanism exists — prospects can reply STOP and be removed  [HIGH]
☐  Opted-out contacts are flagged in Supabase and never re-contacted automatically  [HIGH]
6.3 Email Outreach
☐  Cold email domain has SPF, DKIM, and DMARC DNS records configured  [HIGH]
Without these, emails go to spam and domain reputation degrades
☐  Unsubscribe link is present in all outreach emails (CAN-SPAM / Kenya DPA requirement)  [HIGH]
☐  Daily send volume is capped to avoid spam filter triggers (recommended: <200/day per mailbox)  [MEDIUM]
☐  Sending domain is separate from the main company domain to protect brand reputation  [MEDIUM]
6.4 Data Scraping
☐  Scraped data sources (Google Places, OSM) are used within their Terms of Service  [HIGH]
☐  Scraping rate is throttled — no aggressive looping that could trigger bans or abuse flags  [MEDIUM]
☐  Scraped personal data (names, phone numbers) is only used for the stated outreach purpose  [HIGH]

7. Infrastructure & Deployment
7.1 Vercel
☐  Production environment variables are separate from preview/development  [HIGH]
☐  Vercel project is owned by a team account — not tied solely to a personal account  [MEDIUM]
☐  Vercel deployment logs do not contain secrets (check: no env var values in build output)  [HIGH]
☐  Custom domain uses HTTPS — SSL certificate is valid and auto-renews  [HIGH]
☐  Vercel Speed Insights / Analytics does not collect personally identifiable information without consent  [MEDIUM]
7.2 Supabase Project
☐  Supabase project is on a paid plan if handling production data (free plan has usage limits and no PITR)  [MEDIUM]
☐  Supabase project region is documented — data stays in the chosen region (GDPR/DPA consideration)  [MEDIUM]
☐  Supabase dashboard access is restricted — only authorised team members have access  [HIGH]
☐  MFA is enabled on the Supabase dashboard account  [HIGH]
☐  Supabase email rate limits are reviewed — auth emails (OTP, reset) are within Supabase's quotas  [LOW]
7.3 GitHub / Source Code
☐  Repository is private  [CRITICAL]
☐  GitHub secret scanning is enabled — alerts on accidentally committed secrets  [HIGH]
☐  Branch protection on main — no direct pushes; PR review required  [MEDIUM]
☐  Dependabot or Renovate is enabled for automated dependency updates  [MEDIUM]

8. Operational Security
8.1 Access & Accounts
☐  All team accounts use strong unique passwords + a password manager  [HIGH]
☐  MFA is enabled on: GitHub, Vercel, Supabase, Google Cloud Console, Stripe  [HIGH]
☐  Shared accounts do not exist — each person has their own login  [HIGH]
☐  Offboarding checklist exists: revoke Vercel, Supabase, GitHub access immediately on departure  [HIGH]
8.2 Incident Response
☐  There is a documented process for what to do if the service role key is leaked  [CRITICAL]
Step 1: immediately rotate the key in Supabase. Step 2: audit recent DB activity. Step 3: notify affected users.
☐  There is a process for what to do if a data breach affects prospect personal data  [HIGH]
Kenya DPA requires notification to ODPC within 72 hours of awareness
☐  Supabase audit logs are reviewed at least monthly for unusual queries or access  [MEDIUM]
8.3 Regular Reviews
☐  This checklist is reviewed every 3 months  [LOW]
☐  npm audit is run before every production deployment  [MEDIUM]
☐  Penetration test or security review is conducted annually  [MEDIUM]


Sign-off
Complete this checklist before each major release and after any significant infrastructure change. Items marked CRITICAL must be resolved before going to production. HIGH items should be resolved within 1 sprint. MEDIUM and LOW items can be scheduled.

Hunter  |  Dullu Digital  |  Confidential — Internal Use Only
|  | Name | Date |
| --- | --- | --- |
| Reviewed by |  |  |
| Approved by |  |  |
| Next review due |  |  |