import { fileURLToPath } from "node:url";

export const iconDir = fileURLToPath(new URL("../src/assets/icons", import.meta.url));
