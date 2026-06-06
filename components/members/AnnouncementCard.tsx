import Arr from "@/components/Arr";

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: "announcement" | "release" | "special";
  cta_text?: string;
  cta_url?: string;
  created_at: string;
}

const TYPE_LABEL: Record<string, string> = {
  announcement: "Announcement",
  release:      "New Release",
  special:      "Special Drop",
};

const TYPE_COLOR: Record<string, string> = {
  announcement: "#1B3D8F",
  release:      "#D4580A",
  special:      "#111111",
};

const TYPE_BG: Record<string, string> = {
  announcement: "rgba(27,61,143,0.06)",
  release:      "rgba(212,88,10,0.06)",
  special:      "#111111",
};

export default function AnnouncementCard({ ann, index }: { ann: Announcement; index: number }) {
  const label = TYPE_LABEL[ann.type] ?? "Announcement";
  const color = TYPE_COLOR[ann.type] ?? "#D4580A";
  const isSpecial = ann.type === "special";

  // Template 0 & 1: card layout (light/dark alternating by index)
  // Template 2: full-width banner for the first special
  if (index === 0) {
    return (
      <div
        className="col-span-full p-8 md:p-12 relative overflow-hidden"
        style={{ backgroundColor: isSpecial ? "#111111" : "#D4580A" }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: "#FFFFFF", transform: "translate(30%,-30%)" }}
        />
        <p className="font-sans text-[9px] font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
          {label}
        </p>
        <h3
          className="font-sans font-black uppercase leading-[1.0] mb-4"
          style={{ fontSize: "clamp(1.6rem,4vw,3rem)", color: "#FFFFFF", maxWidth: "28ch" }}
        >
          {ann.title}
        </h3>
        <p className="font-sans font-light leading-relaxed mb-6 max-w-2xl" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem" }}>
          {ann.body}
        </p>
        {ann.cta_url && (
          <a
            href={ann.cta_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-7 py-3 inline-flex items-center gap-2 transition-all hover:brightness-110"
            style={{ backgroundColor: "#FFFFFF", color: isSpecial ? "#111111" : "#D4580A" }}
          >
            {ann.cta_text ?? "Learn More"} <Arr />
          </a>
        )}
      </div>
    );
  }

  if (index % 2 === 0) {
    return (
      <div
        className="p-6 transition-transform hover:-translate-y-0.5"
        style={{ backgroundColor: TYPE_BG[ann.type] ?? "#F8F5EB", borderLeft: `3px solid ${color}` }}
      >
        <p className="font-sans text-[9px] font-semibold tracking-[0.22em] uppercase mb-3" style={{ color }}>
          {label}
        </p>
        <h3 className="font-sans font-black text-sm leading-snug mb-2" style={{ color: "#111111" }}>{ann.title}</h3>
        <p className="font-sans font-light text-xs leading-relaxed mb-4" style={{ color: "#666666" }}>{ann.body}</p>
        {ann.cta_url && (
          <a href={ann.cta_url} target="_blank" rel="noopener noreferrer"
            className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1"
            style={{ color }}>
            {ann.cta_text ?? "See more"} <Arr />
          </a>
        )}
      </div>
    );
  }

  return (
    <div
      className="p-6 transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#111111" }}
    >
      <p className="font-sans text-[9px] font-semibold tracking-[0.22em] uppercase mb-3" style={{ color }}>
        {label}
      </p>
      <h3 className="font-sans font-black text-sm leading-snug mb-2" style={{ color: "#F8F5EB" }}>{ann.title}</h3>
      <p className="font-sans font-light text-xs leading-relaxed mb-4" style={{ color: "rgba(248,245,235,0.55)" }}>{ann.body}</p>
      {ann.cta_url && (
        <a href={ann.cta_url} target="_blank" rel="noopener noreferrer"
          className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1"
          style={{ color }}>
          {ann.cta_text ?? "See more"} <Arr />
        </a>
      )}
    </div>
  );
}
