import Image from "next/image";
import HomeNav from "@/components/home/HomeNav";
import HomeFooter from "@/components/home/HomeFooter";
import SubscribeForm from "@/components/home/SubscribeForm";
import ManagedRunLink from "@/components/home/ManagedRunLink";
import ScrollTracker from "@/components/home/ScrollTracker";
import Reveal from "@/components/home/Reveal";
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

function TickerWord({ children }: { children: React.ReactNode }) {
  return <span className="px-6">{children}</span>;
}

function TickerDot() {
  return (
    <span
      aria-hidden
      className="w-1.5 h-1.5 rounded-full shrink-0"
      style={{ backgroundColor: "#D4580A" }}
    />
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
                <Reveal>
                  <p
                    className="font-cinematic font-bold tracking-[0.2em] uppercase"
                    style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)", color: "#D4580A" }}
                  >
                    DR.DULLU
                  </p>
                </Reveal>
                <Reveal delay={60}>
                  <Eyebrow>Ian Dullu · Founder — Mombasa, Kenya</Eyebrow>
                </Reveal>

                <Reveal delay={120}>
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
                </Reveal>

                <Reveal delay={200}>
                  <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111", maxWidth: "62ch" }}>
                    I searched &quot;how to use a computer&quot; on YouTube. Four years later I run a
                    sales agency out of Mombasa. Self-funded. No VC. No safety net.
                  </p>
                </Reveal>

                <Reveal delay={260}>
                  <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111", maxWidth: "62ch" }}>
                    I build the systems that stop East African firms losing clients to silence — and
                    I publish what it costs me to learn.
                  </p>
                </Reveal>

                <Reveal delay={340}>
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
                        title="The only link that leaves this page. FOMO is free."
                        className="font-sans text-sm font-medium inline-flex items-center min-h-[44px] transition-colors hover:text-amber"
                        style={{ color: "#111111", textDecoration: "underline", textUnderlineOffset: "4px" }}
                      >
                        I run this for firms <Arr /> The Managed Run
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={180} className="md:sticky md:top-24">
                <div
                  className="relative overflow-hidden"
                  style={{ maxWidth: 620, aspectRatio: "4 / 5" }}
                >
                  <Image
                    src="/dr-wide.jpg"
                    alt="Ian Dullu, founder, Mombasa"
                    priority
                    fetchPriority="high"
                    quality={80}
                    width={1408}
                    height={768}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="img-zoom"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "50% 25%",
                      display: "block",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(17,17,17,0.72) 0%, rgba(17,17,17,0.05) 45%, transparent 100%)",
                    }}
                  />
                  <div aria-hidden className="absolute left-4 bottom-4 pointer-events-none select-none">
                    <span
                      className="font-cinematic font-bold tracking-[0.16em] uppercase"
                      style={{ color: "#F8F5EB", fontSize: "1.35rem" }}
                    >
                      DR.DULLU
                    </span>
                    <span
                      className="font-sans block uppercase tracking-[0.26em]"
                      style={{ color: "rgba(248,245,235,0.6)", fontSize: "0.55rem", marginTop: "0.35rem" }}
                    >
                      Knowledge. Audacity. Empire.
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ──────────────────── SECTION 2 · BRAND TICKER ──────────────────── */}
        <section
          className="ticker-wrap"
          style={{
            borderTop: "1px solid #111111",
            borderBottom: "1px solid #111111",
            backgroundColor: "#111111",
            overflow: "hidden",
          }}
        >
          <div className="ticker-track" style={{ padding: "0.95rem 0" }}>
            {[0, 1].map((half) => (
              <span
                key={half}
                aria-hidden={half === 1}
                className="flex shrink-0 items-center font-sans text-[11px] font-medium uppercase tracking-[0.2em] whitespace-nowrap"
                style={{ color: "#F8F5EB" }}
              >
                <TickerWord>DR.DULLU</TickerWord>
                <TickerDot />
                <TickerWord>The Young African Founder</TickerWord>
                <TickerDot />
                <TickerWord>4 years in business at 19</TickerWord>
                <TickerDot />
                <TickerWord>Bombolulu → Kizingo → Kilifi → Mombasa</TickerWord>
                <TickerDot />
                <TickerWord>Knowledge. Audacity. Empire.</TickerWord>
                <TickerDot />
                <TickerWord>Every system · every cost · every failure</TickerWord>
                <TickerDot />
                <TickerWord>Self-funded. No VC. No safety net.</TickerWord>
                <TickerDot />
              </span>
            ))}
          </div>
        </section>

        {/* ───────────────────────── SECTION 3 · THE STORY ───────────────────────── */}
        <section id="story" className="scroll-mt-20" style={{ backgroundColor: "#F8F5EB" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-[11fr_9fr] gap-12 md:gap-20 items-start">
              <div className="flex flex-col gap-6" style={{ maxWidth: "65ch" }}>
                <Reveal>
                  <Eyebrow>Start where you are</Eyebrow>
                  <SectionHeading>I didn&apos;t know how to use a computer.</SectionHeading>
                </Reveal>
                <Reveal delay={80}>
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
                </Reveal>
              </div>
              <Reveal delay={140}>
                <div className="relative overflow-hidden">
                  <Image
                    src="/dr-seated.jpg"
                    alt="Ian Dullu"
                    width={902}
                    height={1600}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="img-zoom"
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
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────── SECTION 4 · RECEIPTS ───────────────────────── */}
        <section id="receipts" className="scroll-mt-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-20">
            <Reveal>
              <div className="flex flex-col gap-4 mb-10" style={{ maxWidth: "65ch" }}>
                <Eyebrow>Receipts</Eyebrow>
                <SectionHeading>Every system. Every cost. Every failure.</SectionHeading>
              </div>
            </Reveal>

            <Reveal className="relative overflow-hidden mb-10" style={{ height: "clamp(300px, 48vh, 540px)" }}>
              <Image
                src="/dr-landscape.jpg"
                alt="Ian Dullu, Kilifi coast"
                fill
                sizes="100vw"
                priority={false}
                className="img-zoom"
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
              />
            </Reveal>

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
              ].map((item, i) => (
                <Reveal key={item.n} delay={i * 70}>
                  <div
                    className="receipt-row grid grid-cols-[4rem_1fr] gap-6 py-9 md:py-10"
                    style={{ borderTop: "1px solid #F0EDE8" }}
                  >
                    <span className="receipt-num font-sans font-bold text-sm" style={{ color: "#D4580A" }}>
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
                </Reveal>
              ))}
            </div>

            {/* midpage primary CTA */}
            <Reveal delay={120}>
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
            </Reveal>
          </div>
        </section>

        {/* ───────────────────────── SECTION 5 · THE WORK ───────────────────────── */}
        <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #F0EDE8" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-20">
            <Reveal>
              <Eyebrow>The Work</Eyebrow>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16">
              <Reveal className="md:self-start">
              <div
                className="work-card flex flex-col gap-5"
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
            </Reveal>

              <div className="flex flex-col gap-12">
                <Reveal delay={60}>
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
                </Reveal>

                <Reveal delay={120}>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                        <Image
                          src="/dr-standing.jpg"
                          alt="Ian Dullu, standing"
                          fill
                          sizes="(max-width: 768px) 100vw, 20vw"
                          className="img-zoom"
                          style={{ objectFit: "cover", objectPosition: "center top" }}
                        />
                      </div>
                      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                        <Image
                          src="/dr-outdoor.jpg"
                          alt="Ian Dullu, coastal Kenya"
                          fill
                          sizes="(max-width: 768px) 100vw, 20vw"
                          className="img-zoom"
                          style={{ objectFit: "cover", objectPosition: "center 30%" }}
                        />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────── SECTION 5B · WATCH THE BUILD (reel) ─────────────────── */}
        <section style={{ backgroundColor: "#111111" }}>
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <Reveal>
              <p
                className="font-sans text-xs font-bold uppercase tracking-[0.28em] mb-4"
                style={{ color: "#D4580A" }}
              >
                In action
              </p>
              <h2
                className="font-cinematic font-bold mb-8 leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", color: "#F8F5EB" }}
              >
                Watch the build.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <video
                src="/dr-reel.mov"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  objectFit: "cover",
                  display: "block",
                  backgroundColor: "#000000",
                }}
              />
            </Reveal>
          </div>
        </section>

        {/* ──────────────────── SECTION 6 · QUALIFY OUT / QUALIFY IN ──────────────────── */}
        <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #F0EDE8" }}>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-20">
            <div className="flex flex-col gap-5" style={{ maxWidth: "52ch" }}>
              <Reveal>
                <SectionHeading>If your pipeline runs on hope and a spreadsheet</SectionHeading>
              </Reveal>
              <Reveal delay={80}>
                <p className="font-sans text-[1.0625rem] leading-[1.65]" style={{ color: "#111111" }}>
                  I do not consult and leave. I build it, run it, and stay in it with you. The Managed
                  Run: we work your book every week, you take the calls. $231 a month, cancel anytime.
                  Built for founder-led professional firms in East Africa, 3–25 people.
                </p>
              </Reveal>
              <Reveal delay={140}>
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
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────────────────────── SECTION 7 · FINAL CTA ───────────────────────── */}
        <section
          id="the-letter"
          className="scroll-mt-20"
          style={{ position: "relative", backgroundColor: "#F8F5EB", overflow: "hidden" }}
        >
          <div aria-hidden className="absolute inset-x-0 top-0 pointer-events-none select-none">
            <span
              className="font-cinematic font-bold uppercase block whitespace-nowrap text-center"
              style={{
                fontSize: "clamp(8rem, 26vw, 24rem)",
                lineHeight: 1,
                letterSpacing: "0.02em",
                color: "rgba(17,17,17,0.045)",
              }}
            >
              DR.DULLU
            </span>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-20 text-center">
            <Reveal>
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
            </Reveal>
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
}