"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Arr from "@/components/Arr";

interface Order {
  orderId:      string;
  productTitle: string;
  productSlug:  string;
  amountKes:    number;
  createdAt:    string;
  downloadUrl:  string | null;
}

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}wk ago`;
  return new Date(iso).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

export default function DownloadsSection() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    fetch("/api/members/downloads")
      .then((r) => r.ok ? r.json() : { orders: [] })
      .then((d: { orders: Order[] }) => setOrders(d.orders ?? []))
      .catch(() => setOrders([]));
  }, []);

  if (orders === null) {
    return (
      <div className="flex items-center gap-2 py-4">
        <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
        <span className="font-sans text-xs" style={{ color: "#BBBBBB" }}>Loading downloads…</span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="border-2 border-dashed p-12 text-center" style={{ borderColor: "#F0EDE8" }}>
        <p className="font-sans font-light text-sm mb-5" style={{ color: "#888888" }}>
          Purchases and claimed freebies appear here.
        </p>
        <Link
          href="/shop"
          className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-8 py-3 inline-flex items-center gap-1 transition-all hover:brightness-110"
          style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
        >
          Browse the Shop <Arr />
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y" style={{ borderColor: "#F0EDE8" }}>
      {orders.map((o) => (
        <div
          key={o.orderId}
          className="flex items-center justify-between gap-4 py-4"
          style={{ borderColor: "#F0EDE8" }}
        >
          <div className="min-w-0 flex-1">
            <p className="font-sans font-semibold text-sm truncate" style={{ color: "#111111" }}>
              {o.productTitle}
            </p>
            <p className="font-sans text-[10px] mt-0.5" style={{ color: "#AAAAAA" }}>
              {o.amountKes === 0 ? "Free" : `KES ${o.amountKes.toLocaleString()}`}
              {" · "}
              {timeAgo(o.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {o.downloadUrl ? (
              <a
                href={o.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-bold text-[10px] tracking-[0.15em] uppercase px-4 py-2 inline-flex items-center gap-1 transition-all hover:brightness-110"
                style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
              >
                Download <Arr />
              </a>
            ) : (
              <ResendButton orderId={o.orderId} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ResendButton({ orderId }: { orderId: string }) {
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);

  async function resend() {
    setBusy(true);
    await fetch("/api/members/resend-download", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ orderId }),
    }).catch(() => {});
    setBusy(false);
    setSent(true);
  }

  if (sent) return (
    <span className="font-sans text-[10px]" style={{ color: "#888888" }}>Link sent to email</span>
  );

  return (
    <button
      onClick={resend}
      disabled={busy}
      className="font-sans font-bold text-[10px] tracking-[0.15em] uppercase px-4 py-2 transition-all border cursor-pointer hover:brightness-95 disabled:opacity-50"
      style={{ borderColor: "#D4580A", color: "#D4580A" }}
    >
      {busy ? "…" : "Get Link"}
    </button>
  );
}
