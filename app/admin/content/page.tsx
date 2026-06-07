"use client";

import { useState, useEffect, useCallback } from "react";

type ContentType = "workshops" | "events" | "announcements" | "releases";

// ── Row shapes ────────────────────────────────────────────────────────────────
interface Workshop {
  id: string; title: string; description: string; body: string | null;
  thumbnail_url: string | null; registration_url: string | null; duration_min: number | null;
  scheduled_at: string | null; is_published: boolean; created_at: string;
}
interface Event {
  id: string; title: string; description: string; location: string;
  starts_at: string; ends_at: string | null; registration_url: string | null;
  is_published: boolean; created_at: string;
}
interface Announcement {
  id: string; title: string; body: string; type: string;
  cta_text: string | null; cta_url: string | null; expires_at: string | null;
  is_published: boolean; created_at: string;
}
interface Release {
  id: string; title: string; description: string; type: "video" | "article" | "product";
  version: string | null; product_slug: string | null; release_url: string | null;
  is_published: boolean; created_at: string;
}
type Row = Workshop | Event | Announcement | Release;

const EMPTY: {
  workshops:     Omit<Workshop,     "id" | "created_at">;
  events:        Omit<Event,        "id" | "created_at">;
  announcements: Omit<Announcement, "id" | "created_at">;
  releases:      Omit<Release,      "id" | "created_at">;
} = {
  workshops:     { title: "", description: "", body: null, thumbnail_url: null, registration_url: null, duration_min: null, scheduled_at: null, is_published: false },
  events:        { title: "", description: "", location: "Online", starts_at: "", ends_at: null, registration_url: null, is_published: false },
  announcements: { title: "", body: "", type: "announcement", cta_text: null, cta_url: null, expires_at: null, is_published: false },
  releases:      { title: "", description: "", type: "video", version: null, product_slug: null, release_url: null, is_published: false },
};

const TABS: { key: ContentType; label: string }[] = [
  { key: "workshops",     label: "Workshops"     },
  { key: "events",        label: "Events"        },
  { key: "announcements", label: "Announcements" },
  { key: "releases",      label: "Releases"      },
];

const s = (label: string, val: string | null, set: (v: string) => void, type: "text" | "textarea" | "datetime-local" | "number" | "url" = "text") => (
  <div className="flex flex-col gap-1" key={label}>
    <label className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#888" }}>{label}</label>
    {type === "textarea" ? (
      <textarea rows={4} value={val ?? ""} onChange={(e) => set(e.target.value)}
        className="font-sans text-sm px-3 py-2 focus:outline-none resize-y"
        style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", color: "#111" }} />
    ) : (
      <input type={type} value={val ?? ""} onChange={(e) => set(e.target.value)}
        className="font-sans text-sm px-3 py-2 focus:outline-none"
        style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", color: "#111" }} />
    )}
  </div>
);

