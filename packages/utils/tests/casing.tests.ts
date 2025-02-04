import { describe, expect, it } from "vitest";
import { toKebabCase, toCamelCase, toPascalCase } from "../src/casing";

describe("toKebabCase", () => {
  it("should convert a PascalCase string to kebab-case", () => {
    expect(toKebabCase("MyComponent")).toBe("my-component");
  });

  it("should convert a camelCase string to kebab-case", () => {
    expect(toKebabCase("myComponent")).toBe("my-component");
  });

  it("should handle multiple capital letters", () => {
    expect(toKebabCase("ThisIsATest")).toBe("this-is-a-test");
  });

  it("should handle already kebab-case strings", () => {
    expect(toKebabCase("already-kebab")).toBe("already-kebab");
  });

  it("should handle mixed case with numbers", () => {
    expect(toKebabCase("Version2Update")).toBe("version2-update");
  });

  it("should handle trailing and leading spaces", () => {
    expect(toKebabCase("  TrimMe  ")).toBe("trim-me");
  });

  it("should handle single words", () => {
    expect(toKebabCase("word")).toBe("word");
  });

  it("should handle empty strings", () => {
    expect(toKebabCase("")).toBe("");
  });

  it("should handle special characters without affecting them", () => {
    expect(toKebabCase("Hello@World")).toBe("hello@-world");
  });

  it("should handle strings with underscores", () => {
    expect(toKebabCase("snake_case_example")).toBe("snake_case_example");
  });

  it("should handle non-alphanumeric characters correctly", () => {
    expect(toKebabCase("Hello!World")).toBe("hello!-world");
  });

  it("should handle numbers properly", () => {
    expect(toKebabCase("Item123Name")).toBe("item123-name");
  });

  it("should return an empty string for non-string inputs", () => {
    expect(toKebabCase(null as unknown as string)).toBe("");
    expect(toKebabCase(undefined as unknown as string)).toBe("");
  });
});

describe('toCamelCase', () => {
  it('should handle kebab-case', () => {
    expect(toCamelCase('my-component')).toBe('myComponent');
    expect(toCamelCase('another-kebab-case')).toBe('anotherKebabCase');
  });

  it('should handle snake_case', () => {
    expect(toCamelCase('my_variable')).toBe('myVariable');
    expect(toCamelCase('long_snake_case')).toBe('longSnakeCase');
  });

  it('should handle space-separated strings', () => {
    expect(toCamelCase('my example string')).toBe('myExampleString');
    expect(toCamelCase('multiple words here')).toBe('multipleWordsHere');
  });

  it('should handle mixed case with hyphens and underscores', () => {
    expect(toCamelCase('Mixed-Case_Input')).toBe('mixedCaseInput');
    expect(toCamelCase('Another-Mix_Of-Cases')).toBe('anotherMixOfCases');
  });

  it('should handle strings with numbers', () => {
    expect(toCamelCase('item-123')).toBe('item123');
    expect(toCamelCase('version-2-0')).toBe('version20');
  });

  it('should handle empty strings', () => {
    expect(toCamelCase('')).toBe('');
  });

  it('should handle strings with leading/trailing spaces', () => {
    expect(toCamelCase('  my-component  ')).toBe('myComponent');
    expect(toCamelCase('  another_test  ')).toBe('anotherTest');
  });

  it('should handle strings with consecutive hyphens/underscores', () => {
    expect(toCamelCase('consecutive--hyphens')).toBe('consecutiveHyphens');
    expect(toCamelCase('consecutive__underscores')).toBe('consecutiveUnderscores');
    expect(toCamelCase('mixed--__--cases')).toBe('mixedCases');
  });

  it('should handle strings with special characters (should be preserved)', () => {
    expect(toCamelCase('my-component@123')).toBe('myComponent@123');
    expect(toCamelCase('special-chars_!@#$')).toBe('specialChars!@#$');
  });

  it('should handle strings that are already camelCase (should not change)', () => {
    expect(toCamelCase('alreadyCamelCase')).toBe('alreadyCamelCase');
  });

  it('should handle strings with consecutive capitals', () => {
    expect(toCamelCase('MyHTTPRequest')).toBe('myHttpRequest');
  });

  it('should return an empty string for non-string inputs', () => {
    expect(toCamelCase(null as unknown as string)).toBe('');
    expect(toCamelCase(undefined as unknown as string)).toBe('');
  });
});

describe('toPascalCase', () => {
  it('should handle kebab-case', () => {
    expect(toPascalCase('my-component')).toBe('MyComponent');
    expect(toPascalCase('another-kebab-case')).toBe('AnotherKebabCase');
  });

  it('should handle snake_case', () => {
    expect(toPascalCase('my_variable')).toBe('MyVariable');
    expect(toPascalCase('long_snake_case')).toBe('LongSnakeCase');
  });

  it('should handle space-separated strings', () => {
    expect(toPascalCase('my example string')).toBe('MyExampleString');
    expect(toPascalCase('multiple words here')).toBe('MultipleWordsHere');
  });

  it('should handle mixed case with hyphens and underscores', () => {
    expect(toPascalCase('Mixed-Case_Input')).toBe('MixedCaseInput');
    expect(toPascalCase('Another-Mix_Of-Cases')).toBe('AnotherMixOfCases');
  });

  it('should handle strings with numbers', () => {
    expect(toPascalCase('item-123')).toBe('Item123');
    expect(toPascalCase('version-2-0')).toBe('Version20');
  });

  it('should handle empty strings', () => {
    expect(toPascalCase('')).toBe('');
  });

  it('should handle strings with leading/trailing spaces', () => {
    expect(toPascalCase('  my-component  ')).toBe('MyComponent');
    expect(toPascalCase('  another_test  ')).toBe('AnotherTest');
  });

  it('should handle strings with consecutive hyphens/underscores', () => {
    expect(toPascalCase('consecutive--hyphens')).toBe('ConsecutiveHyphens');
    expect(toPascalCase('consecutive__underscores')).toBe('ConsecutiveUnderscores');
    expect(toPascalCase('mixed--__--cases')).toBe('MixedCases');
  });

  it('should handle strings with special characters (should be preserved)', () => {
    expect(toPascalCase('my-component@123')).toBe('MyComponent@123');
    expect(toPascalCase('special-chars_!@#$')).toBe('SpecialChars!@#$');
  });

  it('should handle strings that are already PascalCase (should not change)', () => {
    expect(toPascalCase('AlreadyPascalCase')).toBe('AlreadyPascalCase');
  });

  it('should handle already camelCase', () => {
    expect(toPascalCase('alreadyCamelCase')).toBe('AlreadyCamelCase');
  });

  it('should handle single words', () => {
    expect(toPascalCase('word')).toBe('Word');
    expect(toPascalCase('Word')).toBe('Word'); // Already PascalCase
  });

  it('should handle strings with consecutive capitals', () => {
    expect(toPascalCase('MyHTTPRequest')).toBe('MyHttpRequest');
    expect(toPascalCase('HTMLDocument')).toBe('HtmlDocument');
  });

  it('should handle edge cases', () => {
    expect(toPascalCase('-leading-hyphen')).toBe('LeadingHyphen');
    expect(toPascalCase('_leading_underscore')).toBe('LeadingUnderscore');
    expect(toPascalCase(' trailing-space ')).toBe('TrailingSpace');
    expect(toPascalCase('  ')).toBe(''); // Just spaces
  });
});
