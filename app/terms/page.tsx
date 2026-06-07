import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — DR.DULLU",
  description: "Terms and conditions for purchasing digital products from the DR.DULLU shop.",
  alternates: { canonical: "https://dullugroup.co.ke/terms" },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: "#1B3D8F" }}>
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

export default function TermsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="font-sans font-light text-base" style={{ color: "#888888" }}>
              Last updated: 7 June 2026
            </p>
          </div>

          <div className="mb-14 p-6" style={{ backgroundColor: "#FAFAF8", borderLeft: "3px solid #D4580A" }}>
            <p className="font-sans font-light text-sm leading-relaxed" style={{ color: "#555555" }}>
              By purchasing or downloading any product from the DR.DULLU shop at{" "}
              <strong>dullugroup.co.ke/shop</strong>, you agree to these terms in full. Read them. They are short.
            </p>
          </div>

          {/* 1. Who We Are */}
          <Section title="1. Who We Are">
            <p>
              <strong>DR.DULLU</strong> is the trading brand of <strong>Dullu Digital</strong>, a digital products
              and automation services business registered in Kenya (KRA PIN: <em>to be added</em>).
            </p>
            <p className="mt-3">
              <strong>Registered address:</strong> Kilifi, Kenya<br />
              <strong>Contact:</strong>{" "}
              <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>shop@dullugroup.co.ke</a>
            </p>
          </Section>

          {/* 2. Eligibility */}
          <Section title="2. Eligibility">
            <p>
              You must be at least <strong>18 years of age</strong> to purchase or register on this platform.
              If you are under 18, you may only use the platform with the consent and supervision of a parent
              or legal guardian who agrees to be bound by these terms on your behalf.
            </p>
          </Section>

          {/* 3. Digital Products */}
          <Section title="3. Digital Products">
            <p>
              All products sold in the DR.DULLU shop are <strong>digital goods</strong> — PDFs, playbooks,
              templates, and similar files. There are no physical deliveries. Upon successful payment or
              free download registration, you will receive a time-limited, tokenised download link delivered
              to your email address immediately or within a short processing window.
            </p>
          </Section>

          {/* 4. Payment */}
          <Section title="4. Payment">
            <ul className="flex flex-col gap-2 mt-2">
              <Bullet>Paid products are priced in <strong>Kenya Shillings (KES)</strong> and processed via <strong>M-Pesa STK Push</strong> (Kenya) or <strong>PayPal</strong> (international).</Bullet>
              <Bullet>USD prices shown are indicative only. M-Pesa billing is in KES. PayPal billing is in USD at the displayed rate.</Bullet>
              <Bullet>All prices are <strong>inclusive of any applicable taxes</strong>. Dullu Digital is not currently registered for VAT; prices do not include VAT charges.</Bullet>
              <Bullet>Free products require no payment. Registering or downloading constitutes acceptance of these terms.</Bullet>
            </ul>
          </Section>

          {/* 5. Refund Policy */}
          <Section title="5. Refund Policy">
            <p>
              Due to the nature of digital goods, <strong>all sales are final</strong> once a download token
              has been issued or access has been granted. Before purchasing, you have the opportunity to review
              the full product description, feature list, and contents on the product page.
            </p>
            <p className="mt-3">
              If the product you received materially differs from its published description, contact us within
              48 hours at{" "}
              <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>shop@dullugroup.co.ke</a>{" "}
              and we will issue a replacement or store credit at our discretion.
            </p>
            <p className="mt-3">
              If you experienced a technical failure and did not receive your file, contact us within 48 hours
              and we will resend it.
            </p>
          </Section>

          {/* 6. Intellectual Property */}
          <Section title="6. Intellectual Property">
            <p>
              All content — including playbooks, templates, guides, and associated materials — is owned by
              DR.DULLU / Dullu Digital and is protected under the <strong>Kenya Copyright Act, Cap 130</strong>.
              Copyright vests entirely in Dullu Digital. Purchase grants you a{" "}
              <strong>personal, non-exclusive, non-transferable licence</strong> to use the material for your
              own business purposes only.
            </p>
            <ul className="flex flex-col gap-2 mt-3">
              <Bullet>You may not resell, redistribute, or republish any product in whole or in part.</Bullet>
              <Bullet>You may not share your download link with others. Links are tokenised and access-limited.</Bullet>
              <Bullet>Bulk or team licensing is available — email us to discuss.</Bullet>
            </ul>
          </Section>

          {/* 7. Marketing Communications */}
          <Section title="7. Marketing Communications">
            <p>
              If you have opted in during registration or checkout, your email may be added to the DR.DULLU
              weekly digest. You can unsubscribe at any time via the link in any email or by emailing us.
            </p>
            <p className="mt-3">
              If you have provided your phone number and consented during onboarding, you may receive
              WhatsApp notifications about new content and events. You can opt out at any time by replying
              STOP or emailing us.
            </p>
            <p className="mt-3">
              We do not sell or share your contact details with third parties.
              See our <Link href="/privacy" style={{ color: "#D4580A" }}>Privacy Policy</Link> for full details.
            </p>
          </Section>

          {/* 8. Limitation of Liability */}
          <Section title="8. Limitation of Liability">
            <p>
              Our products are educational materials provided &quot;as is&quot;. DR.DULLU makes no warranty
              that the content is free from error or that any strategy described will produce specific results
              in your particular business context. Results depend entirely on your own effort, circumstances,
              and implementation.
            </p>
            <p className="mt-3">
              To the maximum extent permitted by Kenyan law, our total liability for any claim arising from
              a purchase is limited to the amount you paid for that specific product.
            </p>
          </Section>

          {/* 9. Governing Law */}
          <Section title="9. Governing Law">
            <p>
              These terms are governed by the laws of <strong>Kenya</strong>. Any disputes shall first be
              resolved by direct negotiation. If unresolved, disputes under KES 500,000 fall under the
              jurisdiction of the Resident Magistrate&apos;s Court; disputes above that amount fall under
              the High Court of Kenya.
            </p>
          </Section>

          {/* 10. Changes to These Terms */}
          <Section title="10. Changes to These Terms">
            <p>
              We may update these terms from time to time. The date at the top of this page shows when they
              were last revised. Continued use of the shop after an update constitutes acceptance of the
              revised terms.
            </p>
          </Section>

          {/* 11. Contact */}
          <Section title="11. Contact">
            <p>
              Questions? Email{" "}
              <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>shop@dullugroup.co.ke</a>
            </p>
          </Section>

          <div className="mt-10 pt-8 border-t" style={{ borderColor: "#F0EDE8" }}>
            <Link href="/shop" className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#AAAAAA" }}>
              ← Back to The Shop
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
