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

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-6 py-16">

          <div className="mb-14">
            <p
              className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5"
              style={{ color: "#1B3D8F" }}
            >
              DR.DULLU
            </p>
            <h1
              className="font-sans font-black text-5xl md:text-6xl uppercase tracking-tight mb-4"
              style={{ color: "#D4580A" }}
            >
              Privacy Policy
            </h1>
            <p className="font-sans font-light text-base" style={{ color: "#888888" }}>
              Last updated: 7 June 2026
            </p>
          </div>

          <div
            className="mb-14 p-6"
            style={{ backgroundColor: "#FAFAF8", borderLeft: "3px solid #D4580A" }}
          >
            <p className="font-sans font-light text-sm leading-relaxed" style={{ color: "#555555" }}>
              We keep this simple. We collect only what we need, we don&apos;t sell it,
              and you can remove yourself at any time.
            </p>
          </div>

          <Section title="1. Who Is Responsible">
            <p>
              DR.DULLU / Dullu Digital, Kilifi, Kenya.
              Contact: <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>shop@dullugroup.co.ke</a>
            </p>
          </Section>

          <Section title="2. What We Collect">
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Email address</strong> — when you register, download a free product, or make a purchase.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Phone number</strong> — optionally, for WhatsApp updates. Never required.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Payment data</strong> — M-Pesa transactions are processed by Safaricom. We store only the transaction ID and confirmation status, not your M-Pesa PIN or full account details.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Download history</strong> — which products you have accessed, stored in your account dashboard.</span>
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use It">
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>To deliver your purchases and free downloads.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>To send you a weekly digest of new products and content (opt-out any time).</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>To maintain your personal dashboard of downloads.</span>
              </li>
            </ul>
          </Section>

          <Section title="4. What We Don't Do">
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>We do not sell your data to anyone.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>We do not share your email with third-party advertisers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>We do not use tracking pixels or behavioural advertising.</span>
              </li>
            </ul>
          </Section>

          <Section title="5. Third-Party Services">
            <p>We use the following services to operate the shop:</p>
            <ul className="flex flex-col gap-3 mt-3">
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Supabase</strong> — database and authentication.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Cloudflare</strong> — site hosting and CDN.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Safaricom M-Pesa</strong> — payment processing.</span>
              </li>
            </ul>
            <p className="mt-3">Each operates under its own privacy policy.</p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              Your account data is retained for as long as your account is active.
              Purchase records are kept for 7 years as required by Kenyan tax law.
              You can request deletion of your account and non-transactional data at any time.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Unsubscribe</strong> — every email has an unsubscribe link. Click it and you are off the list immediately.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Access</strong> — email us to request a copy of your data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span><strong>Deletion</strong> — email us to delete your account and non-transactional data.</span>
              </li>
            </ul>
          </Section>

          <Section title="8. Governing Law">
            <p>
              This policy is governed by the <strong>Kenya Data Protection Act, 2019</strong>.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>
                shop@dullugroup.co.ke
              </a>
            </p>
          </Section>

          <div className="mt-10 pt-8 border-t" style={{ borderColor: "#F0EDE8" }}>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#AAAAAA" }}
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/shop"
                className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: "#AAAAAA" }}
              >
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
