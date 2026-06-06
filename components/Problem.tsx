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
    <section className="bg-bean py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[0.2em] text-cognac uppercase mb-6">
          Where the money is going
        </p>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-parchment leading-tight mb-6 max-w-2xl">
          Most Kenyan businesses aren&apos;t losing money because their product is bad.
        </h2>

        <p className="text-bean-faint text-lg mb-16 max-w-xl">
          They are losing it through six specific leaks. Count your yes answers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-bean-subtle">
          {leaks.map((leak) => (
            <div key={leak.title} className="bg-bean p-8 hover:bg-bean-subtle transition-colors">
              <h3 className="font-display text-xl font-bold text-cognac mb-3">
                {leak.title}
              </h3>
              <p className="text-sm text-bean-faint leading-relaxed">
                {leak.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/shop?product=african-business-audit"
            className="inline-block border border-parchment/40 text-parchment px-8 py-4 text-sm tracking-wide hover:border-parchment transition-colors"
          >
            Take the free 2-minute audit →
          </Link>
        </div>
      </div>
    </section>
  );
}
