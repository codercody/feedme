"use client";

import { ABProvider } from "@/lib/contexts/ab";
import { setACookie, setBCookie } from "./SetAB";
import { TimelineProvider } from "@/lib/contexts/timeline";

export default function RootProvider({
  children,
  initialA,
  initialB,
}: {
  children: React.ReactNode;
  initialA: string | undefined;
  initialB: string | undefined;
}) {
  return (
    <ABProvider
      initialA={initialA}
      initialB={initialB}
      setACookie={setACookie}
      setBCookie={setBCookie}
    >
      <TimelineProvider>{children}</TimelineProvider>
    </ABProvider>
  );
}
