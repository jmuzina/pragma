import React, {
  createContext,
  useState,
  useContext,
  useReducer,
  useMemo,
  type FC,
} from "react";
import type {
  BaseExampleSettings,
  ConfigProviderProps,
  ConfigProviderValue,
  ConfigState,
  ExampleAction,
  ShowcaseExample,
} from "./types.js";

import { casing } from "@canonical/utils";

const ConfigContext = <
  TSettings extends BaseExampleSettings = BaseExampleSettings,
  TExample extends ShowcaseExample<TSettings> = ShowcaseExample<TSettings>,
>() =>
  createContext<ConfigProviderValue<TSettings, TExample> | undefined>(
    undefined,
  );

const generateCssVariables = (
  configurations: BaseExampleSettings,
): Record<string, string | number | undefined> => {
  return Object.fromEntries(
    Object.entries(configurations)
      .filter(([_, setting]) => setting?.skipExportFormats?.css)
      .map(([key, setting]) => [
        `--${casing.toKebabCase(key)}`,
        setting?.value ?? "",
      ]),
  );
};

const configReducer = <
  TSettings extends BaseExampleSettings = BaseExampleSettings,
  TExample extends ShowcaseExample<TSettings> = ShowcaseExample<TSettings>,
>(
  state: ConfigState<TSettings, TExample>,
  action: ExampleAction<TSettings, TExample>,
): ConfigState<TSettings, TExample> => {
  switch (action.type) {
    case "UPDATE_SETTING": {
      const { exampleName, settingName, newValue } = action.payload;
      const example = state[exampleName];

      if (!example) return state;

      const updatedConfigurations = {
        ...example.configurations,
        [settingName]: {
          ...example.configurations[settingName],
          value: newValue,
        },
      };

      return {
        ...state,
        [exampleName]: {
          ...example,
          configurations: updatedConfigurations,
          cssVars: generateCssVariables(updatedConfigurations),
        },
      };
    }
    case "RESET_EXAMPLE": {
      const { exampleName } = action.payload;
      const example = state[exampleName];

      if (!example) return state;

      const resetConfigurations = Object.fromEntries(
        Object.entries(example.configurations).map(([key, setting]) => [
          key,
          "default" in setting && setting.default !== undefined
            ? { ...setting, value: setting.default }
            : setting,
        ]),
      ) as TSettings;

      return {
        ...state,
        [exampleName]: {
          ...example,
          configurations: resetConfigurations,
          cssVars: generateCssVariables(resetConfigurations),
        },
      };
    }
    default:
      return state;
  }
};

export const ConfigProvider = <
  TSettings extends BaseExampleSettings = BaseExampleSettings,
  TExample extends ShowcaseExample<TSettings> = ShowcaseExample<TSettings>,
>({
  examples,
  children,
}: ConfigProviderProps<TSettings>) => {
  const initialState: ConfigState<TSettings, TExample> = Object.fromEntries(
    Object.entries(examples),
  ) as ConfigState<TSettings, TExample>;

  const [config, dispatch] = useReducer(configReducer, initialState);
  const [activeExampleName, setActiveExampleName] = useState<
    string | undefined
  >(Object.keys(examples)[0] ?? undefined);

  const activeExampleConfig = useMemo(
    () =>
      activeExampleName && activeExampleName in config
        ? config[activeExampleName as keyof ConfigState<TSettings, TExample>]
        : undefined,
    [config, activeExampleName],
  );

  const value = useMemo<ConfigProviderValue<TSettings, TExample>>(
    () => ({
      config,
      dispatch,
      activeExampleName,
      setActiveExampleName,
      activeExampleConfig,
    }),
    [config, activeExampleName, activeExampleConfig],
  );

  const Ctx = ConfigContext<TSettings, TExample>();

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useConfig = <
  TSettings extends BaseExampleSettings = BaseExampleSettings,
  TExample extends ShowcaseExample<TSettings> = ShowcaseExample<TSettings>,
>(): ConfigProviderValue<TSettings, TExample> => {
  const context = useContext(ConfigContext<TSettings, TExample>());
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context as ConfigProviderValue<TSettings, TExample>;
};
