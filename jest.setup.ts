import "@testing-library/jest-dom";

// Mock de next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
  useFormatter: () => (val: any) => val,
}));

// Mock de next/image compatible con Jest
jest.mock("next/image", () => {
  const React = require("react"); // <- Importar React dentro del factory
  return {
    __esModule: true,
    default: (props: any) => React.createElement("img", props),
  };
});
