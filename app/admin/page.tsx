"use client";

import { useState, useEffect, useCallback } from "react";
import Arr from "@/components/Arr";

const API = "https://dullu-shop-api.dullugroup.co.ke";

interface Product {
  id: string; slug: string; title: string; tagline: string;
  description: string | null; features: string | null; what_you_get: string | null;
  category: string; audience: string; price_kes: number; price_usd: number;
  file_path: string | null; active: number; sort_order: number;
}

const EMPTY: Omit<Product, "id"> = {
  slug: "", title: "", tagline: "", description: "", features: "",
  what_you_get: "", category: "sme", audience: "sme",
  price_kes: 0, price_usd: 0, file_path: "", active: 1, sort_order: 99,
};

function linesFromJson(raw: string | null): string {
  if (!raw) return "";
  try { const a = JSON.parse(raw); if (Array.isArray(a)) return a.join("\n"); } catch {}
  return raw;
}
function jsonFromLines(s: string): string | null {
  const lines = s.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.length ? JSON.stringify(lines) : null;
}

export default function AdminPage() {
  const [secret, setSecret]       = useState("");
  const [authed, setAuthed]       = useState(false);
  const [products, setProducts]   = useState<Product[]>([]);
  const [editing, setEditing]     = useState<Product | null>(null);
  const [isNew, setIsNew]         = useState(false);
  const [busy, setBusy]           = useState(false);
  const [msg, setMsg]             = useState("");

  useEffect(() => {
    const s = sessionStorage.getItem("admin_secret");
    if (s) { setSecret(s); tryLoad(s); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tryLoad = useCallback(async (s: string) => {
    setBusy(true);
    try {
      const res = await fetch(`${API}/api/admin/products`, {
        headers: { "X-Admin-Secret": s },
      });
      if (!res.ok) { setMsg("Wrong secret."); return; }
      const data = await res.json() as Product[];
      setProducts(data);
      sessionStorage.setItem("admin_secret", s);
      setAuthed(true);
    } catch { setMsg("Network error."); }
    finally { setBusy(false); }
  }, []);

  async function save() {
    if (!editing) return;
    setBusy(true); setMsg("");
    const payload = {
      ...editing,
      features:     jsonFromLines(editing.features ?? ""),
      what_you_get: jsonFromLines(editing.what_you_get ?? ""),
    };
    try {
      const res = isNew
        ? await fetch(`${API}/api/admin/products`, {
            method: "POST", headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
            body: JSON.stringify(payload),
          })
        : await fetch(`${API}/api/admin/products/${editing.id}`, {
            method: "PUT", headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
            body: JSON.stringify(payload),
          });
      if (!res.ok) { setMsg("Save failed."); return; }
      setMsg("Saved.");
      setEditing(null);
      await tryLoad(secret);
    } catch { setMsg("Network error."); }
    finally { setBusy(false); }
  }

  async function toggleActive(p: Product) {
    await fetch(`${API}/api/admin/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Secret": secret },
      body: JSON.stringify({ ...p, active: p.active ? 0 : 1 }),
    });
    await tryLoad(secret);
  }

  // ── Login screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 380, padding: "2.5rem", backgroundColor: "#1A1A1A", border: "1px solid #333" }}>
          <p className="font-cinematic font-semibold tracking-[0.2em] uppercase mb-8" style={{ color: "#D4580A", fontSize: "1.2rem" }}>
            DR.DULLU Admin
          </p>
          <input
            type="password"
            placeholder="Admin secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") tryLoad(secret); }}
            className="w-full font-sans text-sm px-4 py-3 mb-4 focus:outline-none"
            style={{ backgroundColor: "#222", border: "1px solid #444", color: "#F8F5EB" }}
          />
          <button
            onClick={() => tryLoad(secret)}
            disabled={busy}
            className="w-full font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-3 transition-all hover:brightness-110 disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
          >
            {busy ? "Checking…" : <><span>Enter</span> <Arr /></>}
          </button>
          {msg && <p className="font-sans text-xs mt-3" style={{ color: "#D4580A" }}>{msg}</p>}
        </div>
      </div>
    );
  }

  // ── Edit / New form ─────────────────────────────────────────────────────────
  if (editing) {
    const f = (k: keyof typeof editing, label: string, type: "text" | "number" | "textarea" | "select" = "text") => (
      <div className="flex flex-col gap-1">
        <label className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#888" }}>
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            value={String(editing[k] ?? "")}
            onChange={(e) => setEditing({ ...editing, [k]: e.target.value })}
            rows={4}
            className="font-sans text-sm px-3 py-2 focus:outline-none resize-y"
            style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", color: "#111" }}
            placeholder="One item per line"
          />
        ) : type === "select" ? (
          <select
            value={String(editing[k] ?? "")}
            onChange={(e) => setEditing({ ...editing, [k]: e.target.value })}
            className="font-sans text-sm px-3 py-2 focus:outline-none"
            style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", color: "#111" }}
          >
            {k === "audience" || k === "category"
              ? ["sme", "corporate", "free", "both"].map((v) => <option key={v} value={v}>{v}</option>)
              : null}
          </select>
        ) : (
          <input
            type={type}
            value={String(editing[k] ?? "")}
            onChange={(e) => setEditing({ ...editing, [k]: type === "number" ? Number(e.target.value) : e.target.value })}
            className="font-sans text-sm px-3 py-2 focus:outline-none"
            style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", color: "#111" }}
          />
        )}
      </div>
    );

    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
        <div style={{ backgroundColor: "#111111", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="font-cinematic tracking-[0.18em] uppercase" style={{ color: "#D4580A", fontSize: "1.1rem" }}>
            {isNew ? "New Product" : "Edit Product"}
          </span>
          <button onClick={() => setEditing(null)} className="font-sans text-xs cursor-pointer" style={{ color: "#888" }}>
            ← Back
          </button>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {f("title", "Title")}
          {f("slug", "Slug (URL)")}
          {f("tagline", "Tagline")}
          {f("audience", "Audience", "select")}
          {f("category", "Category", "select")}
          {f("price_kes", "Price KES (0 = free)", "number")}
          {f("price_usd", "Price USD", "number")}
          {f("file_path", "File path (e.g. sme/weaponize-ai.pdf)")}
          {f("sort_order", "Sort order", "number")}

          <div className="md:col-span-2">{f("description", "Description", "textarea")}</div>
          <div className="md:col-span-2">
            <div className="flex flex-col gap-1">
              <label className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#888" }}>
                Features (one per line)
              </label>
              <textarea
                value={linesFromJson(editing.features)}
                onChange={(e) => setEditing({ ...editing, features: e.target.value })}
                rows={5}
                className="font-sans text-sm px-3 py-2 focus:outline-none resize-y"
                style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", color: "#111" }}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-col gap-1">
              <label className="font-sans text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#888" }}>
                What you get (one per line)
              </label>
              <textarea
                value={linesFromJson(editing.what_you_get)}
                onChange={(e) => setEditing({ ...editing, what_you_get: e.target.value })}
                rows={5}
                className="font-sans text-sm px-3 py-2 focus:outline-none resize-y"
                style={{ backgroundColor: "#F9F9F9", border: "1px solid #E0E0E0", color: "#111" }}
              />
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              checked={!!editing.active}
              onChange={(e) => setEditing({ ...editing, active: e.target.checked ? 1 : 0 })}
              className="cursor-pointer"
            />
            <label htmlFor="active" className="font-sans text-sm cursor-pointer" style={{ color: "#111" }}>
              Active (visible on shop)
            </label>
          </div>

          <div className="md:col-span-2 flex gap-4 pt-4 border-t" style={{ borderColor: "#F0EDE8" }}>
            <button
              onClick={save}
              disabled={busy}
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-3 transition-all hover:brightness-110 disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
            >
              {busy ? "Saving…" : isNew ? <><span>Create Product</span> <Arr /></> : <><span>Save Changes</span> <Arr /></>}
            </button>
            <button onClick={() => setEditing(null)} className="font-sans text-sm cursor-pointer" style={{ color: "#888" }}>
              Cancel
            </button>
          </div>
          {msg && <p className="md:col-span-2 font-sans text-sm" style={{ color: "#D4580A" }}>{msg}</p>}
        </div>
      </div>
    );
  }

  // ── Product list ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#111111", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <span className="font-cinematic tracking-[0.18em] uppercase" style={{ color: "#D4580A", fontSize: "1.2rem" }}>
          DR.DULLU · Products ({products.length})
        </span>
        <div className="flex gap-3">
          <a href="/shop" target="_blank" className="font-sans text-xs font-medium cursor-pointer" style={{ color: "#888" }}>
            View shop ↗
          </a>
          <button
            onClick={() => { setEditing({ id: `prod_${Date.now()}`, ...EMPTY }); setIsNew(true); }}
            className="font-sans font-bold text-[11px] tracking-[0.18em] uppercase px-6 py-2 transition-all hover:brightness-110 cursor-pointer"
            style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
          >
            + New Product
          </button>
        </div>
      </div>

      {msg && <div className="px-6 py-3 font-sans text-sm" style={{ backgroundColor: "#FFF8F4", color: "#D4580A" }}>{msg}</div>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #F0EDE8", backgroundColor: "#FAFAF8" }}>
              {["#", "Title", "Slug", "Audience", "KES", "USD", "File", "Active", ""].map((h) => (
                <th key={h} className="font-sans font-semibold text-[10px] tracking-[0.18em] uppercase text-left px-4 py-3" style={{ color: "#888" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #F0EDE8", opacity: p.active ? 1 : 0.45 }}>
                <td className="font-cinematic font-light px-4 py-4" style={{ color: "#DDD", fontSize: "1.5rem" }}>
                  {p.sort_order}
                </td>
                <td className="px-4 py-4">
                  <p className="font-sans font-bold text-sm" style={{ color: "#111" }}>{p.title}</p>
                  <p className="font-sans text-xs font-light mt-0.5" style={{ color: "#888", maxWidth: 280 }}>{p.tagline}</p>
                </td>
                <td className="px-4 py-4 font-sans text-xs" style={{ color: "#888" }}>{p.slug}</td>
                <td className="px-4 py-4">
                  <span
                    className="font-sans font-semibold text-[10px] tracking-[0.12em] uppercase px-2 py-1"
                    style={p.price_kes === 0
                      ? { backgroundColor: "#D4580A", color: "#FFF" }
                      : { border: "1px solid #D4580A", color: "#D4580A" }}
                  >
                    {p.price_kes === 0 ? "Free" : p.audience}
                  </span>
                </td>
                <td className="px-4 py-4 font-sans text-sm" style={{ color: "#333" }}>
                  {p.price_kes === 0 ? "—" : p.price_kes.toLocaleString()}
                </td>
                <td className="px-4 py-4 font-sans text-sm" style={{ color: "#333" }}>
                  {p.price_usd === 0 ? "—" : p.price_usd}
                </td>
                <td className="px-4 py-4 font-sans text-xs" style={{ color: "#888", maxWidth: 160, wordBreak: "break-all" }}>
                  {p.file_path ?? "—"}
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => toggleActive(p)}
                    className="font-sans text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-1 cursor-pointer transition-all"
                    style={p.active
                      ? { border: "1px solid #22c55e", color: "#22c55e" }
                      : { border: "1px solid #ccc", color: "#aaa" }}
                  >
                    {p.active ? "Live" : "Hidden"}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => { setEditing({ ...p, features: linesFromJson(p.features), what_you_get: linesFromJson(p.what_you_get) }); setIsNew(false); }}
                    className="font-sans font-semibold text-[10px] tracking-[0.14em] uppercase px-4 py-2 transition-all hover:brightness-90 cursor-pointer"
                    style={{ backgroundColor: "#F0EDE8", color: "#555" }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
