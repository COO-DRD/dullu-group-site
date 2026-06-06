"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ResetPasswordForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const token        = searchParams.get("token") ?? "";

  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [busy, setBusy]           = useState(false);
  const [done, setDone]           = useState(false);
  const [error, setError]         = useState("");

  useEffect(() => {
    if (!token) setError("This reset link is invalid. Request a new one.");
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/reset-password", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ token, password }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Reset failed. Try again.");
      } else {
        setDone(true);
        setTimeout(() => router.push("/login"), 2500);
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setBusy(false);
    }
  }

  const inputCls   = "w-full font-sans text-sm px-4 py-3 border focus:outline-none";
  const inputStyle = { borderColor: "#F0EDE8", color: "#111111", backgroundColor: "#FAFAF8" };

  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
        DR.DULLU — Account
      </p>

      {done ? (
        <>
          <h1 className="font-cinematic font-semibold leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#111111" }}>
            Password updated.
          </h1>
          <p className="font-sans font-light text-sm" style={{ color: "#666666" }}>
            Taking you to sign in…
          </p>
        </>
      ) : (
        <>
          <h1 className="font-cinematic font-semibold leading-tight mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)", color: "#111111" }}>
            Set a new password.
          </h1>
          <p className="font-sans font-light text-sm leading-relaxed mb-8" style={{ color: "#666666" }}>
            Must be at least 8 characters.
          </p>

          {error && (
            <div className="mb-6 px-4 py-3 border-l-2" style={{ borderColor: "#D4580A", backgroundColor: "#FFF8F4" }}>
              <p className="font-sans text-sm" style={{ color: "#D4580A" }}>{error}</p>
              {(error.includes("invalid") || error.includes("expired")) && (
                <Link href="/forgot-password" className="font-sans text-xs font-semibold hover:underline mt-1 block" style={{ color: "#D4580A" }}>
                  Request a new link →
                </Link>
              )}
            </div>
          )}

          {!error.includes("invalid") && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "New Password",      val: password, set: setPassword, placeholder: "Min. 8 characters" },
                { label: "Confirm Password",  val: confirm,  set: setConfirm,  placeholder: "Same as above" },
              ].map(({ label, val, set, placeholder }) => (
                <div key={label}>
                  <label className="block font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#888888" }}>
                    {label}
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    className={inputCls}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,88,10,0.5)")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = "#F0EDE8")}
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={busy || !token}
                className="w-full font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-4 transition-all hover:brightness-110 cursor-pointer disabled:opacity-60"
                style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
              >
                {busy ? "Updating…" : "Update Password"}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center px-6 pt-16" style={{ backgroundColor: "#FFFFFF" }}>
        <Suspense fallback={<div />}>
          <ResetPasswordForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
