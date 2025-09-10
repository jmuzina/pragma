/* @canonical/generator-ds 0.10.0-experimental.2 */

import type { HTMLAttributes, ReactNode } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /* Required child contents */
  children: ReactNode;
  /* Additional CSS classes */
  className?: string;

  /**
   * Whether to display a border at the bottom of the section.
   * @default true
   */
  isBordered?: boolean;
}
