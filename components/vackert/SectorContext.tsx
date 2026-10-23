"use client";

import { createContext, useContext, useState } from "react";

// Lets a sector card pre-select that sector in the contact form
// (wrapped in an object so picking the same sector twice still re-applies it)
type Selection = { sector: string } | null;

const SectorContext = createContext<{
  selection: Selection;
  select: (sector: string) => void;
}>({ selection: null, select: () => {} });

export function SectorProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<Selection>(null);
  return (
    <SectorContext.Provider value={{ selection, select: (sector) => setSelection({ sector }) }}>
      {children}
    </SectorContext.Provider>
  );
}

export const useSector = () => useContext(SectorContext);
