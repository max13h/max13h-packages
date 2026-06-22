import { defineConfig } from "tsup";
import { baseConfig } from "@max13h/tooling/tsup";

export default defineConfig({
  ...baseConfig,
  entry: ["src/utils.ts"],
  dts: true,
  external: ["@max13h/i18n"],
});
