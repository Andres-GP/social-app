/** @jest-config-loader ts-node */
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/js-with-ts", // TS + JSX
  testEnvironment: "jsdom", // para poder renderizar componentes React
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1", // para tus alias de Next.js
  },
  transformIgnorePatterns: ["/node_modules/(?!(?:@mui/material|@mui/icons-material)/)"],
};
export default config;
