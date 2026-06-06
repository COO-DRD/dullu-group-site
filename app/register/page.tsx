"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy]   = useState(false);
  const { refresh }       = useAuth();
  const router            = useRouter();
  const nameRef           = useRef<HTMLInputElement>(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res  = await fetch("/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Registration failed."); return; }
      await refresh();
      router.push("/onboarding");
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
            Join for free.
          </h1>
          <p className="font-sans font-light text-sm mb-10" style={{ color: "#666666" }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:text-amber" style={{ color: "#1B3D8F" }}>
              Sign in →
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {([
              { label: "Full Name",  type: "text",     val: name,  set: setName,  ref: nameRef, placeholder: "Jane Wanjiru" },
              { label: "Email",      type: "email",    val: email, set: setEmail, ref: null,    placeholder: "you@example.com" },
              { label: "Password",   type: "password", val: pass,  set: setPass,  ref: null,    placeholder: "Min. 8 characters" },
            ] as const).map(({ label, type, val, set, ref, placeholder }) => (
              <div key={label}>
                <label
                  className="block font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                  style={{ color: "#666666" }}
                >
                  {label}
                </label>
                <input
                  ref={ref as React.RefObject<HTMLInputElement> | null}
                  type={type}
                  required
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  className="w-full font-sans text-sm px-4 py-3 border transition-colors"
                  style={{
                    borderColor: "#F0EDE8",
                    color: "#111111",
                    backgroundColor: "#FAFAF8",
                  }}
                />
              </div>
            ))}

            {error && (
              <p className="font-sans text-sm" style={{ color: "#D4580A" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-4 transition-all hover:brightness-110 disabled:opacity-60 cursor-pointer mt-2"
              style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
            >
              {busy ? "Creating account…" : "Create Account →"}
            </button>

            <p className="font-sans text-[10px] text-center" style={{ color: "#AAAAAA" }}>
              By joining you agree to our{" "}
              <Link href="/terms" style={{ color: "#666666" }}>Terms</Link> and{" "}
              <Link href="/privacy" style={{ color: "#666666" }}>Privacy Policy</Link>.
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}
