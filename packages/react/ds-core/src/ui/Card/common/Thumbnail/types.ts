/* @canonical/generator-ds 0.10.0-experimental.2 */

import type { ImgHTMLAttributes } from "react";
import type { SectionProps } from "../Section/index.js";

export interface ThumbnailProps extends Omit<SectionProps, "children"> {
  imageProps: ImgHTMLAttributes<HTMLImageElement>;
}
