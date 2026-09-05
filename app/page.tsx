import Image from "next/image";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import SubscribeForm from "@/components/home/SubscribeForm";
import ManagedRunLink from "@/components/home/ManagedRunLink";
import ScrollTracker from "@/components/home/ScrollTracker";
import Arr from "@/components/Arr";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-sans font-bold uppercase tracking-[0.28em]"
      style={{ fontSize: "12px", color: "#D4580A", marginBottom: "1rem" }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-cinematic font-bold leading-[1.04] tracking-[-0.01em]"
      style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "#111111" }}
    >
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <HomeNav />
      <ScrollTracker />
      <main>
        {/* ───────────────────────── SECTION 1 · HERO ───────────────────────── */}
        <section id="top" className="scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 pt-10 pb-14 md:pt-14 md:pb-20">
            <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-10 md:gap-16 items-start">
              <div className="flex flex-col gap-5">
                <Eyebrow>Mombasa, Kenya</Eyebrow>

                <h1
                  className="font-cinematic font-bold leading-[1.02]"
                  style={{
                    fontSize: "clamp(2.75rem, 7vw, 5rem)",
                    color: "#111111",
                    maxWidth: "16ch",
                  }}
                >
                  I was student 156 out of 156.
                </h1>

                <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111", maxWidth: "62ch" }}>
                  I searched &quot;how to use a computer&quot; on YouTube. Four years later I run a
                  sales agency out of Mombasa. Self-funded. No VC. No safety net.
                </p>

                <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111", maxWidth: "62ch" }}>
                  I build the systems that stop East African firms losing clients to silence — and
                  I publish what it costs me to learn.
                </p>

                <div className="mt-1">
                  <SubscribeForm
                    source="hero"
                    id="hero"
                    microcopy="The Young African Founder. Weekly. Unsubscribe any time."
                  />
                  <div className="mt-4">
                    <a
                      href="https://digital.dullugroup.co.ke"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm font-medium inline-flex items-center min-h-[44px] transition-colors hover:text-amber"
                      style={{ color: "#111111", textDecoration: "underline", textUnderlineOffset: "4px" }}
                    >
                      I run this for firms <Arr /> The Managed Run
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:sticky md:top-24">
                <Image
                  src="/dr-wide.jpg"
                  alt="Ian Dullu, founder, Mombasa"
                  priority
                  fetchPriority="high"
                  quality={80}
                  width={1408}
                  height={768}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: 620,
                    aspectRatio: "4 / 5",
                    objectFit: "cover",
                    objectPosition: "50% 25%",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────── SECTION 2 · CREDIBILITY STRIP ──────────────────── */}
        <section style={{ borderTop: "1px solid #F0EDE8", borderBottom: "1px solid #F0EDE8", backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-6 py-5 overflow-x-auto">
            <p
              className="font-sans font-medium uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ fontSize: "11px", color: "#666666" }}
            >
              Founder, DDi by Dullu Group · 4 years in business at 19 · The Young African
              Founder, weekly · Bombolulu → Kizingo → Kilifi → Mombasa
            </p>
          </div>
        </section>

        {/* ───────────────────────── SECTION 3 · THE STORY ───────────────────────── */}
        <section id="story" className="scroll-mt-20" style={{ backgroundColor: "#F8F5EB" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-[11fr_9fr] gap-12 md:gap-20 items-start">
              <div className="flex flex-col gap-6" style={{ maxWidth: "65ch" }}>
                <Eyebrow>Start where you are</Eyebrow>
                <SectionHeading>I didn&apos;t know how to use a computer.</SectionHeading>
                <div className="flex flex-col gap-5 font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111" }}>
                  <p>
                    Overcrowded classroom. Student number 156 out of 156. No tech, no exposure, no
                    special circumstances.
                  </p>
                  <p>
                    A Talent Identification Program place at the Aga Khan Academy put me in a room
                    with a computer I did not know how to switch on. I searched for the instructions
                    on YouTube.
                  </p>
                  <p>
                    Then I taught myself e-commerce, branding and digital marketing. Not as a hobby.
                    My family needed the money and nobody was coming.
                  </p>
                  <p>
                    In high school I started upcycling kitenge off-cuts into bags. Then I started
                    DDi, selling outbound for professional firms. I have produced a fundraiser that
                    raised millions of shillings for school children, MC&apos;d the Festival of Hope
                    gala, and worked as a field agent for girl-child economic empowerment in Kilifi
                    County.
                  </p>
                  <p>
                    I am not a software engineer. I am a founder who understands where technology
                    actually applies to sales in African businesses — and I bring the right people
                    for the build.
                  </p>
                  <p>
                    I am 19. I am four years in. I am not finished.
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="/dr-seated.jpg"
                  alt="Ian Dullu"
                  width={902}
                  height={1600}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "3 / 4",
                    objectFit: "cover",
                    objectPosition: "50% 20%",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── SECTION 4 · RECEIPTS ───────────────────────── */}
        <section id="receipts" className="scroll-mt-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-20">
            <div className="flex flex-col gap-4 mb-14" style={{ maxWidth: "65ch" }}>
              <Eyebrow>Receipts</Eyebrow>
              <SectionHeading>Every system. Every cost. Every failure.</SectionHeading>
            </div>

            <div className="flex flex-col gap-0">
              {[
                {
                  n: "01",
                  head: <>I found a live buyer&apos;s reply by opening Gmail myself.</>,
                  body: "Our own system buried it for weeks. Silent filter, no alert, found by accident. It is now the first thing I check in any firm's pipeline — because everyone has it and nobody knows.",
                },
                {
                  n: "02",
                  head: <>I cut outreach from 400 sends a week to 20.</>,
                  body: "Volume felt productive and buried me in busywork while the real opportunities went quiet. The replies that mattered came from follow-up, not volume. Sales is a timing game.",
                },
                {
                  n: "03",
                  head: <>I sent a 10kg watermelon to a CEO&apos;s desk on Uber Eats.</>,
                  body: "To force a pipeline conversation. It worked. My apologies to the delivery rider — you did not sign up for that.",
                },
                {
                  n: "04",
                  head: <>I keep two lists: money that multiplied, and money I lost.</>,
                  body: "A domain that cost pennies and bought my first property. Sales Navigator at $1,080 a year. And family money I trusted without systems, lost to someone I loved. Generous in public, broke in private. I named it. You should too.",
                },
              ].map((item) => (
                <div
                  key={item.n}
                  className="grid grid-cols-[4rem_1fr] gap-6 py-9 md:py-10"
                  style={{ borderTop: "1px solid #F0EDE8" }}
                >
                  <span className="font-sans font-bold text-sm" style={{ color: "#D4580A" }}>
                    {item.n}
                  </span>
                  <div style={{ maxWidth: "65ch" }}>
                    <h3
                      className="font-sans font-bold mb-3"
                      style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)", color: "#111111" }}
                    >
                      {item.head}
                    </h3>
                    <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111" }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* midpage primary CTA */}
            <div
              className="mt-4 md:mt-6"
              style={{ maxWidth: "65ch", paddingTop: "2.5rem", borderTop: "1px solid #111111" }}
            >
              <h3
                className="font-sans font-bold mb-5"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", color: "#111111" }}
              >
                Every one of these went out in The Young African Founder first.
              </h3>
              <SubscribeForm source="midpage" id="mid" />
            </div>
          </div>
        </section>

        {/* ───────────────────────── SECTION 5 · THE WORK ───────────────────────── */}
        <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #F0EDE8" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-20">
            <Eyebrow>The Work</Eyebrow>

            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16">
              <div
                className="flex flex-col gap-5"
                style={{ padding: "2rem", borderTop: "4px solid #111111", backgroundColor: "#F8F5EB" }}
              >
                <p className="font-sans text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "#666666" }}>
                  01
                </p>
                <h3 className="font-cinematic font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", color: "#111111" }}>
                  DDi by Dullu Group
                </h3>
                <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111", maxWidth: "52ch" }}>
                  I run outbound for founder-led professional firms in East Africa. One offer, one
                  price, worked every week. This is the business.
                </p>
                <div className="mt-auto pt-2">
                  <ManagedRunLink
                    location="work"
                    label="The Managed Run — $231/mo →"
                    className="ghost-btn cursor-pointer font-sans font-bold text-sm inline-flex items-center"
                    style={{
                      padding: "0.95rem 1.6rem",
                      minHeight: 48,
                      border: "1px solid #111111",
                      color: "#111111",
                      background: "transparent",
                      textDecoration: "none",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-12">
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#666666" }}>
                    02
                  </p>
                  <h3 className="font-cinematic font-bold mb-2" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "#111111" }}>
                    The Young African Founder
                  </h3>
                  <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111", maxWidth: "44ch" }}>
                    A weekly letter for African founders building with what they have. Every system,
                    every cost, every failure — published while it is still uncomfortable.
                  </p>
                  <p className="font-sans text-sm mt-3" style={{ color: "#666666" }}>215 subscribers</p>
                </div>

                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] mb-3" style={{ color: "#666666" }}>
                    03
                  </p>
                  <h3 className="font-cinematic font-bold mb-2" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: "#111111" }}>
                    Built in Public
                  </h3>
                  <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111", maxWidth: "44ch" }}>
                    YouTube, Instagram, TikTok, LinkedIn. Same story, no gatekeeping.
                  </p>
                  <p className="font-sans text-sm mt-3" style={{ color: "#666666" }}>@dr.dullu</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────── SECTION 6 · QUALIFY OUT / QUALIFY IN ──────────────────── */}
        <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #F0EDE8" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-20">
            <div className="flex flex-col gap-5" style={{ maxWidth: "52ch" }}>
              <SectionHeading>If your pipeline runs on hope and a spreadsheet</SectionHeading>
              <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111" }}>
                I do not consult and leave. I build it, run it, and stay in it with you. The Managed
                Run: we work your book every week, you take the calls. $231 a month, cancel anytime.
                Built for founder-led professional firms in East Africa, 3–25 people.
              </p>
              <div className="mt-2">
                <ManagedRunLink
                  location="qualify"
                  label="See The Managed Run →"
                  className="ghost-btn cursor-pointer font-sans font-bold text-sm inline-flex items-center"
                  style={{
                    padding: "0.95rem 1.6rem",
                    minHeight: 48,
                    border: "1px solid #111111",
                    color: "#111111",
                    background: "transparent",
                    textDecoration: "none",
                  }}
                />
                <p className="font-sans text-sm mt-4" style={{ color: "#666666" }}>
                  Not there yet?{" "}
                  <a
                    href="#the-letter"
                    className="font-medium inline-flex items-center min-h-[44px] transition-colors"
                    style={{ color: "#1B3D8F", textDecoration: "underline", textUnderlineOffset: "4px" }}
                  >
                    Read the letter instead
                  </a>{" "}
                  — that is where I put everything I learn on the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── SECTION 7 · FINAL CTA ───────────────────────── */}
        <section id="the-letter" className="scroll-mt-20" style={{ backgroundColor: "#F8F5EB" }}>
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-20 text-center">
            <Eyebrow>The Young African Founder</Eyebrow>
            <h2
              className="font-cinematic font-bold mb-5 leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "#111111" }}
            >
              Written from the middle of it, not after.
            </h2>
            <p className="font-sans text-[1.0625rem] leading-[1.65] mb-8" style={{ color: "#111111" }}>
              The Young African Founder. Weekly. What I built, what it cost, what broke.
            </p>
            <div
              className="flex justify-center"
              style={{
                display: "flex",
                justifyContent: "center",
                maxWidth: "40rem",
                margin: "0 auto",
              }}
            >
              <SubscribeForm source="footer" id="final" microcopy="Unsubscribe any time." />
            </div>
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
}