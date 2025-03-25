import React, {
  createContext,
  useState,
  useContext,
  useReducer,
  type FC,
  useMemo,
} from "react";
import type {
  AllExampleSettings,
  ConfigProviderProps,
  ConfigProviderValue,
  ConfigState,
  ExampleAction,
  ExampleSetting,
  ShowcaseExample,
} from "./types.js";

import { casing } from "@canonical/utils";

const ConfigContext = createContext<ConfigProviderValue | undefined>(undefined);

const generateCssVariables = (
  configurations: AllExampleSettings,
): Record<string, string | number | undefined> => {
  const cssVars: Record<string, string | number | undefined> = {};
  for (const settingName in configurations) {
    const setting = configurations[
      settingName as keyof AllExampleSettings
    ] as ExampleSetting;
    if (!setting?.skipExportFormats?.css && setting.value !== undefined) {
      const cssVarName = `--${casing.toKebabCase(settingName)}`;
      cssVars[cssVarName] = setting.value;
    }
  }
  return cssVars;
};

const configReducer = (
  state: ConfigState,
  action: ExampleAction,
): ConfigState => {
  if (!action) return {};
  switch (action.type) {
    case "UPDATE_SETTING": {
      const { exampleName, settingName, newValue } = action.payload;
      const updatedState = {
        ...state,
        [exampleName]: {
          ...state[exampleName],
          configurations: {
            ...state[exampleName]?.configurations,
            [settingName]: {
              ...state[exampleName]?.configurations?.[settingName],
              value: newValue,
            },
          },
        },
      };
      return {
        ...updatedState,
        [exampleName]: {
          ...updatedState[exampleName],
          cssVars: generateCssVariables(
            updatedState[exampleName].configurations,
          ),
        },
      };
    }
    case "RESET_EXAMPLE": {
      const { exampleName } = action.payload;
      const { [exampleName]: exampleToReset, ...restOfState } = state;
      if (exampleToReset) {
        for (const key in exampleToReset.configurations) {
          const setting =
            exampleToReset.configurations[key as keyof AllExampleSettings];
          if (setting) {
            setting.value = setting.default;
          }
        }
        const resetExample: ShowcaseExample = {
          ...exampleToReset,
          configurations: exampleToReset.configurations,
          cssVars: generateCssVariables(exampleToReset.configurations),
        };
        return {
          ...restOfState,
          [exampleName]: resetExample,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export const ConfigProvider: FC<ConfigProviderProps> = ({
  examples,
  children,
}) => {
  const initialState: ConfigState = examples.reduce(
    (acc: ConfigState, example) => {
      acc[example.name] = example;
      return acc;
    },
    {},
  );

  const [config, dispatch] = useReducer(configReducer, initialState);
  const [activeExampleName, setActiveExampleName] = useState<
    string | undefined
  >(examples?.length ? examples[0].name : undefined);

  const activeExampleConfig = useMemo(
    () => (activeExampleName ? config[activeExampleName] : undefined),
    [config, activeExampleName],
  );

  const value: ConfigProviderValue = useMemo(
    () => ({
      config,
      dispatch,
      activeExampleName,
      setActiveExampleName,
      activeExampleConfig,
      allExamples: examples,
    }),
    [config, activeExampleName, activeExampleConfig, examples],
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigProviderValue => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
