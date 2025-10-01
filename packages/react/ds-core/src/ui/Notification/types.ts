/* @canonical/generator-ds 0.10.0-experimental.4 */

import type { ModifierFamily } from "@canonical/ds-types";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

/**
 * An action that is presented to the user in a notification.
 * This is functionally a limited subset of ButtonProps, used to map over an array of actions and create Buttons.
 * @todo Maybe it should be more strongly linked to the {@link ButtonProps} type.
 */
export type NotificationAction = {
  label: string;
  onClick: () => void;
};

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  /** Child elements */
  children?: ReactNode;
  /**
   * A list of up to two actions that the notification can perform.
   */
  actions?: (NotificationAction | ReactNode)[];
  /**
   * Whether the notification should not have a border.
   */
  borderless?: boolean;
  /**
   * Whether the title should display inline with the message.
   * @TODO this prop is not semantic and should be revisited in PR review
   */
  inline?: boolean;
  /**
   * The function to run when dismissing/closing the notification.
   */
  onDismiss?: () => void;
  /**
   * The severity of the notification.
   */
  severity?: ModifierFamily<"severity">;
  /**
   * The amount of time (in ms) until the notification is automatically dismissed.
   */
  timeout?: number;
  /**
   * A relevant timestamp for the notification, e.g. when it was created.
   */
  timestamp?: ReactNode;
  /**
   * The title of the notification.
   */
  titleContent?: ReactNode;
  /**
   * Optional element or component to use for the title. Wraps the `titleContent`.
   * @default "h5"
   */
  as?: ElementType;
}
