<!-- converted from DDi_Payment_Systems_Proposal.docx -->

PAYMENT SYSTEMS
SERVICE PROPOSAL
Prepared by DDi — Dullu Digital  |  digital.dullugroup.co.ke

─────────────────────────────────────────────────────────────────

01. EXECUTIVE SUMMARY
Every business that takes money from customers has a payment problem. Not because they cannot accept payments — but because the systems around those payments are fragile, slow to recover from failures, and invisible until something goes wrong.
DDi builds payment systems that are secure, fault-tolerant, and built for the markets they operate in. That means M-Pesa and Paystack for Kenya, Stripe for international, and the architecture underneath to ensure transactions never get lost, customers always know what happened, and your team never wakes up to a reconciliation nightmare.
"Live in 21 days" is the standard. No lock-in contracts.



02. THE PROBLEM WITH MOST PAYMENT SYSTEMS
Most payment implementations in Kenyan businesses fail at one or more of these points:
Double charges   Customer clicks pay twice, gets charged twice. No idempotency layer.
Silent failures   Payment fails at the gateway but the system shows "pending" forever. No webhook handling.
No M-Pesa fallback   System only accepts cards. 85% of Kenyan transactions are mobile money.
Missing audit trail   No record of what happened, when, or why. Reconciliation is manual and error-prone.
No customer notification   Payment declines with no message. Customer assumes the site is broken. They leave.
Refunds are manual   No automated refund flow. Every refund requires someone to log into the gateway dashboard.

03. WHAT WE BUILD
GATEWAY LAYER
We integrate the right payment providers for your market. We do not build from scratch what already exists.
- M-Pesa STK Push (Daraja API) — for Kenyan mobile money, the default payment method
- Paystack — cards + mobile money, KES-native, fastest onboarding in Kenya
- Stripe — international cards, subscriptions, multi-currency
- We select the right combination for your business. You do not need all three.
SECURITY LAYER
- SSL/TLS on all endpoints — no exceptions
- Webhook signature verification — every gateway event is authenticated before processing
- Tokenization — card data never touches your server. PCI-DSS handled by the gateway.
- 3D Secure on card transactions where supported
- Rate limiting on checkout — prevents brute-force payment attempts
- Account lockout after repeated failed attempts
TRANSACTION STATE MACHINE
Every payment moves through a defined set of states: initiated → processing → captured / failed / refunded. State transitions are driven by gateway webhooks, not frontend confirmation. The database is always the source of truth.
- Idempotency keys on every transaction — one charge per intent, guaranteed
- Webhook deduplication — the same event processed twice has no effect
- Network interruption handling — transaction resolves correctly even if the user's connection drops mid-payment
CUSTOMER COMMUNICATION
- Real-time notifications on every state change — success, failure, pending, refunded
- Email confirmation on capture
- SMS notification on failure (so the customer knows immediately, even if they closed the browser)
- Clear error messages at every step — the customer always knows what happened and what to do next
REFUND & DISPUTE HANDLING
- Automated refund flow — triggered from your admin dashboard, no gateway login required
- Partial and full refund support
- Dispute detection and logging
- Customer notified automatically on refund processed
RECONCILIATION & MONITORING
- Daily reconciliation: gateway records vs your database — any mismatch triggers an alert
- Real-time success rate monitoring — alert fires if payment success rate drops below 95%
- Admin dashboard showing transaction history, statuses, and revenue by period

04. WHAT IS INCLUDED IN EVERY BUILD
- ✓  Gateway integration (M-Pesa + Paystack standard, Stripe on request)
- ✓  Webhook handlers for all payment events
- ✓  Idempotency and deduplication layer
- ✓  Transaction state machine with full audit trail
- ✓  Customer notification system (email + SMS)
- ✓  Admin dashboard: transactions, statuses, revenue overview
- ✓  Refund flow
- ✓  Rate limiting and fraud prevention basics
- ✓  Reconciliation logic
- ✓  Full test suite: positive, negative, edge cases, load (100 concurrent)
- ✓  Deployment to your infrastructure or Vercel
- ✓  Documentation: API reference + runbook for your team

