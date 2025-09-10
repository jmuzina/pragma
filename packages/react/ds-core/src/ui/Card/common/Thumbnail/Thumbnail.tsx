/* @canonical/generator-ds 0.10.0-experimental.2 */

import type React from "react";
import type { ThumbnailProps } from "./types.js";
import "./styles.css";

const componentCssClassName = "card-thumbnail";

/**
 * Thumbnail component for Card thumbnails
 * todo the thumbnail is only ever used inside the preamble area, maybe this should be moved to the preamble subcomponent?
 */
const Thumbnail = ({
  className,
  alt,
  ...props
}: ThumbnailProps): React.ReactElement => {
  return (
    <img
      className={[componentCssClassName, className].filter(Boolean).join(" ")}
      alt={alt}
      {...props}
    />
  );
};

export default Thumbnail;
