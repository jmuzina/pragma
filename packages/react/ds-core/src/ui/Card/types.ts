/* @canonical/generator-ds 0.10.0-experimental.2 */

import type { ModifierFamily } from "@canonical/ds-types";
import type { HTMLAttributes, ReactNode } from "react";
import type { ThumbnailProps } from "./common/Thumbnail/index.js";

/**
 * @migration 1.0.0 - `overlay` is no longer supported
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * TODO we need to verify with DS ontology group whether it is expected that a component consume ALL of a modifier family
   *  Card in vanilla does not currently support the "muted" or "accented" emphasis modifiers.
   */
  emphasis?: ModifierFamily<"emphasis">;
  /**
   * An optional thumbnail image to display in the card.
   * @migration 1.0.0 - `thumbnail` is now `thumbnailOptions`, a set of HTML attributes, rather than a URL string, to allow more flexibility in how the image is rendered.
   */
  thumbnailProps?: ThumbnailProps;
  /**
   * The title of the card.
   * @migration 1.0.0 - Uses `titleContents` instead of `title` from React Components, to allow the `title` prop to be used as a native HTML attribute.
   */
  titleContents?: ReactNode;
}
