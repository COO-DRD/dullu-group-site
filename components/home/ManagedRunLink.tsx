"use client";

import type { CSSProperties } from "react";
import { track } from "@/lib/analytics";

interface Props {
  location: "nav" | "work" | "qualify";
  label: string;
  className?: string;
  style?: CSSProperties;
}

export default function ManagedRunLink({ location, label, className, style }: Props) {
  return (
    <a
      href="https://digital.dullugroup.co.ke"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={() => track("managed_run_click", { location })}
    >
      {label}
    </a>
  );
}