## 0.8.1-experimental.0
- [feat]: Added the `paths` utility module for working with file paths.
- [fix]: Fixed some cases where the casing utility functions returned incorrect values for some inputs.

## 0.7.1-experimental.0
- [chore]: Added explicit `exports` to `package.json` for better compatibility with `@canonical/generator-ds` at runtime. This prevents errors where Yeoman cannot resolve the import of the utils package.