"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Arr from "@/components/Arr";

const STEPS = [
  {
    question: "What describes you best?",
    key:      "persona" as const,
    options:  [
      { value: "sme",       label: "SME Owner",       sub: "Running a business, want to grow it" },
      { value: "corporate", label: "Corporate Pro",    sub: "Inside a company, building systems" },
      { value: "freelance", label: "Freelancer",       sub: "Solo, selling skills and services" },
      { value: "explorer",  label: "Just Exploring",   sub: "Curious, not sure what I need yet" },
    ],
  },
  {
    question: "What's your #1 pain right now?",
    key:      "pain_point" as const,
    options:  [
      { value: "leads",    label: "Getting Leads",        sub: "Pipeline is dry or inconsistent" },
      { value: "followup", label: "Following Up",         sub: "Losing deals because of slow response" },
      { value: "admin",    label: "Admin & Operations",   sub: "Too much manual, repetitive work" },
      { value: "content",  label: "Content & Marketing",  sub: "Not showing up where clients look" },
    ],
  },
];

type Answers = { persona: string; pain_point: string };

export default function OnboardingPage() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Answers>({ persona: "", pain_point: "" });
  const [phone, setPhone]     = useState("");
  const [busy, setBusy]       = useState(false);
  const { refresh }           = useAuth();
  const router                = useRouter();

  const isWaStep  = step === STEPS.length;
  const totalSteps = STEPS.length + 1;
  const current   = !isWaStep ? STEPS[step] : null;

  function pick(key: keyof Answers, value: string) {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 220);
    } else {
      // Move to WA step
      setTimeout(() => setStep(STEPS.length), 220);
    }
  }

  async function finish(skipPhone = false) {
    setBusy(true);
    await fetch("/api/auth/onboard", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({
        ...answers,
        ...((!skipPhone && phone.trim()) ? { phone: phone.trim() } : {}),
      }),
    }).catch(() => {});
    await refresh();
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="flex-1 flex flex-col justify-center px-6 py-20">
        <div className="w-full max-w-xl mx-auto">

          {/* Step indicators */}
          <div className="flex gap-2 mb-16">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className="h-0.5 flex-1 transition-all duration-500"
                style={{ backgroundColor: i <= step ? "#D4580A" : "#F0EDE8" }}
              />
            ))}
          </div>

          <p className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: "#1B3D8F" }}>
            Step {step + 1} of {totalSteps}
          </p>

          {!isWaStep && current && !busy && (
            <>
              <h1
                className="font-cinematic font-semibold leading-tight mb-12"
                style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#111111" }}
              >
                {current.question}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.options.map(({ value, label, sub }) => {
                  const selected = answers[current.key] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => pick(current.key, value)}
                      className="text-left p-6 border-2 transition-all cursor-pointer"
                      style={{
                        borderColor:     selected ? "#D4580A" : "#F0EDE8",
                        backgroundColor: selected ? "#FFF8F4" : "#FFFFFF",
                      }}
                      onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = "#D4580A"; }}
                      onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = "#F0EDE8"; }}
                    >
                      <p className="font-sans font-bold text-sm uppercase tracking-wide mb-1" style={{ color: selected ? "#D4580A" : "#111111" }}>
                        {label}
                      </p>
                      <p className="font-sans font-light text-xs" style={{ color: "#888888" }}>{sub}</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {isWaStep && !busy && (
            <>
              <h1
                className="font-cinematic font-semibold leading-tight mb-4"
                style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#111111" }}
              >
                Get notified on WhatsApp?
              </h1>
              <p className="font-sans font-light text-sm mb-6" style={{ color: "#666666", maxWidth: "32rem" }}>
                When a new workshop drops or an event goes live, I&apos;ll ping you on WhatsApp.
                No spam — only new content notifications.
              </p>
              <p className="font-sans text-[10px] mb-8 leading-relaxed" style={{ color: "#AAAAAA", maxWidth: "28rem" }}>
                By providing your number you consent to receive WhatsApp notifications from DR.DULLU.
                Reply STOP at any time to opt out.
              </p>
              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="block font-sans text-[10px] font-semibold tracking-[0.18em] uppercase mb-2" style={{ color: "#888888" }}>
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XX XXX XXX"
                    className="w-full font-sans text-sm px-4 py-3 border focus:outline-none"
                    style={{ borderColor: "#F0EDE8", color: "#111111", backgroundColor: "#FAFAF8" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,88,10,0.5)")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = "#F0EDE8")}
                    onKeyDown={(e) => { if (e.key === "Enter") finish(); }}
                  />
                </div>
                <button
                  onClick={() => finish()}
                  className="w-full font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-4 transition-all hover:brightness-110 cursor-pointer inline-flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
                >
                  Go to Dashboard <Arr />
                </button>
                <button
                  onClick={() => finish(true)}
                  className="w-full font-sans text-xs cursor-pointer transition-colors hover:underline"
                  style={{ color: "#AAAAAA" }}
                >
                  Skip — I'll add it later
                </button>
              </div>
            </>
          )}

          {busy && (
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }} />
              <p className="font-sans text-sm" style={{ color: "#666666" }}>Setting up your dashboard…</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
