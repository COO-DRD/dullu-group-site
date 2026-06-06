// In-memory sliding window rate limiter.
// Fluid Compute keeps function instances alive across requests — this provides
// meaningful per-IP brute-force protection without external dependencies.

interface Entry { count: number; resetAt: number }

const store = new Map<string, Entry>();

export function rateLimit(
  key: string,
  max: number,
  windowMs = 60_000,
): { ok: boolean } {
  const now = Date.now();
  let entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { ok: true };
  }

  entry.count += 1;

  // Lazy eviction: trim entries that have expired
  if (store.size > 10_000) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  return { ok: entry.count <= max };
}

export function getIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}
