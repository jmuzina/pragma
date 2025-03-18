import { useEffect, useMemo, useState } from "react";
import type { UseSsrResult } from "./types.js";

const isDOMDefined =
  typeof window !== "undefined" && !!window.document?.createElement;

/**
 * Determines if the current environment is the server or the client
 */
const useSsr = (): UseSsrResult => {
  const [isServer, setIsServer] = useState(!isDOMDefined);

  // Update the state on mount
  useEffect(() => {
    setIsServer(!isDOMDefined);
  }, []);

  return useMemo(() => ({ isServer }), [isServer]);
};

export default useSsr;
