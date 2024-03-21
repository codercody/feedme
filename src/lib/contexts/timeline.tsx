"use client";

import { createContext, useContext, useState } from "react";

type TimelineState = {
  timelineCursor: Date;
  setTimelineCursor: (date: Date) => void;
};

export const TimelineContext = createContext<TimelineState | null>(null);

export function TimelineProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [timelineCursor, setTimelineCursor] = useState(new Date());

  const state: TimelineState = {
    timelineCursor,
    setTimelineCursor,
  };

  return (
    <TimelineContext.Provider value={state}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline(): TimelineState {
  const context = useContext(TimelineContext);

  if (!context)
    throw new Error("useTimeline must be used within a TimelineContext");

  return context;
}
