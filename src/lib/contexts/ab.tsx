"use client";

import { createContext, useContext } from "react";
import { RecommenderT } from "../types/recommender";
import { recommenders } from "../recommenders";

type ABState = {
  recommenders: RecommenderT[];
  a: RecommenderT;
  setA: (a: string) => void;
  b: RecommenderT;
  setB: (b: string) => void;
};

export const ABContext = createContext<ABState>({
  recommenders,
  a: recommenders[0],
  setA: (a: string) => {},
  b: recommenders[1],
  setB: (b: string) => {},
});

export function ABProvider({
  value,
  children,
}: {
  value: ABState;
  children: React.ReactNode;
}): JSX.Element {
  return <ABContext.Provider value={value}>{children}</ABContext.Provider>;
}

export function useAB() {
  return useContext(ABContext);
}