05. TESTING — WHAT WE VERIFY BEFORE GO-LIVE
FUNCTIONAL TESTING
- Valid card, valid funds → payment captured and confirmed
- Valid card, insufficient funds → correct error message, no charge
- Invalid card number / CVV / expiry → validation fires before submission
- M-Pesa STK Push → prompt fires, user confirms, payment captured
- M-Pesa STK Push timeout → user ignores prompt → handled gracefully, no orphan charge
NEGATIVE & EDGE CASE TESTING
- Network cut mid-transaction → state resolves correctly on reconnection
- User clicks Pay twice → only one charge goes through (idempotency)
- Same webhook fired twice → second event ignored (deduplication)
- Payment declines → customer notified immediately
- Refund on already-refunded transaction → blocked with clear error
- Expired card → correct error, user prompted to update
SECURITY TESTING
- Webhook signature verification — reject unsigned or tampered events
- Rate limiting — checkout endpoint rejects after 3 attempts in 10 minutes
- Unauthorized access to admin payment routes → blocked
- SQL injection on payment input fields → sanitized
- Card data never logged or stored in plaintext
PERFORMANCE TESTING
- 100 concurrent transactions — all resolve correctly, no data loss
- Webhook endpoint — handles burst of 50 events in under 2 seconds
- Reconciliation job — completes under 30 seconds for 10,000 transactions

06. PRICING
All pricing is in USD. KES equivalent available on request. No lock-in contracts. 50% upfront, 50% on delivery.




Custom builds and existing system integrations quoted separately. Contact us with your stack details.

07. TYPICAL PROJECT TIMELINE
Days 1–3   Discovery & architecture   Review your existing stack, define gateway requirements, confirm test environments.
Days 4–8   Gateway integration   Connect M-Pesa + Paystack (and Stripe if required). Sandbox testing begins.
Days 9–13   State machine & webhooks   Build transaction state machine, webhook handlers, idempotency layer.
Days 14–17   Notifications & admin UI   Email/SMS notifications, admin dashboard, refund flow.
Days 18–20   Testing   Full test suite: functional, negative, security, performance.
Day 21   Deployment & handover   Deploy to production. Documentation delivered. Team walkthrough.

08. WHY DDI




─────────────────────────────────────────────────────────────────

Ready to talk?
digital.dullugroup.co.ke  |  @iandullu
DDi — Dullu Digital  |  Knowledge. Audacity. Empire.
| We have built this in production. 4unter, our own SaaS product, runs on the exact architecture described in this proposal. |
| --- |
| STARTER
$2,500
Onboarding: $1,250 | ✓  M-Pesa + Paystack integration
✓  Webhook handlers + state machine
✓  Customer email notifications
✓  Admin transaction dashboard
✓  Test suite
✓  Deployment + docs
✓  Live in 14 days |
| --- | --- |
| BUSINESS
$4,500
Onboarding: $2,250 | ✓  Everything in Starter
✓  Stripe (international) added
✓  SMS notifications
✓  Refund automation
✓  Reconciliation system
✓  Dispute detection
✓  Live in 21 days |
| --- | --- |
| SCALE
$8,000
Onboarding: $4,000 | ✓  Everything in Business
✓  Multi-currency support
✓  Advanced fraud detection
✓  Dunning / retry logic for subscriptions
✓  Real-time monitoring + alerts
✓  Custom admin dashboard
✓  Live in 28 days |
| --- | --- |
| We have built this in production.
4unter — our own SaaS product — runs the exact architecture in this proposal.
Stripe + Paystack dual gateway. Idempotency on every transaction. State machine driven by webhooks. Daily reconciliation. Full audit trail. We did not design this on a whiteboard — we built it, deployed it, and it is handling real payments right now. |
| --- |
| We understand the Kenyan market.
M-Pesa is not an afterthought for us. It is the primary integration.
Most payment system builders treat M-Pesa as a secondary option. We treat it as the default. If your customers are in Kenya, 85% of them will pay via mobile money. We build for that reality first. |
| --- |
| We do not disappear after deployment.
Every build includes a runbook and team walkthrough.
Your team will understand how the system works, what to do when something fails, and how to read the monitoring dashboard. We do not build black boxes. |
| --- |