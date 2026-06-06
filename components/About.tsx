const socials = [
  { label: "YouTube",   href: "https://youtube.com/@Dr_Dullu" },
  { label: "Instagram", href: "https://instagram.com/dr.dullu_" },
  { label: "LinkedIn",  href: "https://ke.linkedin.com/in/drdullu" },
  { label: "TikTok",    href: "https://tiktok.com/@dr.dullu" },
];

export default function About() {
  return (
    <section className="py-24 border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold uppercase mb-6">
              The story
            </p>
            <h2 className="font-sans font-black text-4xl md:text-5xl text-offwhite leading-tight uppercase tracking-tight">
              One person. Every system documented.
            </h2>
          </div>

          <div>
            <p className="font-light text-grey leading-relaxed mb-6">
              Ian Dullu (Dr. Dullu) is building a complete business operation from Kilifi, Kenya.
              Automation agency. Lead intelligence tool. Digital product shop.
              All of it under $100/month in tools.
            </p>
            <p className="font-light text-grey leading-relaxed mb-6">
              The point is simple: everything big companies use to dominate their markets
              is available to any business owner willing to set it up.
              This is the documentation of doing exactly that — from scratch, in public,
              with real numbers.
            </p>
            <p className="font-light text-grey leading-relaxed mb-10">
              Every system. Every cost. Every failure. Published.
            </p>

            <div className="flex flex-wrap gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors"
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
