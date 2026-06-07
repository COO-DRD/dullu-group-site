import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — DR.DULLU",
  description: "How DR.DULLU collects and uses your personal data.",
  alternates: { canonical: "https://dullugroup.co.ke/privacy" },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <p
      className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-4"
      style={{ color: "#1B3D8F" }}
    >
      {title}
    </p>
    <div className="font-sans font-light text-base leading-relaxed" style={{ color: "#333333", maxWidth: "52rem" }}>
      {children}
    </div>
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
    <span>{children}</span>
  </li>
);

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">

          <div className="mb-14">
            <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
              DR.DULLU
            </p>
            <h1 className="font-sans font-black text-5xl md:text-6xl uppercase tracking-tight mb-4" style={{ color: "#D4580A" }}>
              Privacy Policy
            </h1>
            <p className="font-sans font-light text-base" style={{ color: "#888888" }}>
              Last updated: 7 June 2026
            </p>
          </div>

          <div className="mb-14 p-6" style={{ backgroundColor: "#FAFAF8", borderLeft: "3px solid #D4580A" }}>
            <p className="font-sans font-light text-sm leading-relaxed" style={{ color: "#555555" }}>
              We collect only what we need, we don&apos;t sell it, and you can remove yourself at any time.
              This policy is governed by the <strong>Kenya Data Protection Act, 2019</strong>.
            </p>
          </div>

          {/* 1. Who Is Responsible */}
          <Section title="1. Who Is Responsible">
            <p>
              <strong>DR.DULLU / Dullu Digital</strong>, Kilifi, Kenya.<br />
              Contact: <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>shop@dullugroup.co.ke</a>
            </p>
          </Section>

          {/* 2. What We Collect */}
          <Section title="2. What We Collect">
            <ul className="flex flex-col gap-3">
              <Bullet><strong>Email address</strong> — when you register, download a free product, or make a purchase.</Bullet>
              <Bullet><strong>Full name</strong> — provided at registration or checkout.</Bullet>
              <Bullet><strong>Phone number</strong> — optionally, for WhatsApp notifications. Never required.</Bullet>
              <Bullet><strong>Payment data</strong> — M-Pesa transactions are processed by Safaricom. PayPal transactions are processed by PayPal. We store only the transaction ID and confirmation status — never your M-Pesa PIN or payment card details.</Bullet>
              <Bullet><strong>Download history</strong> — which products you have accessed, stored in your account dashboard.</Bullet>
              <Bullet><strong>Onboarding answers</strong> — your business persona and primary pain point, used to personalise your dashboard.</Bullet>
            </ul>
          </Section>

          {/* 3. Legal Basis for Processing */}
          <Section title="3. Legal Basis for Processing">
            <p className="mb-4">Under DPA Section 26, we process your data on the following legal bases:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid #F0EDE8" }}>
                    <th className="text-left py-2 pr-4 font-semibold" style={{ color: "#111111", minWidth: "160px" }}>Data</th>
                    <th className="text-left py-2 font-semibold" style={{ color: "#111111" }}>Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Email (transactional)", "Contract performance — needed to deliver your purchase or download"],
                    ["Email (marketing digest)", "Consent — collected separately at registration or checkout"],
                    ["Phone / WhatsApp", "Consent — explicitly opt-in, skippable at any point"],
                    ["Purchase records", "Legal obligation — KRA 7-year retention requirement"],
                    ["Download history", "Legitimate interest — powering your personal dashboard"],
                    ["Onboarding answers", "Legitimate interest — personalising content and recommendations"],
                  ].map(([data, basis]) => (
                    <tr key={data} style={{ borderBottom: "1px solid #F0EDE8" }}>
                      <td className="py-3 pr-4 font-medium" style={{ color: "#333333" }}>{data}</td>
                      <td className="py-3" style={{ color: "#555555" }}>{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 4. How We Use It */}
          <Section title="4. How We Use It">
            <ul className="flex flex-col gap-3">
              <Bullet>To deliver your purchases and free downloads.</Bullet>
              <Bullet>To send transactional emails (order confirmation, download link, password reset).</Bullet>
              <Bullet>To send the weekly DR.DULLU digest — only if you have opted in.</Bullet>
              <Bullet>To send WhatsApp notifications about new content and events — only if you have provided your number and consented.</Bullet>
              <Bullet>To maintain your personal dashboard of downloads and member content.</Bullet>
            </ul>
          </Section>

          {/* 5. What We Don't Do */}
          <Section title="5. What We Don't Do">
            <ul className="flex flex-col gap-3">
              <Bullet>We do not sell your data to anyone.</Bullet>
              <Bullet>We do not share your email with third-party advertisers.</Bullet>
              <Bullet>We do not use advertising or behavioural tracking cookies. The PayPal payment SDK, loaded during checkout, may set its own cookies — these are governed by PayPal&apos;s privacy policy.</Bullet>
            </ul>
          </Section>

          {/* 6. Cookies */}
          <Section title="6. Cookies">
            <p>We use one strictly necessary cookie:</p>
            <ul className="flex flex-col gap-3 mt-3">
              <Bullet>
                <strong>Session cookie</strong> — an HttpOnly, Secure, SameSite=Lax JWT token that keeps you logged in for up to 30 days. It is set only when you sign in and is deleted when you log out. No advertising or analytics cookies are used by this site.
              </Bullet>
            </ul>
            <p className="mt-4">
              During checkout, the PayPal payment SDK is loaded and may set cookies under PayPal&apos;s own policy.
              You can disable cookies in your browser but this will prevent you from signing in to your account.
            </p>
          </Section>

          {/* 7. Third-Party Services */}
          <Section title="7. Third-Party Services">
            <p className="mb-4">We use the following services to operate the platform. Each acts as a data processor under our instruction:</p>
            <ul className="flex flex-col gap-3">
              <Bullet><strong>Supabase</strong> — member database (accounts, content, subscriptions) and file storage (downloadable PDFs). Hosted on AWS.</Bullet>
              <Bullet><strong>Cloudflare</strong> — site hosting, CDN, and commerce processing. All order records, payment confirmations, download tokens, and transaction data are stored in Cloudflare D1 (SQLite) and processed by a Cloudflare Worker.</Bullet>
              <Bullet><strong>Safaricom M-Pesa</strong> — M-Pesa payment processing. Safaricom processes payment data independently under its own privacy policy.</Bullet>
              <Bullet><strong>PayPal</strong> — international payment processing. PayPal receives customer name, email, and transaction value during PayPal checkout. PayPal processes this data under its own privacy policy.</Bullet>
              <Bullet><strong>Resend</strong> — transactional and marketing email delivery.</Bullet>
            </ul>
          </Section>

          {/* 8. Cross-Border Data Transfers */}
          <Section title="8. Cross-Border Data Transfers">
            <p>
              Personal data processed by Supabase (AWS), Cloudflare, PayPal, and Resend may be transferred to and stored outside Kenya. Such transfers are made under standard contractual clauses or equivalent safeguards consistent with <strong>DPA Section 48</strong>. We maintain Data Processing Agreements with each processor.
            </p>
          </Section>

          {/* 9. Data Retention */}
          <Section title="9. Data Retention">
            <ul className="flex flex-col gap-3">
              <Bullet>Account data is retained for as long as your account is active.</Bullet>
              <Bullet>Purchase and transaction records are kept for 7 years as required by Kenyan tax law.</Bullet>
              <Bullet>Marketing consent records are kept for the duration of the consent plus 3 years.</Bullet>
              <Bullet>You can request deletion of your account and non-transactional data at any time.</Bullet>
            </ul>
          </Section>

          {/* 10. Data Breach Notification */}
          <Section title="10. Data Breach Notification">
            <p>
              In the event of a personal data breach, we will notify the Office of the Data Protection Commissioner (ODPC) and affected data subjects as required under <strong>DPA Section 43</strong> and the Computer Misuse and Cybercrimes Act, 2018 — in the most expedient time possible and without unreasonable delay.
            </p>
          </Section>

          {/* 11. Your Rights */}
          <Section title="11. Your Rights">
            <p className="mb-4">Under the Kenya Data Protection Act, 2019, you have the following rights:</p>
            <ul className="flex flex-col gap-3">
              <Bullet><strong>Right to be informed</strong> — to know what data we hold and how we use it (this policy).</Bullet>
              <Bullet><strong>Right of access</strong> — to request a copy of your personal data. Email us.</Bullet>
              <Bullet><strong>Right to rectification</strong> — to correct inaccurate or incomplete personal data. Email us.</Bullet>
              <Bullet><strong>Right to erasure</strong> — to delete your account and non-transactional data. Email us.</Bullet>
              <Bullet><strong>Right to object</strong> — to object to processing based on legitimate interest. Email us.</Bullet>
              <Bullet><strong>Right to data portability</strong> — to receive your data in a structured, machine-readable format. Email us.</Bullet>
              <Bullet><strong>Right to withdraw consent</strong> — unsubscribe from marketing at any time via the link in any email, or by emailing us.</Bullet>
              <Bullet>
                <strong>Right to lodge a complaint</strong> — if you believe we have not handled your data lawfully, you may lodge a complaint with the{" "}
                <strong>Office of the Data Protection Commissioner (ODPC)</strong> at{" "}
                <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer" style={{ color: "#D4580A" }}>odpc.go.ke</a>.
              </Bullet>
            </ul>
          </Section>

          {/* 12. Governing Law */}
          <Section title="12. Governing Law">
            <p>
              This policy is governed by the <strong>Kenya Data Protection Act, 2019</strong>.
            </p>
          </Section>

          {/* 13. Contact */}
          <Section title="13. Contact">
            <p>
              For any data-related request or question, email{" "}
              <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>shop@dullugroup.co.ke</a>.
            </p>
          </Section>

          <div className="mt-10 pt-8 border-t" style={{ borderColor: "#F0EDE8" }}>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#AAAAAA" }}>
                Terms &amp; Conditions
              </Link>
              <Link href="/shop" className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#AAAAAA" }}>
                ← Back to The Shop
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
