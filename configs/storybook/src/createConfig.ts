import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig as SvelteViteStorybookConfig } from "@storybook/svelte-vite";
import type { StorybookConfig } from "storybook/internal/types";

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

function getAddonPath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/manager`)));
}

type StorybookFrameworkConfig = {
  framework: string;
  addons: StorybookConfig["addons"];
};

const frameworks = {
  react: {
    framework: getAbsolutePath("@storybook/react-vite"),
    addons: [],
  },
  svelte: {
    framework: getAbsolutePath("@storybook/svelte-vite"),
    addons: [getAbsolutePath("@storybook/addon-svelte-csf")],
  },
  lit: {
    framework: getAbsolutePath("@storybook/web-components-vite"),
    addons: [],
  },
} as const satisfies Record<string, StorybookFrameworkConfig>;

const COMPONENT_COMMENT = /<!--\s*@component\b([\s\S]*?)-->/;
const DOCGEN_ASSIGNMENT = /;([A-Za-z_$][\w$]*)\.__docgen = \{/g;

function dedent(text: string): string {
  const lines = text.split("\n");
  const indent = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => line.length - line.trimStart().length),
  );
  if (!Number.isFinite(indent)) return "";
  return lines
    .map((line) => line.slice(indent))
    .join("\n")
    .trim();
}

/**
 * Storybook's Svelte docgen (`@storybook/svelte-vite`) only extracts prop
 * docs; it never populates `__docgen.description`, which is where the Svelte
 * renderer's `extractComponentDescription` looks for the component
 * description shown on autodocs pages. As a result the standard
 * `<!-- @component ... -->` documentation comment is dropped. This plugin
 * runs after Storybook's docgen and injects the `@component` comment body
 * into `__docgen.description`, matching how react-docgen surfaces the JSDoc
 * above a React component.
 */
function svelteComponentDescriptionPlugin() {
  return {
    name: "canonical:svelte-docgen-component-description",
    transform(code: string, id: string) {
      if (
        id.startsWith("\0") ||
        !id.endsWith(".svelte") ||
        id.includes("node_modules")
      ) {
        return;
      }
      const componentName = [...code.matchAll(DOCGEN_ASSIGNMENT)].at(-1)?.[1];
      if (!componentName) return;
      const comment = readFileSync(id, "utf8").match(COMPONENT_COMMENT);
      const description = comment ? dedent(comment[1]) : "";
      if (!description) return;
      // Appending does not shift existing code, so the upstream sourcemap
      // remains valid and `map: null` is correct.
      return {
        code: `${code}\n;${componentName}.__docgen.description = ${JSON.stringify(description)};`,
        map: null,
      };
    },
  };
}

const svelteViteFinal: SvelteViteStorybookConfig["viteFinal"] = async (
  config,
) => ({
  ...config,
  plugins: [...(config.plugins ?? []), svelteComponentDescriptionPlugin()],
});

type CreateConfigOptions = {
  staticDirs?: string[];
  extraAddons?: string[];
  disabledAddons?: string[];
  projectName?: string;
  projectLogo?: string;
  refs?: StorybookConfig["refs"];
};

function createConfig<T extends keyof typeof frameworks>(
  framework: T,
  options?: CreateConfigOptions,
): StorybookConfig & Pick<SvelteViteStorybookConfig, "viteFinal"> {
  const opts = options ?? {};
  return {
    stories: [
      "../src/**/*.mdx",
      "../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)",
    ],
    addons: [
      getAbsolutePath("@chromatic-com/storybook"),
      getAbsolutePath("@storybook/addon-docs"),
      getAbsolutePath("@storybook/addon-a11y"),
      getAbsolutePath("@storybook/addon-vitest"),
      getAddonPath("@canonical/storybook-addon-utils"),
      getAddonPath("@canonical/storybook-addon-shell-theme"),
      ...frameworks[framework].addons,
      ...(opts.extraAddons ?? []),
    ].filter((addon) => !opts.disabledAddons?.includes(addon)),
    framework: {
      name: frameworks[framework].framework,
      options: {},
    },
    // Establish the full-height chain in the preview iframe so components with
    // `height: 100%` (e.g. application layouts, SideNavigation) resolve against
    // a real height. Storybook does not set this by default.
    previewHead: (head) =>
      `${head}\n<style>html, body, #storybook-root, #root-inner, #root { height: 100%; }</style>`,
    core: {
      disableTelemetry: true,
    },
    typescript: {
      check: true,
    },
    staticDirs: [
      ...(opts.staticDirs ?? []),
      getAbsolutePath("@canonical/ds-assets"),
    ],
    env: {
      PROJECT_NAME: opts.projectName ?? "",
      PROJECT_LOGO: opts.projectLogo ?? "",
    },
    ...(opts.refs ? { refs: opts.refs } : {}),
    ...(framework === "svelte" ? { viteFinal: svelteViteFinal } : {}),
  };
}

export default createConfig;
