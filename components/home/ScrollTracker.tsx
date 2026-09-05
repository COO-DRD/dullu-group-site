"use client";

import { useEffect, useLayoutEffect } from "react";
import { track } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

export default function ScrollTracker() {
  // Mark the page as JS-capable before first paint so reveals start hidden
  // only when motion is actually available (no-JS/noscript stays fully visible).
  useLayoutEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useEffect(() => {
    const fired = new Set<number>();
    let rafId: number | null = null;

    function check() {
      rafId = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const depth = Math.min(100, Math.round((window.scrollY / max) * 100));
      for (const t of THRESHOLDS) {
        if (depth >= t && !fired.has(t)) {
          fired.add(t);
          track("scroll_depth", { depth: t });
        }
      }
    }

    function onScroll() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(check);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}