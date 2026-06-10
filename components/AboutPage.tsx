"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Arr from "@/components/Arr";

const timeline = [
  {
    year: "2022",
    title: "Started building.",
    body: "Taught himself web development, DNS, APIs, and content strategy alongside a full IB curriculum. First freelance clients. First sites shipped.",
  },
  {
    year: "2023",
    title: "Kitenge Treasures + Hult IBS.",
    body: "Launched an eco-friendly consumer brand from scratch — supply chain, pricing, direct sales — generating 312,000 KES across 200+ transactions while still in school. That same year competed in the Hult IBS × Dolce & Gabbana global challenge and reached the semi-final against university-level teams.",
  },
  {
    year: "2024",
    title: "Production Manager. 72 people. 1.03M KES.",
    body: "Led every department of Aga Khan Academy's flagship annual theatre production — marketing, finance, logistics, partnerships. The production raised over one million Kenya shillings for community charity. Simultaneously appointed Resident Captain, responsible for welfare and culture across 100+ boarding students.",
  },
  {
    year: "2025",
    title: "Shipped DDi and 4unter.",
    body: "Built Dullu Digital — an automation agency running on under $100/month in tools. Built 4unter, a proprietary lead intelligence platform that scrapes, enriches, and AI-scores 500+ qualified prospects per search. Both live. Both generating.",
  },
  {
    year: "2026",
    title: "IB Diploma. Coaching systems. Going global.",
    body: "Graduated from Aga Khan Academy with the IB Diploma in May 2026. Now building full coaching system infrastructure for high-ticket coaches and consultants in the UK and US — the backend that lets a $500k coaching business run without an ops team.",
  },
];

const clients = [
  {
    name: "Pride of Africa-Diaspora Awards",
    url: "https://prideofafricaawards.org",
    what: "Full awards platform & website",
    body: "A diaspora recognition initiative celebrating African excellence globally. Ian built and shipped their complete digital platform — the public-facing awards site, nominations infrastructure, and brand presence.",
    tag: "prideofafricaawards.org",
    year: "2026",
  },
];

const ventures = [
  {
    name: "Dullu Digital (DDi)",
    period: "2025 – Present",
    body: "Automation-first digital agency. Coaching system builds, brand infrastructure, and lead systems for coaches, consultants, and operators.",
    tag: "digital.dullugroup.co.ke",
  },
  {
    name: "4unter · Lead Intelligence",
    period: "2025 – Present",
    body: "Proprietary platform that finds, enriches, and AI-scores 500+ qualified leads per search. Built internally. Deployed for clients.",
    tag: "4unter.dullugroup.co.ke",
  },
  {
    name: "Kitenge Treasures",
    period: "2023 – Present",
    body: "Eco-friendly consumer brand started in school. 312,000 KES revenue. 200+ transactions. Supply chain, pricing, and sales built from zero.",
    tag: "Bootstrapped",
  },
  {
    name: "START Afrika Network",
    period: "2024 – Present",
    body: "Free networking and resource-sharing platform for young African entrepreneurs. Independently designed, built, and managed.",
    tag: "Community platform",
  },
];

