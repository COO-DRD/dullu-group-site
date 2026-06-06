import Link from "next/link";

const stats = [
  { num: "11",    label: "Weapons in the arsenal" },
  { num: "$100",  label: "Max monthly tooling cost" },
  { num: "100%",  label: "Built in public" },
];

export default function Hero() {
  return (
    <section className="relative bg-grid min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Background WEAPONS lettering */}
      <div
        className="absolute bottom-16 right-0 text-[22vw] font-black text-gold/[0.04] pointer-events-none select-none leading-none tracking-tight uppercase"
        aria-hidden
      >
        WEAPONS
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-12 w-full flex-1 flex flex-col justify-center">
        {/* Kicker */}
        <div className="flex items-center gap-4 mb-12 animate-fade-up opacity-0" style={{ animationDelay: "0s" }}>
          <span className="block w-8 h-px bg-gold shrink-0" />
          <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">
            DR.DULLU · KILIFI, KENYA
          </p>
        </div>

        {/* Headline — each line staggers in */}
        <h1 className="font-black uppercase leading-[0.93] tracking-tight mb-10">
          <span
            className="block text-5xl md:text-7xl lg:text-[6.5rem] text-offwhite animate-fade-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            You don&apos;t need
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-[6.5rem] text-offwhite animate-fade-up opacity-0"
            style={{ animationDelay: "0.22s" }}
          >
            a big budget
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-[6.5rem] text-gold animate-fade-up opacity-0"
            style={{ animationDelay: "0.34s" }}
          >
            to build big
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-[6.5rem] text-offwhite animate-fade-up opacity-0"
            style={{ animationDelay: "0.46s" }}
          >
            systems.
          </span>
        </h1>

        <p
          className="font-black text-xl md:text-2xl text-gold/80 uppercase tracking-[0.12em] mb-8 animate-fade-up opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          You need the right weapons.
        </p>

        <p
          className="font-light text-grey text-base md:text-lg leading-relaxed mb-14 max-w-md animate-fade-up opacity-0"
          style={{ animationDelay: "0.72s" }}
        >
          One person. Kilifi, Kenya. Building an automation agency, lead intelligence
          tool, and digital product shop — all under $100/month in tools.
          Everything documented as it gets built.
        </p>

        <div
          className="flex flex-wrap gap-4 animate-fade-up opacity-0"
          style={{ animationDelay: "0.84s" }}
        >
          <Link
            href="/shop"
            className="bg-gold text-ink font-bold text-sm tracking-[0.1em] uppercase px-8 py-4 hover:brightness-110 transition-all"
          >
            Get the Playbooks →
          </Link>
          <Link
            href="/office"
            className="border border-gold/40 text-offwhite font-semibold text-sm tracking-[0.1em] uppercase px-8 py-4 hover:border-gold hover:text-gold transition-all"
          >
            Book a Call
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-gold/20 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-gold/20">
            {stats.map((s) => (
              <div key={s.label} className="py-7 px-6 first:pl-0">
                <p className="font-black text-3xl md:text-4xl text-gold mb-1 leading-none">{s.num}</p>
                <p className="text-[11px] font-light text-grey tracking-wide mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
