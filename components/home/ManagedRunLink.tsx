"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { track } from "@/lib/analytics";

interface Props {
  location: "nav" | "work" | "qualify";
  label: string;
  className?: string;
  style?: CSSProperties;
}

export default function ManagedRunLink({ location, label, className, style }: Props) {
  const [hover, setHover] = useState(false);

  const clean = label.replace(/[→↗]\s*$/, "").trim();

  return (
    <a
      href="https://digital.dullugroup.co.ke"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      title="The only link that leaves this page. Everything else keeps you here."
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={() => track("managed_run_click", { location })}
    >
      <span>{clean}</span>
      <span
        aria-hidden
        className="inline-block"
        style={{
          marginLeft: "0.55em",
          display: "inline-block",
          transform: hover ? "translate(2px,-2px)" : "none",
          transition: "transform 160ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        {hover ? "↗" : "→"}
      </span>
    </a>
  );
}