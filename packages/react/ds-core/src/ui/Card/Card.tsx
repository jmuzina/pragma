/* @canonical/generator-ds 0.10.0-experimental.2 */

import type React from "react";
import { useId, useMemo } from "react";
import { Image, Inner } from "./common/index.js";
import type { CardProps } from "./types.js";
import "./styles.css";
import Thumbnail from "./common/Thumbnail/Thumbnail.js";

const componentCssClassName = "ds card";

/**
 * Card component
 * @returns {React.ReactElement} - Rendered Card
 * @implements syntax:core:component:card:1.0.0
 */
const Card = ({
  className,
  children,
  emphasis,
  thumbnailProps,
  titleContents,
  ...props
}: CardProps): React.ReactElement => {
  const generatedId = useId();
  const titleId = useMemo(
    () => props.id || generatedId,
    [props.id, generatedId],
  );

  return (
    // biome-ignore lint/a11y/useSemanticElements: TODO figure out what to do with this warning
    <div
      aria-labelledby={titleId}
      className={[componentCssClassName, className, emphasis]
        .filter(Boolean)
        .join(" ")}
      role="group"
      {...props}
    >
      {thumbnailProps && (
        <div className="card-preamble">
          <Thumbnail {...thumbnailProps} />
        </div>
      )}
      {titleContents && (
        <h3 className="title" id={titleId}>
          {titleContents}
        </h3>
      )}
      <div className="content">{children}</div>
    </div>
  );
};

Card.Inner = Inner;
Card.Image = Image;

export default Card;
