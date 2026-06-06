"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Arr from "@/components/Arr";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MemberFeed from "@/components/members/MemberFeed";
import DownloadsSection from "@/components/members/DownloadsSection";

const quick = [
  { label: "Shop",         sub: "Browse playbooks",            href: "/shop",                            ext: false },
  { label: "Dullu Digital", sub: "Done-for-you automation",   href: "https://digital.dullugroup.co.ke", ext: true  },
  { label: "4unter",       sub: "Lead intelligence tool",      href: "https://4unter.dullugroup.co.ke",  ext: true  },
  { label: "Book a Call",  sub: "Talk to Dr. Dullu directly",  href: "/office",                          ext: false },
];

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router                    = useRouter();
  const headerRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("visible"), 80);
  }, []);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFFFFF" }}>
        <div
          className="w-6 h-6 border-2 rounded-full animate-spin"
          style={{ borderColor: "#F0EDE8", borderTopColor: "#D4580A" }}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16" style={{ backgroundColor: "#FFFFFF" }}>

        {/* Header */}
        <div
          ref={headerRef}
          className="reveal border-b px-6 py-16"
          style={{ borderColor: "#F0EDE8" }}
        >
          <div className="max-w-6xl mx-auto">
            <p
              className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-4"
              style={{ color: "#1B3D8F" }}
            >
              Dashboard
            </p>
            <h1
              className="font-cinematic font-semibold leading-tight mb-2"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)", color: "#111111" }}
            >
              Welcome back,{" "}
              <span style={{ color: "#D4580A" }}>{user.name.split(" ")[0]}.</span>
            </h1>
            <p className="font-sans font-light text-sm" style={{ color: "#888888" }}>
              {user.email}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

          {/* Downloads */}
          <section>
            <p
              className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-8"
              style={{ color: "#D4580A" }}
            >
              Your Downloads
            </p>
            <DownloadsSection />
          </section>

          {/* Member feed */}
          <section>
            <MemberFeed />
          </section>

          {/* Quick links */}
          <section>
            <p
              className="font-sans text-[10px] font-semibold tracking-[0.28em] uppercase mb-8"
              style={{ color: "#1B3D8F" }}
            >
              Quick Access
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
              style={{ backgroundColor: "#F0EDE8" }}
            >
              {quick.map(({ label, sub, href, ext }) => (
                <a
                  key={label}
                  href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  className="p-6 group transition-colors"
                  style={{ backgroundColor: "#FFFFFF" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFF8F4")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
                >
                  <div
                    className="w-5 h-px mb-4 transition-all group-hover:w-10"
                    style={{ backgroundColor: "#D4580A" }}
                  />
                  <p className="font-sans font-bold text-sm mb-1" style={{ color: "#111111" }}>{label}</p>
                  <p className="font-sans font-light text-xs" style={{ color: "#888888" }}>{sub}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Sign out */}
          <div>
            <button
              onClick={() => { logout(); router.push("/"); }}
              className="font-sans text-xs font-medium transition-colors cursor-pointer hover:text-amber"
              style={{ color: "#AAAAAA" }}
            >
              Sign out of this account
            </button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
