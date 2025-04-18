import type { CSSProperties, ReactNode } from "react";

export interface RendererProps {
  style?: CSSProperties;
  className?: string;
}

export interface UseRendererResult {
  exampleComponentContent: ReactNode;
}
