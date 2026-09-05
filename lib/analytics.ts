export type TrackProps = Record<string, string | number | boolean>;

/**
 * Fire a conversion/analytics event. Client-side only.
 * Behind the scenes events POST to /api/track, which records them into the
 * Supabase `site_events` table (see TODO in that route for the DDL).
 * Never throws and never blocks the UI.
 */
export function track(name: string, props?: TrackProps): void {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      name,
      props: props ?? {},
      url: window.location.href,
      ts: new Date().toISOString(),
    };
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      navigator.sendBeacon("/api/track", blob);
      return;
    }
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* tracking must never break the page */
  }
}