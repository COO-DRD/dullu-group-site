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
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="font-cinematic font-bold tracking-[0.14em] uppercase inline-flex items-center min-h-[44px] whitespace-nowrap"
          style={{ fontSize: "1.15rem", color: "#111111", textDecoration: "none" }}
        >
          Ian Dullu
        </a>

        <div className="hidden md:flex items-center gap-6">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium inline-flex items-center min-h-[44px] px-3 transition-colors hover:text-amber"
              style={{ color: "#111111", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <ManagedRunLink
          location="nav"
          label="The Managed Run →"
          className="ghost-btn cursor-pointer font-sans font-bold text-sm whitespace-nowrap"
          style={{
            padding: "0.85rem 1.4rem",
            minHeight: 44,
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid #111111",
            color: "#111111",
            background: "transparent",
            textDecoration: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    </nav>
  );
}