import { useShowcaseContext } from "../../hooks/index.js";
import type { RendererProps } from "./types.js";
import "./styles.css";
import useRenderer from "./useRenderer.js";

const componentCssClassname = "ds example-renderer";

const Renderer = ({ style, className }: RendererProps) => {
  const { showBaselineGrid } = useShowcaseContext();

  const { exampleComponentContent } = useRenderer();

  return (
    <div
      style={style}
      className={[componentCssClassname, className].filter(Boolean).join(" ")}
    >
      <div
        className={[
          "rendered-component-container",
          // Adds a pseudoelement to this wrapping div that shows the baseline grid.
          // It's important this be on the wrapping div so that the baseline scrolls with the renderer, and we
          // don't modify the positioning styles of the example component itself.
          showBaselineGrid && "with-baseline-grid",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {exampleComponentContent}
      </div>
    </div>
  );
};

export default Renderer;
