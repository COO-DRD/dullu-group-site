import Link from "next/link";

const leaks = [
  {
    num: "01",
    title: "The Response Gap",
    body: "Leads message you and buy from your competitor before you reply. Every hour of silence is a closed deal somewhere else.",
  },
  {
    num: "02",
    title: "The Proposal Problem",
    body: "Quotes sent over WhatsApp chat. They scroll past it. You never had a real chance.",
  },
  {
    num: "03",
    title: "The Silent Quote",
    body: "The deal didn't die because they said no. It died because you never followed up.",
  },
  {
    num: "04",
    title: "The One-Transaction Client",
    body: "Clients who bought once and never heard from you again. Not because they left — because you never came back.",
  },
  {
    num: "05",
    title: "The Empty Review Page",
    body: "Happy clients who never left a review because you never asked. Your next client is reading a blank page.",
  },
  {
    num: "06",
    title: "The Time Drain",
    body: "Two or more hours every day on work automation handles in seconds. You are paying yourself to do a robot's job.",
  },
];

export default function Problem() {
  return (
    <section className="relative bg-ink-light py-24 overflow-hidden">
      <div
        className="absolute -top-8 right-0 text-[32vw] font-black text-gold/[0.025] pointer-events-none select-none leading-none"
        aria-hidden
      >
        06
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="block w-8 h-px bg-gold shrink-0" />
          <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">Where the money goes</p>
        </div>

        <h2 className="font-black text-4xl md:text-5xl lg:text-6xl text-offwhite leading-tight uppercase tracking-tight mb-4 max-w-2xl">
          Most Kenyan businesses aren&apos;t losing money because their product is bad.
        </h2>

        <p className="font-light text-grey text-lg mb-16 max-w-lg">
          They are losing it through six specific leaks. Count your yes answers.
        </p>

        <div className="divide-y divide-gold/10">
          {leaks.map((leak) => (
            <div
              key={leak.num}
              className="group grid grid-cols-[3rem_1fr] md:grid-cols-[3.5rem_1fr_1fr] gap-x-6 items-start py-7 -mx-6 px-6 hover:bg-ink transition-colors duration-200 cursor-default"
            >
              <span className="text-[11px] font-bold text-gold/40 group-hover:text-gold transition-colors mt-0.5">
                {leak.num}
              </span>

              <div>
                <h3 className="font-bold text-offwhite text-lg uppercase tracking-wide">
                  {leak.title}
                </h3>
                <span className="block h-px w-0 bg-gold mt-2 group-hover:w-full transition-all duration-500" />
                <p className="md:hidden font-light text-grey text-sm leading-relaxed mt-3">
                  {leak.body}
                </p>
              </div>

              <p className="hidden md:block font-light text-grey text-sm leading-relaxed mt-0.5">
                {leak.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gold/10">
          <Link
            href="/shop?product=african-business-audit"
            className="inline-flex items-center gap-3 text-sm font-bold text-gold uppercase tracking-[0.15em] group"
          >
            <span className="block w-8 h-px bg-gold group-hover:w-16 transition-all duration-300 shrink-0" />
            Take the free 2-minute audit
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
