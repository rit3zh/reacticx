import { createContext, useContext } from "react";
import type { IAuraLiftContext } from "./types";

const AuraLiftContext = createContext<IAuraLiftContext | null>(null);

const useAuraLiftContext = <T extends IAuraLiftContext>(): T => {
  const ctx = useContext(AuraLiftContext);
  if (!ctx) {
    throw new Error(
      "useAuraLiftContext must be used within an <AuraLiftProvider>",
    );
  }
  return ctx as T;
};

export { useAuraLiftContext, AuraLiftContext };
