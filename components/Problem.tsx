import Link from "next/link";

const leaks = [
  {
    title: "The Response Gap",
    body: "Leads message you and buy from your competitor before you reply. Every hour of silence is a closed deal somewhere else.",
  },
  {
    title: "The Proposal Problem",
    body: "Quotes sent over WhatsApp chat. They scroll past it. You never had a real chance.",
  },
  {
    title: "The Silent Quote",
    body: "The deal didn't die because they said no. It died because you never followed up.",
  },
  {
    title: "The One-Transaction Client",
    body: "Clients who bought once and never heard from you again. Not because they left — because you never came back.",
  },
  {
    title: "The Empty Review Page",
    body: "Happy clients who never left a review because you never asked. Your next client is reading a blank page.",
  },
  {
    title: "The Time Drain",
    body: "Two or more hours every day on work automation handles in seconds. You are paying yourself to do a robot's job.",
  },
];

export default function Problem() {
  return (
    <section className="bg-ink-light py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-6">
          Where the money is going
        </p>

        <h2 className="font-sans font-black text-4xl md:text-5xl text-offwhite leading-tight uppercase mb-6 max-w-2xl tracking-tight">
          Most Kenyan businesses aren&apos;t losing money because their product is bad.
        </h2>

        <p className="font-light text-grey text-lg mb-16 max-w-xl">
          They are losing it through six specific leaks. Count your yes answers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
          {leaks.map((leak) => (
            <div key={leak.title} className="bg-ink-light p-8 hover:bg-ink transition-colors">
              <h3 className="font-sans font-bold text-gold text-lg mb-3 uppercase tracking-wide">
                {leak.title}
              </h3>
              <p className="font-light text-grey text-sm leading-relaxed">
                {leak.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/shop?product=african-business-audit"
            className="inline-block border border-gold/40 text-offwhite font-medium text-sm tracking-[0.1em] uppercase px-8 py-4 hover:border-gold transition-colors"
          >
            Take the free 2-minute audit →
          </Link>
        </div>
      </div>
    </section>
  );
}
