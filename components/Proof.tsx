"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const proof = [
  {
    label: "01 — Agency",
    title: "DDi · Dullu Digital",
    body: "An automation-first digital agency running on a sub-$100/month stack. Brand architecture, authority sites, and lead systems for coaches, consultants, and African SMEs who need infrastructure — not just a website.",
    tag: "dulludigital.com",
  },
  {
    label: "02 — Platform",
    title: "4unter · Lead Intelligence",
    body: "A proprietary lead generation platform that scrapes, enriches, and AI-scores 500+ qualified prospects in 60 seconds. Built internally. Deployed for clients.",
    tag: "Proprietary tool",
  },
  {
    label: "03 — Content",
    title: "Built in Public",
    body: "Every system, every cost, every failure — documented and published across YouTube, Instagram, TikTok, and LinkedIn. Building from the Kenyan coast so others don't have to start from scratch.",
    tag: "@dr.dullu",
  },
  {
    label: "04 — Product",
    title: "The Operator Stack",
    body: "The three-component infrastructure originally built for DDi — Firm Presence, Authority Site, Lead Machine — now packaged and deployed for operators who are done looking like freelancers.",
    tag: "Live in 14 days",
  },
];

export default function Proof() {
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headRef.current, gridRef.current].filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add("visible"); },
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#F8F5EB", padding: "7rem 0" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>

        <p
          className="font-sans font-semibold uppercase tracking-[0.28em]"
          style={{ fontSize: "10px", color: "#1B3D8F", marginBottom: "1.25rem" }}
        >
          Proof of work
        </p>

        <div ref={headRef} className="reveal" style={{ marginBottom: "4.5rem" }}>
          <h2
            className="font-sans font-black uppercase tracking-tight leading-[1.0]"
            style={{ fontSize: "clamp(2.8rem,7vw,7rem)", color: "#111111", maxWidth: "16ch", marginBottom: "1.5rem" }}
          >
            Built, not studied.
          </h2>
          <p
            className="font-sans font-light leading-relaxed"
            style={{ color: "#555555", maxWidth: "46rem", fontSize: "1.05rem" }}
          >
            DR.DULLU is the alter ego Ian Dullu built when he decided that knowledge, audacity, and the commitment to
            excellence were credentials enough. From Kilifi, Kenya — not Nairobi, not Silicon Valley — he shipped an
            automation agency, a lead intelligence platform, and a personal brand documenting every step. No funding.
            No team. No shortcuts.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2.5rem 2rem",
          }}
        >
          {proof.map((p, i) => (
            <div
              key={p.label}
              style={{
                borderTop: "1px solid #D4580A",
                paddingTop: "1.5rem",
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              <p
                className="font-sans font-semibold uppercase tracking-[0.22em]"
                style={{ fontSize: "9px", color: "#D4580A", marginBottom: "0.9rem" }}
              >
                {p.label}
              </p>
              <h3
                className="font-sans font-black uppercase tracking-tight leading-tight"
                style={{ fontSize: "clamp(1.05rem,2vw,1.4rem)", color: "#111111", marginBottom: "0.75rem" }}
              >
                {p.title}
              </h3>
              <p
                className="font-sans font-light leading-relaxed"
                style={{ color: "#555555", fontSize: "0.93rem", marginBottom: "1.1rem" }}
              >
                {p.body}
              </p>
              <span
                className="font-sans font-medium uppercase tracking-[0.18em]"
                style={{
                  fontSize: "9px",
                  color: "#999999",
                  borderTop: "1px solid #E0DDD8",
                  paddingTop: "0.75rem",
                  display: "block",
                }}
              >
                {p.tag}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4.5rem" }}>
          <Link
            href="/office"
            className="font-sans font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 inline-block"
            style={{ backgroundColor: "#D4580A", color: "#FFFFFF", fontSize: "11px", padding: "1rem 2.25rem" }}
          >
            Work with Ian →
          </Link>
        </div>

      </div>
    </section>
  );
}
