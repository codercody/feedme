"use client";

import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { recommenders, getRecommender, RecommenderT } from "@/lib/recommenders";

type ABState = {
  recommenders: RecommenderT[];
  a: RecommenderT;
  setA: (a: string) => void;
  b: RecommenderT;
  setB: (b: string) => void;
};

export const ABContext = createContext<ABState | null>(null);

export function ABProvider({
  children,
  initialA,
  initialB,
  setACookie,
  setBCookie,
}: {
  children: React.ReactNode;
  initialA: string | undefined;
  initialB: string | undefined;
  setACookie: (a: string) => void;
  setBCookie: (b: string) => void;
}): JSX.Element {
  const [aID, setAID] = useState(initialA);
  const [bID, setBID] = useState(initialB);

  useEffect(() => {
    if (aID) setACookie(aID);
  }, [aID]);
  useEffect(() => {
    if (bID) setBCookie(bID);
  }, [bID]);

  const a = useMemo(
    () => (aID && getRecommender(aID)) || recommenders[0],
    [aID]
  );
  const b = useMemo(
    () => (bID && getRecommender(bID)) || recommenders[1],
    [bID]
  );

  const state: ABState = {
    recommenders,
    a,
    setA: setAID,
    b,
    setB: setBID,
  };

  return <ABContext.Provider value={state}>{children}</ABContext.Provider>;
}

export function useAB(): ABState {
  const context = useContext(ABContext);

  if (!context) throw new Error("useAB must be used within an ABContext");

  return context;
}
