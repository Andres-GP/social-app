/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogInModal from "../app/[locale]/components/modals/LogInModal";
import { useSelector } from "react-redux";
import { openLogInModal, closeLogInModal } from "@/redux/slices/modalSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

jest.mock("@/firebase");
jest.mock("firebase/auth");

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

const mockedUseSelector = useSelector as unknown as jest.Mock;
const mockedSignIn = signInWithEmailAndPassword as jest.Mock;

describe("LogInModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("opens modal when 'Log In' button is clicked", () => {
    mockedUseSelector.mockReturnValue(false);

    render(<LogInModal />);

    const openButton = screen.getByText("log_in");
    fireEvent.click(openButton);

    expect(mockDispatch).toHaveBeenCalledWith(openLogInModal());
  });

  it("renders modal when isOpen is true", () => {
    mockedUseSelector.mockReturnValue(true);

    render(<LogInModal />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("log_in!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    mockedUseSelector.mockReturnValue(true);

    render(<LogInModal />);

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith(closeLogInModal());
  });

  it("toggles password visibility", () => {
    mockedUseSelector.mockReturnValue(true);

    render(<LogInModal />);

    const toggleButton = screen.getByLabelText("Show password");
    const passwordInput = screen.getByPlaceholderText("password") as HTMLInputElement;

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);

    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
    expect(passwordInput.type).toBe("text");
  });

  it("calls signInWithEmailAndPassword with guest credentials", async () => {
    mockedUseSelector.mockReturnValue(true);
    mockedSignIn.mockResolvedValue({});

    render(<LogInModal />);

    const guestButton = screen.getByText("log_in_as_guest");
    await fireEvent.click(guestButton);

    expect(mockedSignIn).toHaveBeenCalledWith(auth, "guest@guest.com", "1234567890");
    expect(mockDispatch).toHaveBeenCalledWith(closeLogInModal());
  });
});
