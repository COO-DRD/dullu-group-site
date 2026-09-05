"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

export type SubscribeSource = "hero" | "midpage" | "footer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  source: SubscribeSource;
  /** unique suffix for the input id — three forms share the page */
  id: string;
  /** optional microcopy rendered under the field */
  microcopy?: string;
  /** event names come from the source, but the block may differ */
  label?: string;
}

export default function SubscribeForm({ source, id, microcopy, label = "Subscribe free" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const inputId = `subscribe-email-${id}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setErrorMsg(
        value.length === 0 ? "Enter your email address." : "That doesn't look like an email address."
      );
      formRef.current?.querySelector("input")?.focus();
      return;
    }

    setStatus("busy");
    setErrorMsg("");
    track(`${source}_subscribe_submit`);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error ?? "Could not subscribe. Try again.");
        return;
      }
      track("subscribe_success", { source });
      setStatus("done");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  }

  return (
    <div style={{ minHeight: 84 }}>
      {status === "done" ? (
        <div
          className="flex items-center gap-3"
          role="status"
          aria-live="polite"
          style={{ minHeight: 56 }}
        >
          <span
            aria-hidden
            className="flex items-center justify-center font-bold"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#D4580A",
              color: "#FFFFFF",
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            ✓
          </span>
          <p className="font-sans text-sm font-medium" style={{ color: "#111111" }}>
            You&apos;re in. Check your inbox for the confirmation.
          </p>
        </div>
      ) : (
        <>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            action="/api/subscribe"
            method="post"
            className="flex flex-col gap-0 sm:flex-row max-w-xl"
          >
            <input type="hidden" name="source" value={source} />
            <input
              id={inputId}
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="your@email.com"
              aria-label="Email address"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? `${inputId}-error` : undefined}
              className="flex-1 font-sans text-sm px-5 py-4 min-w-0"
              style={{
                minHeight: 56,
                backgroundColor: "#FFFFFF",
                border: `1px solid ${status === "error" ? "#B5341C" : "#111111"}`,
                borderRightWidth: 0,
                color: "#111111",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#D4580A")}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = status === "error" ? "#B5341C" : "#111111")
              }
            />
            <button
              type="submit"
              disabled={status === "busy"}
              className="cursor-pointer shrink-0 font-sans font-bold text-sm px-7 tracking-normal"
              style={{
                minHeight: 56,
                backgroundColor: "#D4580A",
                color: "#FFFFFF",
                border: "1px solid #D4580A",
                transition: "filter 140ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
            >
              {status === "busy" ? "…" : label}
            </button>
          </form>
          <p
            className={`font-sans text-xs mt-2 ${status === "error" ? "" : ""}`}
            style={
              status === "error"
                ? { color: "#B5341C", marginBottom: 0 }
                : microcopy
                ? { color: "#666666" }
                : { display: "none", color: "#666666" }
            }
            id={status === "error" ? `${inputId}-error` : undefined}
            role={status === "error" ? "alert" : undefined}
          >
            {status === "error" ? errorMsg : microcopy}
          </p>
        </>
      )}
    </div>
  );
}