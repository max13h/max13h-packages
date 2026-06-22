import * as prettierPluginAstro from "prettier-plugin-astro";
import prettierPluginVue from "prettier-plugin-vue";

export default {
  plugins: [prettierPluginAstro, prettierPluginVue],
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  overrides: [
    { files: "*.astro", options: { parser: "astro" } },
    { files: "*.vue", options: { parser: "vue" } },
  ],
};
