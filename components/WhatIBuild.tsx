const builds = [
  {
    label: "Playbooks",
    heading: "Self-serve guides you build once and run without you.",
    body: "Step-by-step automation systems for Kenyan business owners. WhatsApp, M-Pesa, AI prompts, lead follow-up. Built for East African reality, not Silicon Valley.",
    price: "From KES 999",
    cta: "Browse the Shop",
    href: "/shop",
    external: false,
  },
  {
    label: "Automation Builds",
    heading: "Done-for-you systems. We build it. You run it.",
    body: "Custom automation work through Dullu Digital. WhatsApp bots, lead pipelines, payment flows, operational infrastructure. Full build, full handover.",
    price: "From KES 120,000",
    cta: "Dullu Digital",
    href: "https://digital.dullugroup.co.ke",
    external: true,
  },
  {
    label: "Lead Intelligence",
    heading: "500 qualified leads before your competitor finds five.",
    body: "4unter finds, enriches, and AI-scores leads from any market. Import to your pipeline or fire outreach directly. Built for sales teams and agencies.",
    price: "Free trial",
    cta: "Try 4unter",
    href: "https://4unter.dullugroup.co.ke",
    external: true,
  },
];

export default function WhatIBuild() {
  return (
    <section className="py-24 border-b border-cognac/20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[0.2em] text-cognac uppercase mb-6">
          What I build
        </p>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-bean leading-tight mb-16 max-w-xl">
          Three ways to put the weapons to work.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cognac/20">
          {builds.map((b) => (
            <div key={b.label} className="bg-parchment p-8 flex flex-col">
              <p className="text-xs tracking-[0.15em] text-cognac uppercase mb-4">{b.label}</p>
              <h3 className="font-display text-xl font-bold text-bean mb-4 leading-snug">
                {b.heading}
              </h3>
              <p className="text-sm text-bean-muted leading-relaxed mb-8 flex-1">{b.body}</p>
              <div>
                <p className="text-xs text-bean-muted mb-4">{b.price}</p>
                <a
                  href={b.href}
                  target={b.external ? "_blank" : undefined}
                  rel={b.external ? "noopener noreferrer" : undefined}
                  className="inline-block border border-cognac text-cognac px-6 py-3 text-sm hover:bg-cognac hover:text-parchment transition-colors"
                >
                  {b.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
