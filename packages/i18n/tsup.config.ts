import { defineConfig } from "tsup";
import { baseConfig } from "@max13h/tooling/tsup";

export default defineConfig({
  ...baseConfig,
  entry: ["src/index.ts"],
  dts: { resolve: true },
  tsconfig: "tsconfig.json",
});
