/* @canonical/generator-ds 0.10.0-experimental.2 */

import type { ModifierFamily } from "@canonical/ds-types";
import type { HTMLAttributes } from "react";

/**
 * @migration 1.0.0 - `overlay` is no longer supported
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The ID of a title element. This is used to associate the title with the card.
   */
  titleId?: string;
  /**
   * TODO we need to verify with DS ontology group whether it is expected that a component consume ALL of a modifier family
   *  Card in vanilla does not currently support the "muted" or "accented" emphasis modifiers.
   */
  emphasis?: ModifierFamily<"emphasis">;

  /**
   * @migration 1.0.0 - support for the "content bleed" card has been removed for now to keep the component simpler. It may be added back if requested.
   */

  /**
   * @migration 1.0.0 - the Card previously accepted `title` and `thumbnail` as props. These have been removed in favor of a more flexible composition model.
   * Now, you can use the `Card.Header` and `Card.Thumbnail` sub-components to achieve the same functionality with greater flexibility in layout.
   */

  /**
   * TODO make the card consume the Grid when Grid is implemented
   */
}
