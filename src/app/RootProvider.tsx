"use client";

import { useEffect, useMemo, useState } from "react";
import { ABProvider } from "@/lib/contexts/ab";
import { recommenders } from "@/lib/recommenders";
import { setACookie, setBCookie } from "./SetAB";

export default function RootProvider({
  children,
  initialA,
  initialB,
}: {
  children: React.ReactNode;
  initialA: string | undefined;
  initialB: string | undefined;
}) {
  const [aID, setAID] = useState(initialA);
  const [bID, setBID] = useState(initialB);

  useEffect(() => {
    if (aID) setACookie(aID);
  }, [aID]);
  useEffect(() => {
    if (bID) setBCookie(bID);
  }, [bID]);

  const a = useMemo(
    () =>
      recommenders.find((recommender) => recommender.id === aID) ||
      recommenders[0],
    [aID]
  );
  const b = useMemo(
    () =>
      recommenders.find((recommender) => recommender.id === bID) ||
      recommenders[1],
    [bID]
  );

  return (
    <ABProvider
      value={{
        recommenders,
        a,
        setA: setAID,
        b,
        setB: setBID,
      }}
    >
      {children}
    </ABProvider>
  );
}
