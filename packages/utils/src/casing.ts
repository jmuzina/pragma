/**
 * Convert a string to PascalCase
 * @param s - The string to convert
 * @returns The PascalCase string
 * @example
 * toPascalCase("my-component") // "MyComponent"
 */
export const toPascalCase = (s: string): string => {
  if (!s) return "";

  return toCamelCase(s).replace(/^[a-z]/, (c) => c.toUpperCase());
};

/**
 * Convert a string to kebab-case
 * @param s - The string to convert
 * @returns The kebab-case string
 * @example
 * toKebabCase("MyComponent") // "my-component"
 */
export const toKebabCase = (s: string): string => {
  if (!s) return "";

  return s
    .trim()
    .replace(/([A-Z])/g, "-$1") // Add hyphen before all uppercase letters
    .replace(/^-/, "") // Remove leading hyphen
    .toLowerCase();
};

/**
 * Convert a string to camelCase
 * @param s - The string to convert
 * @returns The camelCase string
 * @example
 * toCamelCase("my-component") // "myComponent"
 */
export const toCamelCase = (s: string): string => {
  if (!s) return "";

  return (
    s
      .trim()
      // In ranges of repeated uppercase letters, only capitalize the first and last ones. Lowercase the letters in between.
      .replace(/([A-Z])([A-Z]+)/g, (_, first: string, rest: string) => {
        const firstChar = first.toUpperCase();
        const lastChar = rest.charAt(rest.length - 1).toUpperCase();
        const intermediateChars = rest.slice(0, rest.length - 1).toLowerCase();
        return `${firstChar}${intermediateChars}${lastChar}`;
      })
      .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase()) // Capitalize after separators
      .replace(/^./, (c) => c.toLowerCase())
  );
};

export default {
  toPascalCase,
  toKebabCase,
  toCamelCase,
};
