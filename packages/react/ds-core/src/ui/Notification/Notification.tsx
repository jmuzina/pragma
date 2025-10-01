import React, { useEffect, useMemo, useRef } from "react";
import type { NotificationAction, NotificationProps } from "./types.js";
import "./styles.css";
import type { IconName } from "@canonical/ds-assets";
import Icon from "../Icon/Icon.js";

const componentCssClassName = "ds notification";

const Notification = ({
  actions,
  borderless = false,
  children,
  className,
  inline = false,
  onDismiss,
  severity = "information",
  timeout,
  timestamp,
  title,
  titleElement: TitleComponent = "h5",
  ...props
}: NotificationProps): React.ReactElement => {
  const timeoutId = useRef<number | null>(null);
  const hasActions = actions?.length > 0;
  const showMeta = !!timestamp || hasActions;

  const iconName: IconName = useMemo(() => {
    switch (severity) {
      case "positive":
        return "success";
      case "negative":
        return "error";
      case "caution":
        return "warning";
      default:
        return severity;
    }
  }, [severity]);

  useEffect(() => {
    if (timeout && onDismiss) {
      timeoutId.current = window.setTimeout(() => onDismiss(), timeout);
    }
    return () => {
      if (timeoutId.current) window.clearTimeout(timeoutId.current);
    };
  }, [onDismiss, timeout]);

  return (
    <div
      className={[
        componentCssClassName,
        severity,
        borderless && "borderless",
        inline && "inline",
        severity !== "neutral" && "has-icon",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="content">
        <div className="header">
          {severity !== "neutral" && <Icon icon={iconName} className="icon" />}
          <div className="text">
            {title && <TitleComponent className="title">{title}</TitleComponent>}
            {!title && <span className="message">{children}</span>}
            {title && <p className="message">{children}</p>}
          </div>
        </div>
      </div>
      {showMeta && (
        <div className="meta">
          {timestamp && <span className="timestamp">{timestamp}</span>}
          {hasActions && (
            <div className="actions">
              {actions?.map((action, i) =>
                React.isValidElement(action) ? (
                  action
                ) : (
                  <button
                    type="button"
                    className="action"
                    key={`${(action as NotificationAction).label}-${i}`}
                    onClick={(action as NotificationAction).onClick}
                  >
                    {(action as NotificationAction).label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      )}
      {onDismiss && (
        <Icon
          icon={"close"}
          role="button"
          type="button"
          className="close"
          onClick={onDismiss}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onDismiss();
            }
          }}
          tabIndex={0}
          aria-label="Close notification"
        ></Icon>
      )}
    </div>
  );
};

export default Notification;
