import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SidebarUserInfo from "../app/[locale]/components/SidebarUserInfo";

import { signOutUser } from "@/redux/slices/userSlice";
// --- Mocks ---
jest.mock("@/firebase", () => ({ auth: {} }));
jest.mock("firebase/auth", () => ({ signOut: jest.fn().mockResolvedValue(undefined) }));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key === "sign_out") return "Sign Out";
    return key;
  },
}));

// usePathname siempre retorna un string válido
const mockedUsePathname = jest.fn(() => "/en/dashboard");
jest.mock("next/navigation", () => ({
  usePathname: () => mockedUsePathname(),
}));

// mock de LocaleSwitch
jest.mock("../app/[locale]/components/LocaleSwitch", () => ({
  __esModule: true,
  default: ({ locale }: any) => <div data-testid="locale-switch">{locale}</div>,
}));

// --- Tests ---
describe("SidebarUserInfo component", () => {
  beforeEach(() => {
    (require("react-redux").useSelector as jest.Mock).mockImplementation((selectorFn: any) =>
      selectorFn({
        user: { name: "Test User", username: "testuser" },
      })
    );
    mockDispatch.mockClear();
  });

  it("renders user name and username", () => {
    render(<SidebarUserInfo />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("@testuser")).toBeInTheDocument();
  });

  it("opens menu on click", () => {
    render(<SidebarUserInfo />);
    const userDiv = screen.getByText("Test User").closest("div")!;
    fireEvent.click(userDiv);

    // verificamos que LocaleSwitch esté en el menú
    expect(screen.getByTestId("locale-switch")).toBeInTheDocument();
  });

  it("calls signOut and dispatches signOutUser on menu item click", async () => {
    const { signOut } = require("firebase/auth");
    render(<SidebarUserInfo />);
    const userDiv = screen.getByText("Test User").closest("div")!;
    fireEvent.click(userDiv);

    const signOutButton = screen.getByText("Sign Out");
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(signOutUser());
    });
  });
});
