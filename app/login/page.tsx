"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [error, setError]   = useState("");
  const [busy, setBusy]     = useState(false);
  const { refresh }         = useAuth();
  const router              = useRouter();
  const params              = useSearchParams();
  const emailRef            = useRef<HTMLInputElement>(null);

  useEffect(() => { emailRef.current?.focus(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed."); return; }
      await refresh();
      router.push(params.get("next") ?? "/dashboard");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="flex-1 flex flex-col justify-center px-6 py-20">
        <div className="w-full max-w-md mx-auto">

          <Link
            href="/"
            className="font-cinematic font-semibold tracking-[0.18em] uppercase block mb-12"
            style={{ fontSize: "1.5rem", color: "#D4580A" }}
          >
            DR.DULLU
          </Link>

          <h1
            className="font-sans font-black text-3xl uppercase tracking-tight mb-2"
            style={{ color: "#111111" }}
          >
            Welcome back.
          </h1>
          <p className="font-sans font-light text-sm mb-10" style={{ color: "#666666" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium hover:text-amber" style={{ color: "#1B3D8F" }}>
              Join free →
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                className="block font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                style={{ color: "#666666" }}
              >
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full font-sans text-sm px-4 py-3 border transition-colors"
                style={{
                  borderColor: "#F0EDE8",
                  color: "#111111",
                  backgroundColor: "#FAFAF8",
                }}
              />
            </div>

            <div>
              <label
                className="block font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                style={{ color: "#666666" }}
              >
                Password
              </label>
              <input
                type="password"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full font-sans text-sm px-4 py-3 border transition-colors"
                style={{
                  borderColor: "#F0EDE8",
                  color: "#111111",
                  backgroundColor: "#FAFAF8",
                }}
              />
            </div>

            {error && (
              <p className="font-sans text-sm" style={{ color: "#D4580A" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-4 transition-all hover:brightness-110 disabled:opacity-60 cursor-pointer mt-2"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
            >
              {busy ? "Signing in…" : "Sign In →"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
