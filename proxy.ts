import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED = ["/dashboard", "/onboarding"];
const AUTH_ONLY = ["/login", "/register"];

function getSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET ?? "");
}

async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;
  const authed = await isValidSession(token);

  if (PROTECTED.some((p) => pathname.startsWith(p)) && !authed) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, request.url));
  }

  if (AUTH_ONLY.some((p) => pathname.startsWith(p)) && authed) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/login", "/register"],
};
