import { createFileRoute } from "@tanstack/react-router";
import { SHOWCASE_EXAMPLES } from "../ui/examples/examples.js";
import {
  ConfigProvider,
  ExampleControls,
  ExampleRenderer,
} from "../ui/index.js";

export const Route = createFileRoute("/showcase")({
  component: Showcase,
});

export function Showcase() {
  return (
    <ConfigProvider examples={SHOWCASE_EXAMPLES}>
      <div>
        <ExampleRenderer />
        <ExampleControls
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
          }}
        />
      </div>
    </ConfigProvider>
  );
}
