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

export default function TermsPage() {
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
              Terms &amp; Conditions
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
              By purchasing or downloading any product from the DR.DULLU shop at{" "}
              <strong>dullugroup.co.ke/shop</strong>, you agree to these terms in full.
              Read them. They are short.
            </p>
          </div>

          <Section title="1. Who We Are">
            <p>
              DR.DULLU is the trading brand of <strong>Dullu Digital</strong>, a digital products and
              automation services business registered in Kenya. Our products are sold through the
              DR.DULLU shop at dullugroup.co.ke.
            </p>
            <p className="mt-3">
              Contact: <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>shop@dullugroup.co.ke</a>
            </p>
          </Section>

          <Section title="2. Digital Products">
            <p>
              All products sold in the DR.DULLU shop are <strong>digital goods</strong> — PDFs,
              playbooks, templates, and similar files. There are no physical deliveries.
              Upon successful payment or free download registration, you will receive access to
              your files immediately or within a short processing window.
            </p>
          </Section>

          <Section title="3. Payment">
            <ul className="flex flex-col gap-2 mt-2">
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>Paid products are priced in <strong>Kenya Shillings (KES)</strong> and processed via <strong>M-Pesa STK Push</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>USD prices shown are indicative only. Billing is in KES.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>Free products require no payment. Signing up with your email or using your dashboard constitutes acceptance of these terms.</span>
              </li>
            </ul>
          </Section>

          <Section title="4. Refund Policy">
            <p>
              Due to the nature of digital goods, <strong>all sales are final</strong>.
              We do not offer refunds once a file has been delivered or download access has been granted.
            </p>
            <p className="mt-3">
              If you experienced a technical failure and did not receive your file, contact us within
              48 hours at <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>shop@dullugroup.co.ke</a> and
              we will resend it.
            </p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>
              All content — including playbooks, templates, guides, and associated materials — is
              owned by DR.DULLU / Dullu Digital. Purchase grants you a <strong>personal,
              non-transferable licence</strong> to use the material for your own business.
            </p>
            <ul className="flex flex-col gap-2 mt-3">
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>You may not resell, redistribute, or republish any product in whole or in part.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>You may not share your download link with others.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: "#D4580A", flexShrink: 0 }}>—</span>
                <span>Bulk or team licensing is available — email us to discuss.</span>
              </li>
            </ul>
          </Section>

          <Section title="6. Use of Your Email">
            <p>
              When you download a free product or make a purchase, your email may be added to the
              DR.DULLU mailing list. You will receive product updates and relevant content.
              You can unsubscribe at any time via the link in any email.
            </p>
            <p className="mt-3">
              We do not sell or share your email with third parties. See our{" "}
              <Link href="/privacy" style={{ color: "#D4580A" }}>Privacy Policy</Link> for full details.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              Our products are educational materials. Results depend entirely on your own effort
              and business context. DR.DULLU makes no guarantee of specific financial outcomes.
              To the maximum extent permitted by Kenyan law, our liability for any claim arising
              from a purchase is limited to the amount you paid for that product.
            </p>
          </Section>

          <Section title="8. Governing Law">
            <p>
              These terms are governed by the laws of <strong>Kenya</strong>. Any disputes shall
              first be resolved by direct negotiation; if unresolved, they fall under the
              jurisdiction of Kenyan courts.
            </p>
          </Section>

          <Section title="9. Changes to These Terms">
            <p>
              We may update these terms from time to time. The date at the top of this page shows
              when they were last revised. Continued use of the shop after an update constitutes
              acceptance of the revised terms.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              Questions? Email{" "}
              <a href="mailto:shop@dullugroup.co.ke" style={{ color: "#D4580A" }}>
                shop@dullugroup.co.ke
              </a>
            </p>
          </Section>

          <div className="mt-10 pt-8 border-t" style={{ borderColor: "#F0EDE8" }}>
            <Link
              href="/shop"
              className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#AAAAAA" }}
            >
              ← Back to The Shop
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
