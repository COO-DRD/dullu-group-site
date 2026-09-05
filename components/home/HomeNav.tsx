import ManagedRunLink from "@/components/home/ManagedRunLink";

const SECTION_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Receipts", href: "#receipts" },
  { label: "The Letter", href: "#the-letter" },
];

export default function HomeNav() {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #F0EDE8",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-3 sm:gap-6">
        <a
          href="#top"
          className="font-cinematic font-bold tracking-[0.14em] uppercase inline-flex items-center min-h-[44px] whitespace-nowrap transition-colors"
          style={{ fontSize: "1.15rem", color: "#111111", textDecoration: "none" }}
        >
          <span>DR.DULLU</span>
          <span
            className="hidden min-[490px]:inline font-sans font-semibold normal-case tracking-[0.22em]"
            style={{ fontSize: "0.5rem", color: "#D4580A", marginLeft: "0.6em", marginTop: "0.35em" }}
          >
            IAN DULLU
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navlink font-sans text-sm font-medium inline-flex items-center min-h-[44px] px-3 transition-colors hover:text-amber"
              style={{ color: "#111111", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <ManagedRunLink
          location="nav"
          label="The Managed Run →"
          className="ghost-btn cursor-pointer font-sans font-bold whitespace-nowrap px-[1.05rem] sm:px-[1.4rem] text-[0.8rem] sm:text-sm"
          style={{
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid #111111",
            color: "#111111",
            background: "transparent",
            textDecoration: "none",
            boxSizing: "border-box",
            paddingTop: "0.7rem",
            paddingBottom: "0.7rem",
          }}
        />
      </div>
    </nav>
  );
}