export default function ContentAdminPage() {
  const [secret, setSecret]   = useState("");
  const [authed, setAuthed]   = useState(false);
  const [tab, setTab]         = useState<ContentType>("workshops");
  const [rows, setRows]       = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);
  const [isNew, setIsNew]     = useState(false);
  const [busy, setBusy]       = useState(false);
  const [msg, setMsg]         = useState("");

  useEffect(() => {
    const s = sessionStorage.getItem("content_admin_secret");
    if (s) { setSecret(s); tryAuth(s); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const load = useCallback(async (sec: string, t: ContentType) => {
    const res = await fetch(`/api/admin/content?type=${t}`, { headers: { "x-admin-secret": sec } });
    if (!res.ok) return;
    setRows(await res.json());
  }, []);

  const tryAuth = useCallback(async (sec: string) => {
    setBusy(true);
    const res = await fetch(`/api/admin/content?type=workshops`, { headers: { "x-admin-secret": sec } });
    if (!res.ok) { setMsg("Wrong secret."); setBusy(false); return; }
    sessionStorage.setItem("content_admin_secret", sec);
    setAuthed(true);
    setRows(await res.json());
    setBusy(false);
  }, []);

  useEffect(() => {
    if (authed) load(secret, tab);
  }, [tab, authed, secret, load]);

  async function save() {
    if (!editing) return;
    setBusy(true); setMsg("");
    const { id, created_at, ...payload } = editing as Row & { created_at: string };
    const url   = isNew ? `/api/admin/content?type=${tab}` : `/api/admin/content?type=${tab}&id=${id}`;
    const method = isNew ? "POST" : "PUT";
    const res   = await fetch(url, { method, headers: { "Content-Type": "application/json", "x-admin-secret": secret }, body: JSON.stringify(payload) });
    setBusy(false);
    if (!res.ok) { setMsg("Save failed."); return; }
    setMsg("Saved."); setEditing(null);
    await load(secret, tab);
  }

  async function togglePublish(row: Row) {
    await fetch(`/api/admin/content?type=${tab}&id=${row.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-secret": secret },
      body: JSON.stringify({ is_published: !row.is_published }),
    });
    await load(secret, tab);
  }

  async function del(row: Row) {
    if (!confirm(`Delete "${(row as Workshop).title}"?`)) return;
    await fetch(`/api/admin/content?type=${tab}&id=${row.id}`, { method: "DELETE", headers: { "x-admin-secret": secret } });
    await load(secret, tab);
  }

  // ── Login ────────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 380, padding: "2.5rem", backgroundColor: "#1A1A1A", border: "1px solid #333" }}>
          <p className="font-cinematic font-semibold tracking-[0.2em] uppercase mb-8" style={{ color: "#D4580A", fontSize: "1.2rem" }}>
            DR.DULLU · Content
          </p>
          <input type="password" placeholder="Admin secret" value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") tryAuth(secret); }}
            className="w-full font-sans text-sm px-4 py-3 mb-4 focus:outline-none"
            style={{ backgroundColor: "#222", border: "1px solid #444", color: "#F8F5EB" }} />
          <button onClick={() => tryAuth(secret)} disabled={busy}
            className="w-full font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-3 hover:brightness-110 disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}>
            {busy ? "Checking…" : "Enter"}
          </button>
          {msg && <p className="font-sans text-xs mt-3" style={{ color: "#D4580A" }}>{msg}</p>}
        </div>
      </div>
    );
  }

  // ── Edit form ────────────────────────────────────────────────────────────────
  if (editing) {
    const w = editing as Workshop;
    const e = editing as Event;
    const a = editing as Announcement;
    const r = editing as Release;
    const set = (k: string) => (v: string | boolean) => setEditing({ ...editing, [k]: v });

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
        <div style={{ backgroundColor: "#111111", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="font-cinematic tracking-[0.18em] uppercase" style={{ color: "#D4580A", fontSize: "1.1rem" }}>
            {isNew ? `New ${tab.slice(0, -1)}` : `Edit`}
          </span>
          <button onClick={() => setEditing(null)} className="font-sans text-xs cursor-pointer" style={{ color: "#888" }}>← Back</button>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Common to all */}
          {s("Title", w.title, set("title"))}

          {tab === "workshops" && <>
            {s("Description (short)", w.description, set("description"), "textarea")}
            {s("Body (full content)", w.body, set("body"), "textarea")}
            {s("Registration URL", w.registration_url, set("registration_url"), "url")}
            {s("Thumbnail URL", w.thumbnail_url, set("thumbnail_url"), "url")}
            {s("Duration (min)", String(w.duration_min ?? ""), (v) => set("duration_min")(v ? Number(v) as unknown as string : null as unknown as string), "number")}
            {s("Scheduled at", w.scheduled_at?.slice(0, 16) ?? "", (v) => set("scheduled_at")(v ? new Date(v).toISOString() : null as unknown as string), "datetime-local")}
          </>}

          {tab === "events" && <>
            {s("Description", e.description, set("description"), "textarea")}
            {s("Location", e.location, set("location"))}
            {s("Starts at", e.starts_at?.slice(0, 16) ?? "", (v) => set("starts_at")(new Date(v).toISOString()), "datetime-local")}
            {s("Ends at", e.ends_at?.slice(0, 16) ?? "", (v) => set("ends_at")(v ? new Date(v).toISOString() : null as unknown as string), "datetime-local")}
            {s("Registration URL", e.registration_url, set("registration_url"), "url")}
          </>}

          {tab === "announcements" && <>
            {s("Body", a.body, set("body"), "textarea")}
            {s("CTA Text", a.cta_text, set("cta_text"))}
            {s("CTA URL", a.cta_url, set("cta_url"), "url")}
            {s("Expires at", a.expires_at?.slice(0, 16) ?? "", (v) => set("expires_at")(v ? new Date(v).toISOString() : null as unknown as string), "datetime-local")}
          </>}

          {tab === "releases" && <>
            <div className="flex flex-col gap-1">
              <label className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#888" }}>Type</label>
              <select value={r.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                className="font-sans text-sm px-3 py-2 focus:outline-none"
                style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", color: "#111" }}>
                <option value="video">Video</option>
                <option value="article">Article</option>
                <option value="product">Product</option>
              </select>
            </div>
            {s("Description", r.description, set("description"), "textarea")}
            {s("Version (e.g. 1.2)", r.version, set("version"))}
            {s("Product Slug", r.product_slug, set("product_slug"))}
            {s("URL", r.release_url, set("release_url"), "url")}
          </>}

          <div className="md:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="pub" checked={!!(editing as Row).is_published}
              onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
              className="cursor-pointer" />
            <label htmlFor="pub" className="font-sans text-sm cursor-pointer" style={{ color: "#111" }}>
              Published (visible to members)
            </label>
          </div>

          <div className="md:col-span-2 flex gap-4 pt-4 border-t" style={{ borderColor: "#F0EDE8" }}>
            <button onClick={save} disabled={busy}
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-3 hover:brightness-110 disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}>
              {busy ? "Saving…" : isNew ? "Create" : "Save Changes"}
            </button>
            <button onClick={() => setEditing(null)} className="font-sans text-sm cursor-pointer" style={{ color: "#888" }}>Cancel</button>
          </div>
          {msg && <p className="md:col-span-2 font-sans text-sm" style={{ color: "#D4580A" }}>{msg}</p>}
        </div>
      </div>
    );
  }

  // ── List ─────────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#111111", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div className="flex items-center gap-6">
          <span className="font-cinematic tracking-[0.18em] uppercase" style={{ color: "#D4580A", fontSize: "1.2rem" }}>
            DR.DULLU · Content
          </span>
          <a href="/admin" className="font-sans text-xs" style={{ color: "#666" }}>← Shop Admin</a>
        </div>
        <button
          onClick={() => { setEditing({ id: "", created_at: "", ...EMPTY[tab] } as unknown as Row); setIsNew(true); }}
          className="font-sans font-bold text-[11px] tracking-[0.18em] uppercase px-6 py-2 hover:brightness-110 cursor-pointer"
          style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}>
          + New {tab.slice(0, -1)}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: "#F0EDE8" }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="font-sans text-sm font-medium px-6 py-4 transition-colors cursor-pointer"
            style={{
              borderBottom: tab === t.key ? "2px solid #D4580A" : "2px solid transparent",
              color: tab === t.key ? "#D4580A" : "#888",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {msg && <div className="px-6 py-3 font-sans text-sm" style={{ backgroundColor: "#FFF8F4", color: "#D4580A" }}>{msg}</div>}

      {/* List */}
      <div className="divide-y" style={{ borderColor: "#F0EDE8" }}>
        {rows.length === 0 && (
          <p className="px-6 py-12 font-sans text-sm text-center" style={{ color: "#AAAAAA" }}>
            No {tab} yet. Create one above.
          </p>
        )}
        {rows.map((row) => {
          const r = row as Workshop & Event & Announcement & Release;
          return (
            <div key={r.id} className="px-6 py-5 flex items-start justify-between gap-4" style={{ opacity: r.is_published ? 1 : 0.55 }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="font-sans font-semibold text-[9px] tracking-[0.14em] uppercase px-2 py-0.5"
                    style={r.is_published
                      ? { backgroundColor: "#D4580A", color: "#FFF" }
                      : { border: "1px solid #CCC", color: "#AAA" }}>
                    {r.is_published ? "Live" : "Draft"}
                  </span>
                  {r.version && (
                    <span className="font-sans text-[9px] tracking-[0.12em] uppercase px-2 py-0.5" style={{ backgroundColor: "#111", color: "#D4580A" }}>
                      v{r.version}
                    </span>
                  )}
                </div>
                <p className="font-sans font-bold text-sm truncate" style={{ color: "#111" }}>{r.title}</p>
                <p className="font-sans text-xs mt-0.5 truncate" style={{ color: "#888" }}>
                  {r.description || r.body || ""}
                  {r.starts_at && ` · ${new Date(r.starts_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}`}
                  {r.location && ` · ${r.location}`}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(row)}
                  className="font-sans text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 cursor-pointer transition-all"
                  style={r.is_published
                    ? { border: "1px solid #22c55e", color: "#22c55e" }
                    : { border: "1px solid #ccc", color: "#aaa" }}>
                  {r.is_published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => { setEditing({ ...row }); setIsNew(false); }}
                  className="font-sans font-semibold text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 hover:brightness-90 cursor-pointer"
                  style={{ backgroundColor: "#F0EDE8", color: "#555" }}>
                  Edit
                </button>
                <button
                  onClick={() => del(row)}
                  className="font-sans font-semibold text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 cursor-pointer hover:brightness-90"
                  style={{ backgroundColor: "#FFEAEA", color: "#CC3333" }}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
