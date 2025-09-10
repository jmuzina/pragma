/* @canonical/generator-ds 0.10.0-experimental.2 */

import type React from "react";
import type { HeaderProps } from "./types.js";
import "./styles.css";

const componentCssClassName = "ds card-header";

/**
 * Header component for Card
 * @returns {React.ReactElement} - Rendered Header
 */
const Header = ({
  children,
  className,
  ...props
}: HeaderProps): React.ReactElement => {
  return (
    <header
      className={[componentCssClassName, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </header>
  );
};

export default Header;
