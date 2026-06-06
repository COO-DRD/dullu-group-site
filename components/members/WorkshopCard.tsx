import Arr from "@/components/Arr";

export interface Workshop {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  video_url?: string;
  duration_min?: number;
  scheduled_at?: string;
}

const TEMPLATES = [
  // 0 — dark card
  ({ w }: { w: Workshop }) => (
    <div
      className="flex flex-col h-full p-7 transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#111111", border: "1px solid #1E1E1E" }}
    >
      {w.thumbnail_url && (
        <div className="w-full aspect-video mb-5 overflow-hidden">
          <img src={w.thumbnail_url} alt={w.title} className="w-full h-full object-cover opacity-80" />
        </div>
      )}
      <p className="font-sans text-[9px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "#D4580A" }}>
        Workshop{w.duration_min ? ` · ${w.duration_min} min` : ""}
      </p>
      <h3 className="font-sans font-black text-base leading-snug mb-3 flex-1" style={{ color: "#F8F5EB" }}>
        {w.title}
      </h3>
      <p className="font-sans font-light text-xs leading-relaxed mb-5" style={{ color: "rgba(248,245,235,0.5)" }}>
        {w.description}
      </p>
      {w.video_url && (
        <a
          href={w.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1 transition-colors hover:text-white"
          style={{ color: "#D4580A" }}
        >
          Watch <Arr />
        </a>
      )}
    </div>
  ),

  // 1 — white card, orange top border
  ({ w }: { w: Workshop }) => (
    <div
      className="flex flex-col h-full p-7 transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#FFFFFF", borderTop: "3px solid #D4580A", border: "1px solid #F0EDE8", borderTopWidth: "3px", borderTopColor: "#D4580A" }}
    >
      {w.thumbnail_url && (
        <div className="w-full aspect-video mb-5 overflow-hidden">
          <img src={w.thumbnail_url} alt={w.title} className="w-full h-full object-cover" />
        </div>
      )}
      <p className="font-sans text-[9px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "#D4580A" }}>
        Workshop{w.duration_min ? ` · ${w.duration_min} min` : ""}
      </p>
      <h3 className="font-sans font-black text-base leading-snug mb-3 flex-1" style={{ color: "#111111" }}>
        {w.title}
      </h3>
      <p className="font-sans font-light text-xs leading-relaxed mb-5" style={{ color: "#777777" }}>
        {w.description}
      </p>
      {w.video_url && (
        <a
          href={w.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1 transition-colors"
          style={{ color: "#D4580A" }}
        >
          Watch <Arr />
        </a>
      )}
    </div>
  ),

  // 2 — cream card, left orange bar
  ({ w }: { w: Workshop }) => (
    <div
      className="flex flex-col h-full transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#F8F5EB", borderLeft: "4px solid #D4580A" }}
    >
      {w.thumbnail_url && (
        <div className="w-full aspect-video overflow-hidden">
          <img src={w.thumbnail_url} alt={w.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
        <p className="font-sans text-[9px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: "#D4580A" }}>
          Workshop{w.duration_min ? ` · ${w.duration_min} min` : ""}
        </p>
        <h3 className="font-sans font-black text-base leading-snug mb-3 flex-1" style={{ color: "#111111" }}>
          {w.title}
        </h3>
        <p className="font-sans font-light text-xs leading-relaxed mb-5" style={{ color: "#555555" }}>
          {w.description}
        </p>
        {w.video_url && (
          <a
            href={w.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1"
            style={{ color: "#D4580A" }}
          >
            Watch <Arr />
          </a>
        )}
      </div>
    </div>
  ),
];

export default function WorkshopCard({ workshop, index }: { workshop: Workshop; index: number }) {
  const Template = TEMPLATES[index % 3];
  return <Template w={workshop} />;
}
