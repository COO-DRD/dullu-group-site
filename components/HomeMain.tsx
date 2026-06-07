"use client";

import dynamic from "next/dynamic";
import Subscribe from "@/components/Subscribe";

const Problem    = dynamic(() => import("@/components/Problem"),    { ssr: false });
const Proof      = dynamic(() => import("@/components/Proof"),      { ssr: false });
const WhatIBuild = dynamic(() => import("@/components/WhatIBuild"), { ssr: false });
const About      = dynamic(() => import("@/components/About"),      { ssr: false });

export default function HomeMain() {
  return (
    <>
      <Problem />
      <Proof />
      <WhatIBuild />
      <Subscribe />
      <About />
    </>
  );
}
