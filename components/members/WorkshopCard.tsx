"use client";

import { useState } from "react";
import Arr from "@/components/Arr";

export interface Workshop {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  registration_url?: string;
  duration_min?: number;
  scheduled_at?: string;
}

function RegisterButton({
  workshop, registered, onRegister, dark,
}: {
  workshop: Workshop;
  registered: boolean;
  onRegister: (id: string) => void;
  dark?: boolean;
}) {
  const [busy, setBusy]   = useState(false);
  const [done, setDone]   = useState(registered);
  const [err,  setErr]    = useState(false);

  async function handleClick() {
    if (done || busy) return;
    setBusy(true); setErr(false);
    try {
      const res = await fetch("/api/members/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType:     "workshop",
          contentId:       workshop.id,
          contentTitle:    workshop.title,
          startsAt:        workshop.scheduled_at,
          registrationUrl: workshop.registration_url,
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      onRegister(workshop.id);
      if (workshop.registration_url) window.open(workshop.registration_url, "_blank");
    } catch {
      setErr(true);
    } finally {
      setBusy(false);
    }
  }

  if (done) return (
    <span className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase" style={{ color: "#22c55e" }}>
      Registered ✓
    </span>
  );

  return (
    <button
      onClick={handleClick}
      disabled={busy}
      className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1 disabled:opacity-50 cursor-pointer transition-colors"
      style={{ color: dark ? "#D4580A" : "#D4580A" }}
    >
      {busy ? "…" : err ? "Try again" : <><span>Register</span> <Arr /></>}
    </button>
  );
}

const TEMPLATES = [
  // 0 — dark card
  ({ w, registered, onRegister }: { w: Workshop; registered: boolean; onRegister: (id: string) => void }) => (
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
      <RegisterButton workshop={w} registered={registered} onRegister={onRegister} dark />
    </div>
  ),

  // 1 — white card, orange top border
  ({ w, registered, onRegister }: { w: Workshop; registered: boolean; onRegister: (id: string) => void }) => (
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
      <RegisterButton workshop={w} registered={registered} onRegister={onRegister} />
    </div>
  ),

  // 2 — cream card, left orange bar
  ({ w, registered, onRegister }: { w: Workshop; registered: boolean; onRegister: (id: string) => void }) => (
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
        <RegisterButton workshop={w} registered={registered} onRegister={onRegister} />
      </div>
    </div>
  ),
];

export default function WorkshopCard({
  workshop, index, registered, onRegister,
}: {
  workshop: Workshop;
  index: number;
  registered: boolean;
  onRegister: (id: string) => void;
}) {
  const Template = TEMPLATES[index % 3];
  return <Template w={workshop} registered={registered} onRegister={onRegister} />;
}
