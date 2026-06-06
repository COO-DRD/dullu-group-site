"use client";

import { useState } from "react";
import Arr from "@/components/Arr";

const WA_NUMBER = "254790117187";
const EMAIL     = "office@dullugroup.co.ke";

type Step = {
  id: string;
  question: string;
  options: { value: string; label: string }[];
  hasOther?: boolean;
};

const STEPS: Step[] = [
  {
    id: "role",
    question: "What best describes you?",
    options: [
      { value: "founder / CEO",          label: "Founder / CEO" },
      { value: "business owner",         label: "Business Owner" },
      { value: "freelancer / consultant", label: "Freelancer / Consultant" },
      { value: "operations manager",     label: "Operations Manager" },
    ],
  },
  {
    id: "pain",
    question: "What's costing you the most time right now?",
    options: [
      { value: "following up with leads and clients",    label: "Lead & client follow-up" },
      { value: "onboarding new clients",                 label: "Client onboarding" },
      { value: "payments, invoices, and reconciliation", label: "Payments & invoicing" },
      { value: "internal reporting and operations",      label: "Reporting & ops" },
    ],
    hasOther: true,
  },
  {
    id: "size",
    question: "How big is your operation?",
    options: [
      { value: "solo",       label: "Just me" },
      { value: "2–10 people",  label: "2–10 people" },
      { value: "11–50 people", label: "11–50 people" },
      { value: "50+ people",   label: "50+ people" },
    ],
  },
  {
    id: "experience",
    question: "Have you tried automation before?",
    options: [
      { value: "starting from scratch — no automation yet",    label: "Starting from scratch" },
      { value: "using some tools, but they're not connected",  label: "Some tools, not connected" },
      { value: "have a system, but it needs fixing",           label: "Have a system, needs work" },
      { value: "mostly automated and want to go further",      label: "Mostly automated already" },
    ],
  },
];

function buildMessage(answers: Record<string, string>): string {
  const { role, pain, size, experience } = answers;
  const team = size === "solo" ? "solo" : `a ${size} team`;
  return (
    `Hi Ian, I'd like to book a discovery call.\n\n` +
    `Quick context: I'm a ${role} running ${team}. ` +
    `My biggest time drain is ${pain}, and I'm ${experience}.\n\n` +
    `Looking forward to seeing what automation could unlock for me.`
  );
}

export default function OfficeOnboarding() {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [other,   setOther]   = useState("");
  const [showOther, setShowOther] = useState(false);
  const done = step >= STEPS.length;

  function choose(value: string) {
    const updated = { ...answers, [STEPS[step].id]: value };
    setAnswers(updated);
    setShowOther(false);
    setOther("");
    setStep(step + 1);
  }

  function confirmOther() {
    if (!other.trim()) return;
    choose(other.trim());
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setOther("");
    setShowOther(false);
  }

  const currentStep = STEPS[step];
  const message     = done ? buildMessage(answers) : "";
  const waHref      = done
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
    : "#";
  const emailHref   = done
    ? `mailto:${EMAIL}?subject=${encodeURIComponent("Discovery Call Request")}&body=${encodeURIComponent(message)}`
    : "#";

  const btnBase =
    "w-full text-left font-sans text-sm font-medium px-5 py-3.5 border transition-all cursor-pointer";
  const btnIdle =
    `${btnBase} hover:border-[#D4580A] hover:text-[#D4580A]`;

  return (
    <div style={{ maxWidth: "34rem" }}>

      {/* Progress dots */}
      {!done && (
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-300"
              style={{
                width:  i === step ? 20 : 6,
                height: 6,
                backgroundColor: i <= step ? "#D4580A" : "#E0DDD8",
              }}
            />
          ))}
        </div>
      )}

      {!done ? (
        <>
          {/* Question */}
          <p
            className="font-sans font-black uppercase tracking-tight leading-tight mb-6"
            style={{ fontSize: "clamp(1.1rem,3vw,1.6rem)", color: "#111111" }}
          >
            {currentStep.question}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {currentStep.options.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => choose(value)}
                className={btnIdle}
                style={{ borderColor: "#E0DDD8", color: "#444444" }}
              >
                {label}
              </button>
            ))}

            {currentStep.hasOther && !showOther && (
              <button
                onClick={() => setShowOther(true)}
                className={btnIdle}
                style={{ borderColor: "#E0DDD8", color: "#AAAAAA" }}
              >
                Something else…
              </button>
            )}

            {currentStep.hasOther && showOther && (
              <div className="flex gap-2 mt-1">
                <input
                  autoFocus
                  type="text"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && confirmOther()}
                  placeholder="Describe it briefly"
                  className="flex-1 font-sans text-sm px-4 py-3 border outline-none focus:border-[#D4580A] transition-colors"
                  style={{ borderColor: "#D4580A", color: "#111111" }}
                />
                <button
                  onClick={confirmOther}
                  className="font-sans font-bold text-[11px] tracking-[0.15em] uppercase px-5 py-3 transition-all hover:brightness-110"
                  style={{ backgroundColor: "#D4580A", color: "#FFFFFF" }}
                >
                  Next <Arr />
                </button>
              </div>
            )}
          </div>

          {/* Back */}
          {step > 0 && (
            <button
              onClick={() => { setStep(step - 1); setShowOther(false); }}
              className="mt-6 font-sans text-[11px] tracking-[0.15em] uppercase transition-colors hover:text-[#D4580A] cursor-pointer"
              style={{ color: "#AAAAAA" }}
            >
              ← Back
            </button>
          )}
        </>
      ) : (
        <>
          {/* Composed message preview */}
          <p
            className="font-sans font-black uppercase tracking-tight leading-tight mb-6"
            style={{ fontSize: "clamp(1.1rem,3vw,1.6rem)", color: "#111111" }}
          >
            Your message is ready.
          </p>

          <div
            className="font-sans text-sm leading-relaxed whitespace-pre-wrap mb-8 px-5 py-4 border-l-4"
            style={{ borderColor: "#D4580A", backgroundColor: "#FAFAF8", color: "#444444" }}
          >
            {message}
          </div>

          <p
            className="font-sans text-xs mb-5 leading-relaxed"
            style={{ color: "#AAAAAA" }}
          >
            Choose how to send it — the message above will be pre-filled.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-9 py-4 transition-all hover:brightness-110 inline-block"
              style={{ backgroundColor: "#25D366", color: "#FFFFFF" }}
            >
              Send on WhatsApp <Arr />
            </a>
            <a
              href={emailHref}
              className="font-sans font-bold text-[11px] tracking-[0.2em] uppercase px-9 py-4 border transition-all hover:bg-black hover:text-white inline-block"
              style={{ borderColor: "#111111", color: "#111111" }}
            >
              Send by Email <Arr />
            </a>
          </div>

          <button
            onClick={reset}
            className="mt-6 block font-sans text-[11px] tracking-[0.15em] uppercase transition-colors hover:text-[#D4580A] cursor-pointer"
            style={{ color: "#AAAAAA" }}
          >
            ← Start over
          </button>
        </>
      )}
    </div>
  );
}
