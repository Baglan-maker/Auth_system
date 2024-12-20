import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-alert": "error", // Запрещает alert
      "semi": ["error", "always"], // Требует точку с запятой
      "eqeqeq": "error", // Требует строгого сравнения
      "no-unused-vars": ["error", { "vars": "all", "args": "none" }], // Запрещает неиспользуемые переменные
      "@typescript-eslint/no-unused-vars": ["error"], // Для TypeScript
      "no-console": ["warn", { "allow": ["warn", "error"] }], 
    },
  },
];