const skills = [
  { label: "Coaching Systems", items: ["End-to-end journey automation", "Kajabi + multi-platform integration", "Client portal builds", "Make.com / Zapier"] },
  { label: "Marketing & Sales", items: ["Lead generation", "SEO", "Sales pipelines", "Brand positioning", "Cold outreach"] },
  { label: "Build", items: ["Next.js", "Web development", "API integrations", "Supabase", "Cloudflare"] },
  { label: "Business", items: ["Team management", "Client negotiation", "Financial planning", "Public speaking"] },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* HERO — full screen photo */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/dr-landscape.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 2rem 5rem",
          }}
        >
          <p
            className="font-sans font-semibold uppercase tracking-[0.28em]"
            style={{ fontSize: "10px", color: "#D4580A", marginBottom: "1.25rem" }}
          >
            About
          </p>
          <h1
            className="font-sans font-black uppercase tracking-tight leading-[1.0]"
            style={{ fontSize: "clamp(3rem,8vw,9rem)", color: "#F8F5EB", marginBottom: "1.5rem" }}
          >
            Ian Dullu Jillo.
          </h1>
          <p
            className="font-sans font-light leading-relaxed"
            style={{ color: "rgba(248,245,235,0.80)", maxWidth: "46rem", fontSize: "1.1rem" }}
          >
            Built an agency, a lead intelligence tool, a consumer brand, and a community platform —
            all before finishing school.
          </p>
        </div>
      </section>

      {/* ORIGIN */}
      <section style={{ backgroundColor: "#111111", padding: "7rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em]"
              style={{ fontSize: "10px", color: "#D4580A", marginBottom: "1.25rem" }}
            >
              The origin
            </p>
            <p
              className="font-sans font-light leading-relaxed"
              style={{ color: "rgba(248,245,235,0.85)", maxWidth: "54rem", fontSize: "clamp(1.1rem,2vw,1.35rem)", marginBottom: "1.5rem" }}
            >
              Ian graduated from Aga Khan Academy Mombasa in May 2026 with an IB Diploma — Economics,
              Global Politics, Computer Science. But the real education happened outside the classroom.
            </p>
            <p
              className="font-sans font-light leading-relaxed"
              style={{ color: "rgba(248,245,235,0.65)", maxWidth: "54rem", fontSize: "clamp(1rem,1.8vw,1.15rem)" }}
            >
              While his peers were studying, he was also managing 72-person teams, closing commercial
              sponsorships, shipping consumer products, and building automated business systems from
              his room in Kilifi. The DR.DULLU brand documents every step — every system, every cost,
              every failure — so the next generation of African founders doesn&apos;t have to start from zero.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "7rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em]"
              style={{ fontSize: "10px", color: "#1B3D8F", marginBottom: "1.25rem" }}
            >
              Timeline
            </p>
            <h2
              className="font-sans font-black uppercase tracking-tight leading-[1.0]"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5.5rem)", color: "#D4580A", maxWidth: "16ch", marginBottom: "5rem" }}
            >
              Four years. Built in public.
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: "0 3rem",
                    borderTop: "1px solid #F0EDE8",
                    padding: "2.5rem 0",
                  }}
                >
                  <div>
                    <span
                      className="font-cinematic font-light"
                      style={{ fontSize: "clamp(1.6rem,3vw,2.5rem)", color: "#D4580A", lineHeight: 1 }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-sans font-black uppercase tracking-tight"
                      style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)", color: "#111111", marginBottom: "0.75rem" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-sans font-light leading-relaxed"
                      style={{ color: "#555555", maxWidth: "42rem", fontSize: "0.95rem" }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section style={{ backgroundColor: "#F8F5EB", padding: "7rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em]"
              style={{ fontSize: "10px", color: "#1B3D8F", marginBottom: "1.25rem" }}
            >
              Client Work
            </p>
            <h2
              className="font-sans font-black uppercase tracking-tight leading-[1.0]"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5.5rem)", color: "#111111", maxWidth: "16ch", marginBottom: "4rem" }}
            >
              Real projects. Real clients.
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {clients.map((client, i) => (
              <Reveal key={client.name} delay={i * 0.06}>
                <div
                  style={{
                    borderTop: "1px solid #E0DDD8",
                    padding: "3rem 0",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "2rem",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                      <h3
                        className="font-sans font-black uppercase tracking-tight"
                        style={{ fontSize: "clamp(1.1rem,2.2vw,1.6rem)", color: "#111111" }}
                      >
                        {client.name}
                      </h3>
                      <span
                        className="font-sans font-semibold uppercase tracking-[0.18em]"
                        style={{ fontSize: "9px", color: "#D4580A" }}
                      >
                        {client.what}
                      </span>
                    </div>
                    <p
                      className="font-sans font-light leading-relaxed"
                      style={{ color: "#555555", maxWidth: "44rem", fontSize: "0.95rem", marginBottom: "1.25rem" }}
                    >
                      {client.body}
                    </p>
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
                      style={{ fontSize: "9px", color: "#999999" }}
                    >
                      {client.tag} ↗
                    </a>
                  </div>
                  <span
                    className="font-cinematic font-light"
                    style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#E0DDD8", lineHeight: 1, whiteSpace: "nowrap" }}
                  >
                    {client.year}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VENTURES */}
      <section style={{ backgroundColor: "#F8F5EB", padding: "7rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em]"
              style={{ fontSize: "10px", color: "#1B3D8F", marginBottom: "1.25rem" }}
            >
              Ventures
            </p>
            <h2
              className="font-sans font-black uppercase tracking-tight leading-[1.0]"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5.5rem)", color: "#111111", maxWidth: "14ch", marginBottom: "4rem" }}
            >
              Things built. Not planned.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
            }}
          >
            {ventures.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.06}>
                <div style={{ borderTop: "2px solid #D4580A", paddingTop: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                    <h3
                      className="font-sans font-black uppercase tracking-tight"
                      style={{ fontSize: "1rem", color: "#111111" }}
                    >
                      {v.name}
                    </h3>
                    <span
                      className="font-sans font-light"
                      style={{ fontSize: "0.75rem", color: "#999999", whiteSpace: "nowrap", marginLeft: "1rem" }}
                    >
                      {v.period}
                    </span>
                  </div>
                  <p
                    className="font-sans font-light leading-relaxed"
                    style={{ color: "#555555", fontSize: "0.9rem", marginBottom: "1rem" }}
                  >
                    {v.body}
                  </p>
                  <span
                    className="font-sans font-medium uppercase tracking-[0.18em]"
                    style={{ fontSize: "9px", color: "#999999", borderTop: "1px solid #E0DDD8", paddingTop: "0.75rem", display: "block" }}
                  >
                    {v.tag}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "7rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em]"
              style={{ fontSize: "10px", color: "#1B3D8F", marginBottom: "1.25rem" }}
            >
              Skills
            </p>
            <h2
              className="font-sans font-black uppercase tracking-tight leading-[1.0]"
              style={{ fontSize: "clamp(2.4rem,5.5vw,5.5rem)", color: "#D4580A", maxWidth: "14ch", marginBottom: "4rem" }}
            >
              What gets shipped.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2.5rem 3rem",
            }}
          >
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.05}>
                <div>
                  <p
                    className="font-sans font-semibold uppercase tracking-[0.2em]"
                    style={{ fontSize: "9px", color: "#D4580A", marginBottom: "1rem" }}
                  >
                    {group.label}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="font-sans font-light"
                        style={{ fontSize: "0.9rem", color: "#333333", paddingBottom: "0.4rem", borderBottom: "1px solid #F0EDE8", marginBottom: "0.4rem" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION + LEADERSHIP */}
      <section style={{ backgroundColor: "#111111", padding: "7rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <p
              className="font-sans font-semibold uppercase tracking-[0.28em]"
              style={{ fontSize: "10px", color: "#D4580A", marginBottom: "1.25rem" }}
            >
              Education & Leadership
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem 5rem", marginTop: "1rem" }}>
            <Reveal>
              <div>
                <h3
                  className="font-sans font-black uppercase tracking-tight"
                  style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", color: "#F8F5EB", marginBottom: "0.5rem" }}
                >
                  Aga Khan Academy, Mombasa
                </h3>
                <p className="font-sans font-light" style={{ color: "#D4580A", fontSize: "0.9rem", marginBottom: "1rem", fontStyle: "italic" }}>
                  IB Diploma Programme — Graduated May 2026
                </p>
                <p className="font-sans font-light leading-relaxed" style={{ color: "rgba(248,245,235,0.65)", fontSize: "0.9rem" }}>
                  Economics HL · Global Politics HL · Computer Science SL<br />
                  English Literature HL · Math AA SL · Swahili A SL
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <h3
                  className="font-sans font-black uppercase tracking-tight"
                  style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", color: "#F8F5EB", marginBottom: "1.5rem" }}
                >
                  Leadership
                </h3>
                <div style={{ marginBottom: "1.25rem" }}>
                  <p className="font-sans font-semibold" style={{ color: "#F8F5EB", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                    Resident Captain — Aga Khan Academy (2024–2026)
                  </p>
                  <p className="font-sans font-light leading-relaxed" style={{ color: "rgba(248,245,235,0.60)", fontSize: "0.85rem" }}>
                    Selected by school leadership. Responsible for welfare and culture across 100+ boarding students.
                  </p>
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <p className="font-sans font-semibold" style={{ color: "#F8F5EB", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                    Programme Lead — IB Festival of Hope Africa
                  </p>
                  <p className="font-sans font-light leading-relaxed" style={{ color: "rgba(248,245,235,0.60)", fontSize: "0.85rem" }}>
                    Co-led Kenya&apos;s team for a regional IB community impact initiative across multiple schools.
                  </p>
                </div>
                <div>
                  <p className="font-sans font-semibold" style={{ color: "#F8F5EB", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                    International Exchange — Hyderabad, India (2023)
                  </p>
                  <p className="font-sans font-light leading-relaxed" style={{ color: "rgba(248,245,235,0.60)", fontSize: "0.85rem" }}>
                    Competitively selected to represent AKA Mombasa. Cross-cultural business presentations and collaborative projects.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#D4580A", padding: "7rem 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 2rem" }}>
          <Reveal>
            <h2
              className="font-sans font-black uppercase tracking-tight leading-[1.0]"
              style={{ fontSize: "clamp(2.4rem,6vw,6rem)", color: "#FFFFFF", maxWidth: "16ch", marginBottom: "2.5rem" }}
            >
              Let&apos;s build something.
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <Link
                href="/office"
                className="font-sans font-bold uppercase tracking-[0.2em] transition-all inline-block"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#D4580A",
                  fontSize: "11px",
                  padding: "1rem 2.25rem",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#111111"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF"; (e.currentTarget as HTMLElement).style.color = "#D4580A"; }}
              >
                Book a Call <Arr />
              </Link>
              <a
                href="https://ke.linkedin.com/in/drdullu"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-medium uppercase tracking-[0.15em]"
                style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px" }}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://instagram.com/dr.dullu_"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-medium uppercase tracking-[0.15em]"
                style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px" }}
              >
                Instagram ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
