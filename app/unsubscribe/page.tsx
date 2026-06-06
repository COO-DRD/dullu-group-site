"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function UnsubscribeContent() {
  const searchParams           = useSearchParams();
  const token                  = searchParams.get("token") ?? "";
  const [status, setStatus]    = useState<"loading" | "done" | "error">("loading");
  const [message, setMessage]  = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid unsubscribe link.");
      return;
    }
    fetch("/api/auth/unsubscribe", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((d: { ok?: boolean; error?: string }) => {
        if (d.ok) {
          setStatus("done");
        } else {
          setStatus("error");
          setMessage(d.error ?? "Something went wrong.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Network error. Try again.");
      });
  }, [token]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
        DR.DULLU — Email Preferences
      </p>

      {status === "loading" && (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
          <p className="font-sans text-sm" style={{ color: "#666666" }}>Processing…</p>
        </div>
      )}

      {status === "done" && (
        <>
          <h1 className="font-cinematic font-semibold leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#111111" }}>
            You're unsubscribed.
          </h1>
          <p className="font-sans font-light text-sm leading-relaxed mb-8" style={{ color: "#666666" }}>
            You won't receive the weekly digest anymore. Your account and downloads are unaffected.
          </p>
          <Link
            href="/dashboard"
            className="font-sans text-sm font-medium hover:underline"
            style={{ color: "#D4580A" }}
          >
            Go to dashboard
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="font-cinematic font-semibold leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#111111" }}>
            That didn't work.
          </h1>
          <p className="font-sans font-light text-sm leading-relaxed mb-6" style={{ color: "#666666" }}>
            {message}
          </p>
          <Link
            href="mailto:hello@dullugroup.co.ke"
            className="font-sans text-sm font-medium hover:underline"
            style={{ color: "#D4580A" }}
          >
            Contact us to unsubscribe manually
          </Link>
        </>
      )}
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center px-6 pt-16" style={{ backgroundColor: "#FFFFFF" }}>
        <Suspense fallback={<div />}>
          <UnsubscribeContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
