const socials = [
  { label: "YouTube",   href: "https://youtube.com/@Dr_Dullu" },
  { label: "Instagram", href: "https://instagram.com/dr.dullu_" },
  { label: "LinkedIn",  href: "https://ke.linkedin.com/in/drdullu" },
  { label: "TikTok",    href: "https://tiktok.com/@dr.dullu" },
];

export default function About() {
  return (
    <section className="bg-ink-light py-24 border-t border-gold/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <span className="block w-8 h-px bg-gold shrink-0" />
          <p className="text-xs font-semibold tracking-[0.3em] text-gold uppercase">The story</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-start">
          {/* Pull quote — magazine editorial left column */}
          <div className="lg:pr-16 lg:border-r border-gold/15">
            <blockquote className="font-black text-4xl md:text-5xl lg:text-[3.25rem] text-offwhite uppercase leading-[1.0] tracking-tight">
              &ldquo;Everything big companies use to dominate is available to any business willing to set it up.&rdquo;
            </blockquote>
            <div className="flex items-center gap-4 mt-10">
              <span className="block w-8 h-px bg-gold shrink-0" />
              <span className="text-xs font-semibold tracking-[0.2em] text-gold/60 uppercase">Ian Dullu · Kilifi, Kenya</span>
            </div>
          </div>

          {/* Body copy */}
          <div className="lg:pl-16">
            <p className="font-light text-grey leading-relaxed mb-5">
              Ian Dullu (Dr. Dullu) is building a complete business operation from Kilifi, Kenya.
              Automation agency. Lead intelligence tool. Digital product shop.
              All of it under $100/month in tools.
            </p>
            <p className="font-light text-grey leading-relaxed mb-5">
              The point is simple: every advantage big companies use to dominate their markets is
              available to any business owner willing to set it up. This is the documentation of
              doing exactly that — from scratch, in public, with real numbers.
            </p>
            <p className="font-light text-grey leading-relaxed mb-12">
              Every system. Every cost. Every failure. Published.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-gold/60 uppercase tracking-[0.1em] hover:text-gold transition-colors"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
