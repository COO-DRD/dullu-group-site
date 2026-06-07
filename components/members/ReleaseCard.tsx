import Arr from "@/components/Arr";

export interface Release {
  id: string;
  title: string;
  description: string;
  type: "video" | "article" | "product";
  version?: string;
  product_slug?: string;
  release_url?: string;
  created_at: string;
}

function ctaLabel(type: Release["type"]) {
  if (type === "video")   return "Watch";
  if (type === "article") return "Read";
  return "Access";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7)  return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} wk ago`;
  return `${Math.floor(days / 30)} mo ago`;
}

const TEMPLATES = [
  // 0 — horizontal with version badge
  ({ r }: { r: Release }) => (
    <div
      className="flex items-start gap-5 p-5 transition-colors"
      style={{ borderBottom: "1px solid #F0EDE8" }}
    >
      <div className="shrink-0 pt-0.5">
        {r.version ? (
          <span
            className="font-sans font-bold text-[9px] tracking-[0.12em] px-2 py-1 inline-block"
            style={{ backgroundColor: "#111111", color: "#D4580A" }}
          >
            v{r.version}
          </span>
        ) : (
          <span
            className="font-sans font-bold text-[9px] tracking-[0.12em] px-2 py-1 inline-block"
            style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
          >
            NEW
          </span>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-sans font-bold text-sm mb-1" style={{ color: "#111111" }}>{r.title}</h3>
        <p className="font-sans font-light text-xs leading-relaxed mb-3" style={{ color: "#777777" }}>{r.description}</p>
        {r.release_url && (
          <a href={r.release_url} target="_blank" rel="noopener noreferrer"
            className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1"
            style={{ color: "#D4580A" }}>
            {ctaLabel(r.type)} <Arr />
          </a>
        )}
      </div>
      <span className="font-sans text-[10px] shrink-0 pt-0.5" style={{ color: "#BBBBBB" }}>
        {timeAgo(r.created_at)}
      </span>
    </div>
  ),

  // 1 — dark card with version ghost text
  ({ r }: { r: Release }) => (
    <div
      className="relative p-6 overflow-hidden transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#111111" }}
    >
      {r.version && (
        <span
          className="absolute right-4 bottom-2 font-sans font-black leading-none select-none pointer-events-none"
          style={{ fontSize: "4rem", color: "rgba(212,88,10,0.1)" }}
        >
          v{r.version}
        </span>
      )}
      <span
        className="font-sans font-bold text-[9px] tracking-[0.12em] px-2 py-1 inline-block mb-4"
        style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
      >
        {r.version ? `v${r.version}` : "NEW"}
      </span>
      <h3 className="font-sans font-black text-sm leading-snug mb-2" style={{ color: "#F8F5EB" }}>{r.title}</h3>
      <p className="font-sans font-light text-xs leading-relaxed mb-4" style={{ color: "rgba(248,245,235,0.5)" }}>{r.description}</p>
      {r.release_url && (
        <a href={r.release_url} target="_blank" rel="noopener noreferrer"
          className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1"
          style={{ color: "#D4580A" }}>
          {ctaLabel(r.type)} <Arr />
        </a>
      )}
    </div>
  ),

  // 2 — white card with orange dot accent
  ({ r }: { r: Release }) => (
    <div
      className="p-6 transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0EDE8" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#D4580A" }} />
        <p className="font-sans text-[9px] font-semibold tracking-[0.22em] uppercase" style={{ color: "#D4580A" }}>
          Release {r.version ? `· v${r.version}` : ""}
        </p>
      </div>
      <h3 className="font-sans font-black text-sm leading-snug mb-2" style={{ color: "#111111" }}>{r.title}</h3>
      <p className="font-sans font-light text-xs leading-relaxed mb-4" style={{ color: "#777777" }}>{r.description}</p>
      {r.release_url && (
        <a href={r.release_url} target="_blank" rel="noopener noreferrer"
          className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1"
          style={{ color: "#D4580A" }}>
          {ctaLabel(r.type)} <Arr />
        </a>
      )}
    </div>
  ),
];

export default function ReleaseCard({ release, index }: { release: Release; index: number }) {
  const Template = TEMPLATES[index % 3];
  return <Template r={release} />;
}
