import type { StoryFn } from "@storybook/react-vite";
import { Children } from "react";

export const borderedChildren = () => (Story: StoryFn) => {
  const storyOutput = <Story />;
  console.log({ storyOutput });
  const childrenToMap = Children.toArray(storyOutput);

  return (
    <div>
      {childrenToMap.map((child, idx) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: this is for demonstrative documentation purposes
          key={idx}
          style={{
            borderBottom:
              "var(--spacing-border-width) solid var(--tmp-color-border-default)",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
