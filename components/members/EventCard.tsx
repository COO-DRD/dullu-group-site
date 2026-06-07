"use client";

import { useState } from "react";
import Arr from "@/components/Arr";

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  starts_at: string;
  ends_at?: string;
  registration_url?: string;
}

function fmt(iso: string) {
  const d = new Date(iso);
  return {
    day:   d.toLocaleDateString("en-KE", { day: "2-digit" }),
    month: d.toLocaleDateString("en-KE", { month: "short" }).toUpperCase(),
    year:  d.getFullYear(),
    time:  d.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" }),
  };
}

function RegisterButton({
  event, registered, onRegister,
}: {
  event: Event;
  registered: boolean;
  onRegister: (id: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(registered);
  const [err,  setErr]  = useState(false);

  async function handleClick() {
    if (done || busy) return;
    setBusy(true); setErr(false);
    try {
      const res = await fetch("/api/members/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType:     "event",
          contentId:       event.id,
          contentTitle:    event.title,
          startsAt:        event.starts_at,
          location:        event.location,
          registrationUrl: event.registration_url,
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      onRegister(event.id);
      if (event.registration_url) window.open(event.registration_url, "_blank");
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
      className="font-sans font-bold text-[10px] tracking-[0.18em] uppercase inline-flex items-center gap-1 disabled:opacity-50 cursor-pointer"
      style={{ color: "#D4580A" }}
    >
      {busy ? "…" : err ? "Try again" : <><span>Register</span> <Arr /></>}
    </button>
  );
}

const TEMPLATES = [
  // 0 — date box left
  ({ e, registered, onRegister }: { e: Event; registered: boolean; onRegister: (id: string) => void }) => {
    const d = fmt(e.starts_at);
    return (
      <div className="flex gap-0 transition-transform hover:-translate-y-0.5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #F0EDE8" }}>
        <div className="flex flex-col items-center justify-center px-5 py-6 shrink-0" style={{ backgroundColor: "#D4580A", minWidth: "72px" }}>
          <span className="font-sans font-black text-2xl leading-none" style={{ color: "#FFFFFF" }}>{d.day}</span>
          <span className="font-sans font-semibold text-[9px] tracking-[0.2em] mt-0.5" style={{ color: "rgba(255,255,255,0.8)" }}>{d.month}</span>
        </div>
        <div className="p-5 flex flex-col justify-center">
          <p className="font-sans text-[9px] font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ color: "#888888" }}>
            {e.location} · {d.time}
          </p>
          <h3 className="font-sans font-black text-sm leading-snug mb-2" style={{ color: "#111111" }}>{e.title}</h3>
          <p className="font-sans font-light text-xs leading-relaxed mb-3" style={{ color: "#777777" }}>{e.description}</p>
          <RegisterButton event={e} registered={registered} onRegister={onRegister} />
        </div>
      </div>
    );
  },

  // 1 — big ghost date background
  ({ e, registered, onRegister }: { e: Event; registered: boolean; onRegister: (id: string) => void }) => {
    const d = fmt(e.starts_at);
    return (
      <div className="relative p-6 overflow-hidden transition-transform hover:-translate-y-0.5" style={{ backgroundColor: "#111111" }}>
        <span className="absolute right-3 bottom-0 font-sans font-black leading-none select-none pointer-events-none" style={{ fontSize: "6rem", color: "rgba(255,255,255,0.04)" }}>
          {d.day}
        </span>
        <p className="font-sans text-[9px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#D4580A" }}>
          {d.day} {d.month} · {e.location}
        </p>
        <h3 className="font-sans font-black text-sm leading-snug mb-2" style={{ color: "#F8F5EB" }}>{e.title}</h3>
        <p className="font-sans font-light text-xs leading-relaxed mb-4" style={{ color: "rgba(248,245,235,0.5)" }}>{e.description}</p>
        <RegisterButton event={e} registered={registered} onRegister={onRegister} />
      </div>
    );
  },

  // 2 — minimal dot timeline row
  ({ e, registered, onRegister }: { e: Event; registered: boolean; onRegister: (id: string) => void }) => {
    const d = fmt(e.starts_at);
    return (
      <div className="flex gap-5 py-5 border-b transition-colors hover:bg-orange-50/20" style={{ borderColor: "#F0EDE8" }}>
        <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#D4580A" }} />
          <div className="w-px flex-1" style={{ backgroundColor: "#F0EDE8" }} />
        </div>
        <div className="pb-2">
          <p className="font-sans text-[9px] font-semibold tracking-[0.2em] uppercase mb-1.5" style={{ color: "#D4580A" }}>
            {d.day} {d.month} {d.year} · {d.time} · {e.location}
          </p>
          <h3 className="font-sans font-bold text-sm mb-1" style={{ color: "#111111" }}>{e.title}</h3>
          <p className="font-sans font-light text-xs leading-relaxed mb-3" style={{ color: "#777777" }}>{e.description}</p>
          <RegisterButton event={e} registered={registered} onRegister={onRegister} />
        </div>
      </div>
    );
  },
];

export default function EventCard({
  event, index, registered, onRegister,
}: {
  event: Event;
  index: number;
  registered: boolean;
  onRegister: (id: string) => void;
}) {
  const Template = TEMPLATES[index % 3];
  return <Template e={event} registered={registered} onRegister={onRegister} />;
}
