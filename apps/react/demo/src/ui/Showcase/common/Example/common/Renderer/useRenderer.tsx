import { useEffect, useMemo, useState } from "react";
import root from "react-shadow";
import { useShowcaseContext } from "../../hooks/index.js";
import shadowCss from "./shadow-styles.css?inline";
import type { UseRendererResult } from "./types.js";

const useRenderer = (): UseRendererResult => {
  const [isClientMounted, setIsClientMounted] = useState(false);

  const { activeExample, demoOutput, activeExampleFormValues } =
    useShowcaseContext();

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  /** The component & associated styling to be rendered. */
  const componentContent = useMemo(
    () => (
      <>
        <style>{shadowCss}</style>
        <div className="ds shadow-container">
          {activeExample.Component?.({ activeExampleFormValues })}
        </div>
      </>
    ),
    [activeExample, activeExampleFormValues],
  );

  const exampleComponentContent = useMemo(() => {
    // On server & initial client render: Use the string 'div'.
    // After client mount: Embed the component in the shadow DOM.
    // We use a `HostComponent` to avoid needing to duplicate the props passed to the component.
    const HostComponent = isClientMounted ? root.div : "div";

    const hostProps = {
      style: demoOutput.css,
      // Conditionally add props specific to the Shadow DOM component
      ...(isClientMounted && { mode: "closed" as const }),
    };

    return <HostComponent {...hostProps}>{componentContent}</HostComponent>;
  }, [isClientMounted, demoOutput, componentContent]);

  return useMemo(
    () => ({ exampleComponentContent }),
    [exampleComponentContent],
  );
};

export default useRenderer;
