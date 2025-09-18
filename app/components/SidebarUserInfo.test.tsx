import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SidebarUserInfo from "./SidebarUserInfo";
import { signOutUser } from "@/redux/slices/userSlice";

jest.mock("@/firebase", () => ({
  auth: {},
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn().mockResolvedValue(undefined),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("SidebarUserInfo component", () => {
  beforeEach(() => {
    (require("react-redux").useSelector as unknown as jest.Mock).mockImplementation(
      (selectorFn: any) =>
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
    const userDiv = screen.getByText("Test User").parentElement?.parentElement!;
    fireEvent.click(userDiv);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("calls signOut and dispatches signOutUser on menu item click", async () => {
    const { signOut } = require("firebase/auth");
    render(<SidebarUserInfo />);
    const userDiv = screen.getByText("Test User").parentElement?.parentElement!;
    fireEvent.click(userDiv);

    const signOutButton = screen.getByText("Sign Out");
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(signOutUser());
    });
  });
});
