/* @canonical/generator-ds 0.10.0-experimental.4 */

import type React from "react";
import type { NotificationProps } from "./types.js";
import "./styles.css";

const componentCssClassName = "ds notification";

/**
 * description of the Notification component
 * @returns {React.ReactElement} - Rendered Notification
 */
const Notification = ({
  className,
  children,
  severity,
  actions = [],
  as: TitleComponent = "h5",
  titleContent,
  timestamp,
  timeout,
  onDismiss,
  inline = false,
  ...props
}: NotificationProps): React.ReactElement => {
  return (
    <div
      className={[componentCssClassName, className, severity].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
};

export default Notification;
