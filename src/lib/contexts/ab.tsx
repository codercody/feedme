"use client";

import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { RecommenderT } from "../types/recommender";
import { recommenders } from "../recommenders";

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
