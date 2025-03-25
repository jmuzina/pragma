import type {
  CSSProperties,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
} from "react";

/**
 * Props for a react component that renders the controls inside a tooltip and allows changing the example configurations.
 */
export interface ExampleControlsProps {
  id?: string;
  className?: string;
  examples: ShowcaseExample[];
  style?: CSSProperties;
}

export interface UPDATE_ACTION<
  TExampleName extends string,
  TSettingName extends keyof AllExampleSettings,
  TSettings extends AllExampleSettings = AllExampleSettings,
  TValue extends ExampleValue = TSettings[TSettingName] extends ExampleSetting<
    infer V
  >
    ? V
    : ExampleValue,
> {
  type: "UPDATE_SETTING";
  payload: {
    exampleName: TExampleName;
    settingName: TSettingName;
    newValue: TValue;
  };
}

export interface RESET_ACTION<TExampleName extends string> {
  type: "RESET_EXAMPLE";
  payload: { exampleName: TExampleName };
}

export type ExampleAction<TExampleName extends string = string> =
  | {
      [K in keyof AllExampleSettings]: UPDATE_ACTION<TExampleName, K>;
    }[keyof AllExampleSettings]
  | RESET_ACTION<TExampleName>;

/** A valid type for an example setting's value */
export type ExampleValue = number | string;

/**
 * Configuration for an example setting.
 */
export interface ExampleSetting<TValue extends ExampleValue = string> {
  value: TValue;
  default: TValue;
  skipExportFormats?: {
    css?: boolean;
  };
}

/**
 * Configuration for an example that allows selecting a number.
 */
export interface NumericExampleSetting extends ExampleSetting<number> {
  min: number;
  max: number;
  step?: number;
}

/**
 * Configuration for an example that allows selecting one choice.
 */
export interface ChoicesExampleSetting<TValue extends ExampleValue>
  extends ExampleSetting<TValue> {
  choices: TValue[];
}

/**
 * Configuration for an example that allows selecting multiple choices.
 */
export type MultipleChoicesExampleConfiguration<TValue extends ExampleValue> =
  Omit<ChoicesExampleSetting<TValue>, "default" | "value"> & {
    value: TValue;
    default: TValue;
  };

/**
 * Base settings for an example. May be extended to add more settings.
 */
export type AllExampleSettings = {
  fontFamily?: ChoicesExampleSetting<string>;
  fontSize?: NumericExampleSetting;
  color?: ChoicesExampleSetting<string>;
  backgroundColor?: ChoicesExampleSetting<string>;
  lineHeight?: NumericExampleSetting;
  textAlign?: ChoicesExampleSetting<string>;
  padding?: NumericExampleSetting;
  margin?: NumericExampleSetting;
  border?: NumericExampleSetting;
  borderRadius?: NumericExampleSetting;
  boxShadow?: ChoicesExampleSetting<string>;
  textShadow?: ChoicesExampleSetting<string>;
};

export interface ShowcaseExample {
  name: string;
  description: string;
  configurations: AllExampleSettings;
  component: FC;
  cssVars?: Record<string, string | number | undefined>;
}

export type ConfigState = Record<string, ShowcaseExample>;

export interface ConfigProviderProps {
  examples: ShowcaseExample[];
  children: ReactNode;
}

export interface ConfigProviderValue {
  config: ConfigState;
  dispatch: Dispatch<ExampleAction<string>>;
  activeExampleName?: string;
  setActiveExampleName: Dispatch<SetStateAction<string | undefined>>;
  activeExampleConfig?: ShowcaseExample;
}
