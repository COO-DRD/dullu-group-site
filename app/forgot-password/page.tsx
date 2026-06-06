"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [sent, setSent]     = useState(false);
  const [busy, setBusy]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await fetch("/api/auth/forgot-password", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email: email.trim() }),
    }).catch(() => {});
    setSent(true);
    setBusy(false);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center px-6 pt-16" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="w-full max-w-sm mx-auto">
          <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
            DR.DULLU — Account
          </p>

          {sent ? (
            <>
              <h1 className="font-cinematic font-semibold leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#111111" }}>
                Check your inbox.
              </h1>
              <p className="font-sans font-light text-sm leading-relaxed mb-8" style={{ color: "#666666" }}>
                If that email is registered, a reset link is on its way. It expires in 1 hour.
              </p>
              <Link
                href="/login"
                className="font-sans text-sm font-medium hover:underline"
                style={{ color: "#D4580A" }}
              >
                Back to sign in
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-cinematic font-semibold leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#111111" }}>
                Forgot your password?
              </h1>
              <p className="font-sans font-light text-sm leading-relaxed mb-8" style={{ color: "#666666" }}>
                Enter your email and we'll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#888888" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full font-sans text-sm px-4 py-3 border focus:outline-none"
                    style={{ borderColor: "#F0EDE8", color: "#111111", backgroundColor: "#FAFAF8" }}
                    onFocus={(e)  => (e.currentTarget.style.borderColor = "rgba(212,88,10,0.5)")}
                    onBlur={(e)   => (e.currentTarget.style.borderColor = "#F0EDE8")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-4 transition-all hover:brightness-110 cursor-pointer disabled:opacity-60"
                  style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
                >
                  {busy ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
              <p className="font-sans text-xs mt-6" style={{ color: "#AAAAAA" }}>
                Remember it?{" "}
                <Link href="/login" className="hover:underline" style={{ color: "#D4580A" }}>
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
