import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import vue from "eslint-plugin-vue";
import md from "eslint-plugin-md";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('packages/tooling/eslint.mjs').Linter.Config[]} */
export default [
  {
    ignores: [
      "node_modules/",
      "dist/",
      ".astro/",
      ".vercel/",
      "pnpm-lock.yaml",
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  // Base configurations
  js.configs.recommended,
  ...compat.config(md.configs.recommended),

  // Markdown files - disable line length rule
  {
    files: ["**/*.md"],
    rules: {
      "md/remark": [
        "error",
        {
          plugins: [["remark-lint-maximum-line-length", false]],
        },
      ],
    },
  },

  // TypeScript files
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      ...tsPlugin.configs["eslint-recommended"].rules,
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // Astro files
  ...astro.configs["flat/recommended"],

  // Vue files
  ...vue.configs["flat/recommended"],

  // Global rules
  {
    rules: {
      "no-console": "error",
      semi: ["error", "never"],
      quotes: ["error", "double"],
    },
  },
];
