import { createContext, useContext } from "react";
import type { ISiriContext } from "./types";

const SiriContext = createContext<ISiriContext | null>(null);

const useSiri = <T extends ISiriContext>(): T => {
  const ctx = useContext<ISiriContext | null>(SiriContext);
  if (!ctx) throw new Error("useSiri must be used within a <SiriProvider>");
  return ctx as T satisfies ISiriContext;
};

export { SiriContext, useSiri };
