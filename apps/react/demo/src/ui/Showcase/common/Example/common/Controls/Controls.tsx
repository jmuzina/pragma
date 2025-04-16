import { useState } from "react";
import type { ReactElement } from "react";
import type { ControlsProps } from "./types.js";
import "./styles.css";
import { Button, TooltipArea } from "@canonical/react-ds-core";
import { Field } from "@canonical/react-ds-core-form";
import { Drawer } from "ui/Drawer/index.js";
import { useShowcaseContext } from "../../hooks/index.js";

const componentCssClassname = "ds example-controls";

const Controls = ({ id, className, style }: ControlsProps): ReactElement => {
  const {
    activeExample,
    demoOutput,
    activatePrevExample,
    activateNextExample,
    copyOutput,
    resetActiveExample,
  } = useShowcaseContext();

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div
        id={id}
        className={[componentCssClassname, className].filter(Boolean).join(" ")}
        style={style}
      >
        <div className="start">
          {/*TODO use icon buttons when icon is implemented*/}
          <Button label="<" type="button" onClick={activatePrevExample} />
          <Button label=">" type="button" onClick={activateNextExample} />
          <span id="active-example-name" style={{ color: "white" }}>
            {activeExample.name}&nbsp;
            <TooltipArea
              Message={<span>{activeExample.description}</span>}
              messageElementClassName="example-description"
              maxWidth={"275px"}
            >
              {/*TODO replace this with an information icon when icon is implemented*/}
              <i>(i)</i>
            </TooltipArea>
          </span>
        </div>
        <div className="end">
          <Field
            id="baseline-toggler"
            inputType="checkbox"
            name="showBaselineGrid"
            label="Baseline grid"
            isOptional={true}
          />
          <Button
            label="Settings"
            type="button"
            onClick={() => setSettingsOpen(true)}
          />
          <Button
            type="button"
            label="Copy CSS"
            disabled={!demoOutput?.css}
            onClick={() => copyOutput("css")}
          />
        </div>
      </div>
      <Drawer
        title={`${activeExample.name} settings`}
        isOpenOverride={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        contentsClassName="inputs-drawer-contents"
      >
        <Button
          label={"Reset to defaults"}
          type={"button"}
          onClick={resetActiveExample}
        />

        {activeExample.fieldCategories.map((category) => (
          <div className="setting-category" key={category.label}>
            <h4>{category.label}</h4>
            <div className="inputs">
              {category.fields.map(
                ({
                  name,
                  defaultValue,
                  demoTransformer,
                  exportTransformer,
                  disabledOutputFormats,
                  ...fieldProps
                }) => (
                  <Field
                    name={name}
                    key={name}
                    unregisterOnUnmount={false}
                    {...fieldProps}
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </Drawer>
    </>
  );
};

export default Controls;
