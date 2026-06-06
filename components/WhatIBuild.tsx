const weapons = [
  {
    index: "W·01",
    label: "Playbooks",
    heading: "Self-serve guides built for East African reality.",
    body: "WhatsApp, M-Pesa, AI prompts, lead follow-up. Step-by-step automation systems for Kenyan business owners, not Silicon Valley.",
    price: "From KES 999",
    cta: "Browse the Shop",
    href: "/shop",
    external: false,
    tag: "Most popular",
  },
  {
    index: "W·02",
    label: "Automation Builds",
    heading: "Done-for-you systems. We build it. You run it.",
    body: "Custom automation through Dullu Digital. WhatsApp bots, lead pipelines, payment flows. Full build, full handover.",
    price: "From KES 120,000",
    cta: "Dullu Digital",
    href: "https://digital.dullugroup.co.ke",
    external: true,
    tag: null,
  },
  {
    index: "W·03",
    label: "Lead Intelligence",
    heading: "500 qualified leads before your competitor finds five.",
    body: "4unter finds, enriches, and AI-scores leads from any market. Import to your pipeline or fire outreach directly.",
    price: "Free trial",
    cta: "Try 4unter",
    href: "https://4unter.dullugroup.co.ke",
    external: true,
    tag: "Free to start",
  },
];

export default function WhatIBuild() {
  return (
    <section className="relative py-24 bg-ink overflow-hidden">
      <div
        className="absolute -top-12 left-0 text-[28vw] font-black text-gold/[0.025] pointer-events-none select-none leading-none"
        aria-hidden
      >
        3
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="block w-8 h-px bg-gold shrink-0" />
          <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">The Arsenal</p>
        </div>

        <h2 className="font-black text-4xl md:text-5xl text-offwhite leading-tight uppercase tracking-tight mb-16 max-w-xl">
          Three ways to put the weapons to work.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/10">
          {weapons.map((w) => (
            <div
              key={w.index}
              className="group relative bg-ink p-8 flex flex-col hover:bg-ink-light transition-colors overflow-hidden"
            >
              {/* Top border grows on hover */}
              <span className="absolute top-0 left-0 h-px w-0 bg-gold group-hover:w-full transition-all duration-500" />

              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-bold tracking-[0.25em] text-gold/40 uppercase">{w.index}</span>
                {w.tag && (
                  <span className="text-[10px] font-bold tracking-[0.1em] text-ink bg-gold px-2 py-0.5 uppercase shrink-0">
                    {w.tag}
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-3">{w.label}</p>
              <h3 className="font-bold text-offwhite text-xl leading-snug mb-4">{w.heading}</h3>
              <p className="font-light text-grey text-sm leading-relaxed mb-8 flex-1">{w.body}</p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                <span className="text-xs font-bold text-gold">{w.price}</span>
                <a
                  href={w.href}
                  target={w.external ? "_blank" : undefined}
                  rel={w.external ? "noopener noreferrer" : undefined}
                  className="text-xs font-bold text-gold/70 uppercase tracking-[0.15em] hover:text-gold transition-colors group-hover:translate-x-1 transition-transform"
                >
                  {w.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
