import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Book a Call — DR.DULLU",
  description:
    "30-minute discovery call. We look at where your business leaks time and money, then map the automation that fixes it.",
  alternates: { canonical: "https://dullugroup.co.ke/office" },
};

const covers = [
  {
    n: "01",
    heading: "Where you are now",
    body: "Current tools, current pain. What's manual, what's broken, what's costing you the most hours.",
  },
  {
    n: "02",
    heading: "What a system could do",
    body: "A specific automation path — WhatsApp flows, M-Pesa reconciliation, AI pipelines — matched to your exact context.",
  },
  {
    n: "03",
    heading: "Realistic next step",
    body: "A playbook you can run yourself, or a full build through Dullu Digital. No pressure either way.",
  },
];

export default function OfficePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section
          style={{
            backgroundColor: "#111111",
            minHeight: "60vh",
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: "5rem",
            paddingTop: "10rem",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 w-full">
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em] mb-5"
              style={{ fontSize: "10px", color: "#D4580A" }}
            >
              Dullu Digital · Discovery
            </p>
            <h1
              className="font-sans font-black uppercase tracking-tight leading-[1.0] mb-6"
              style={{ fontSize: "clamp(3rem,8vw,8rem)", color: "#F8F5EB", maxWidth: "14ch" }}
            >
              30 Minutes. One Honest Conversation.
            </h1>
            <p
              className="font-sans font-light leading-relaxed"
              style={{ color: "rgba(248,245,235,0.60)", maxWidth: "42rem", fontSize: "1.05rem" }}
            >
              No pitch deck. No retainer locked in before we talk.
              We find the highest-leverage automation in your business and you leave with a clear plan — whether you build it yourself or we build it for you.
            </p>
          </div>
        </section>

        {/* What the call covers */}
        <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #F0EDE8" }}>
          <div className="max-w-6xl mx-auto px-6 py-20">
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em] mb-14"
              style={{ fontSize: "10px", color: "#1B3D8F" }}
            >
              What we cover
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {covers.map(({ n, heading, body }) => (
                <div key={n}>
                  <span
                    className="font-cinematic font-light block mb-4 leading-none"
                    style={{ fontSize: "4rem", color: "#F0EDE8" }}
                  >
                    {n}
                  </span>
                  <h3
                    className="font-sans font-black uppercase tracking-tight leading-tight mb-3"
                    style={{ fontSize: "1.2rem", color: "#111111" }}
                  >
                    {heading}
                  </h3>
                  <p className="font-sans font-light leading-relaxed" style={{ color: "#666666", fontSize: "0.95rem" }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section style={{ backgroundColor: "#FAFAF8", borderTop: "1px solid #F0EDE8" }}>
          <div className="max-w-6xl mx-auto px-6 py-20">
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em] mb-6"
              style={{ fontSize: "10px", color: "#D4580A" }}
            >
              Book the call
            </p>
            <h2
              className="font-sans font-black uppercase tracking-tight leading-[1.0] mb-4"
              style={{ fontSize: "clamp(2rem,5vw,5rem)", color: "#111111", maxWidth: "16ch" }}
            >
              Start with a message.
            </h2>
            <p
              className="font-sans font-light leading-relaxed mb-10"
              style={{ color: "#666666", maxWidth: "38rem", fontSize: "1rem" }}
            >
              Send a WhatsApp message or email with one sentence about your business and the biggest thing you want to automate. Response within 24 hours.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Update +254XXXXXXXXX to the actual business WhatsApp number */}
              <a
                href="https://wa.me/254700000000?text=Hi%20Ian%2C%20I%27d%20like%20to%20book%20a%20discovery%20call."
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-9 py-4 transition-all hover:brightness-110 inline-block"
                style={{ backgroundColor: "#25D366", color: "#FFFFFF" }}
              >
                WhatsApp →
              </a>
              <a
                href="mailto:office@dullugroup.co.ke?subject=Discovery%20Call%20Request"
                className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-9 py-4 border transition-all hover:bg-black hover:text-white inline-block"
                style={{ borderColor: "#111111", color: "#111111" }}
              >
                Email →
              </a>
            </div>

            <div className="mt-16 pt-10 border-t" style={{ borderColor: "#F0EDE8" }}>
              <p className="font-sans text-sm font-light mb-4" style={{ color: "#AAAAAA" }}>
                Want to start on your own first?
              </p>
              <Link
                href="/shop"
                className="font-sans font-semibold text-[11px] tracking-[0.2em] uppercase transition-colors hover:text-amber"
                style={{ color: "#D4580A" }}
              >
                Browse the playbook shop →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
