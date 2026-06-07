"use client";

import { useEffect, useState } from "react";
import WorkshopCard, { type Workshop } from "./WorkshopCard";
import EventCard, { type Event } from "./EventCard";
import AnnouncementCard, { type Announcement } from "./AnnouncementCard";
import ReleaseCard, { type Release } from "./ReleaseCard";

interface Feed {
  workshops:     Workshop[];
  events:        Event[];
  announcements: Announcement[];
  releases:      Release[];
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-6" style={{ color: "#D4580A" }}>
      {children}
    </p>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div
      className="border-dashed border-2 p-10 text-center"
      style={{ borderColor: "#F0EDE8" }}
    >
      <p className="font-sans font-light text-sm" style={{ color: "#BBBBBB" }}>
        No {label} yet — check back soon.
      </p>
    </div>
  );
}

export default function MemberFeed() {
  const [feed, setFeed]           = useState<Feed | null>(null);
  const [registeredIds, setIds]   = useState<Set<string>>(new Set());
  const [error, setError]         = useState(false);
  const [tab, setTab]             = useState<"all" | "workshops" | "events" | "releases">("all");

  useEffect(() => {
    Promise.all([
      fetch("/api/members/feed").then((r) => r.ok ? r.json() : Promise.reject()),
      fetch("/api/members/registrations").then((r) => r.ok ? r.json() : { ids: [] }),
    ])
      .then(([feedData, regData]: [Feed, { ids: string[] }]) => {
        setFeed(feedData);
        setIds(new Set(regData.ids));
      })
      .catch(() => setError(true));
  }, []);

  function onRegister(id: string) {
    setIds((prev) => new Set([...prev, id]));
  }

  if (error) return (
    <p className="font-sans text-sm" style={{ color: "#D4580A" }}>Failed to load member content.</p>
  );

  if (!feed) return (
    <div className="flex gap-2 items-center py-8">
      <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
      <span className="font-sans text-xs" style={{ color: "#BBBBBB" }}>Loading your feed…</span>
    </div>
  );

  const TABS = [
    { id: "all",       label: "All" },
    { id: "workshops", label: `Workshops${feed.workshops.length ? ` (${feed.workshops.length})` : ""}` },
    { id: "events",    label: `Events${feed.events.length ? ` (${feed.events.length})` : ""}` },
    { id: "releases",  label: `Releases${feed.releases.length ? ` (${feed.releases.length})` : ""}` },
  ] as const;

  return (
    <div className="space-y-20">

      {/* Tabs */}
      <div className="flex gap-0 border-b" style={{ borderColor: "#F0EDE8" }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="font-sans font-semibold text-[10px] tracking-[0.18em] uppercase px-5 py-3 transition-colors cursor-pointer"
            style={{
              color:       tab === t.id ? "#D4580A" : "#AAAAAA",
              borderBottom: tab === t.id ? "2px solid #D4580A" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Announcements — always shown on "all" tab at top */}
      {(tab === "all") && feed.announcements.length > 0 && (
        <section>
          <SectionLabel>Announcements</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feed.announcements.map((a, i) => (
              <AnnouncementCard key={a.id} ann={a} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Workshops */}
      {(tab === "all" || tab === "workshops") && (
        <section>
          <SectionLabel>Workshops</SectionLabel>
          {feed.workshops.length === 0 ? <Empty label="workshops" /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {feed.workshops.map((w, i) => (
                <WorkshopCard key={w.id} workshop={w} index={i} registered={registeredIds.has(w.id)} onRegister={onRegister} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Events */}
      {(tab === "all" || tab === "events") && (
        <section>
          <SectionLabel>Upcoming Events</SectionLabel>
          {feed.events.length === 0 ? <Empty label="events" /> : (
            <div className="space-y-0">
              {feed.events.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} registered={registeredIds.has(e.id)} onRegister={onRegister} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Releases */}
      {(tab === "all" || tab === "releases") && (
        <section>
          <SectionLabel>Releases</SectionLabel>
          {feed.releases.length === 0 ? <Empty label="releases" /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {feed.releases.map((r, i) => (
                <ReleaseCard key={r.id} release={r} index={i} />
              ))}
            </div>
          )}
        </section>
      )}

    </div>
  );
}
