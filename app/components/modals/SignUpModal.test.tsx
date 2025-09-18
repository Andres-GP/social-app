/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, within, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpModal from "./SignUpModal";
import { openSignUpModal, closeSignUpModal } from "@/redux/slices/modalSlice";
import { signInUser } from "@/redux/slices/userSlice";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";

jest.mock("@/firebase");
jest.mock("firebase/auth");

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.spyOn(require("react-redux"), "useSelector");
const mockedCreateUser = createUserWithEmailAndPassword as jest.Mock;
const mockedUpdateProfile = updateProfile as jest.Mock;
const mockedSignIn = signInWithEmailAndPassword as jest.Mock;
const mockedOnAuthStateChanged = onAuthStateChanged as jest.Mock;

describe("SignUpModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("opens the modal when Sign Up button is clicked", () => {
    mockedUseSelector.mockReturnValue(false);
    render(<SignUpModal />);
    const openButton = screen.getByText("Sign Up", { selector: "button" });
    fireEvent.click(openButton);
    expect(mockDispatch).toHaveBeenCalledWith(openSignUpModal());
  });

  it("renders modal when isOpen is true", () => {
    mockedUseSelector.mockReturnValue(true);
    render(<SignUpModal />);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByPlaceholderText("Name")).toBeInTheDocument();
    expect(within(modal).getByPlaceholderText("Email")).toBeInTheDocument();
    expect(within(modal).getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    mockedUseSelector.mockReturnValue(true);
    render(<SignUpModal />);
    const closeButton = screen.getByLabelText("Close sign up form");
    fireEvent.click(closeButton);
    expect(mockDispatch).toHaveBeenCalledWith(closeSignUpModal());
  });

  it("toggles password visibility", () => {
    mockedUseSelector.mockReturnValue(true);
    render(<SignUpModal />);
    const toggleButton = screen.getByLabelText("Toggle password visibility");
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText("Toggle password visibility")).toBeInTheDocument();
  });

  it("creates a new user and dispatches signInUser", async () => {
    mockedUseSelector.mockReturnValue(true);
    mockedCreateUser.mockResolvedValue({
      user: { displayName: "Test User", email: "test@test.com", uid: "123" },
    });
    mockedUpdateProfile.mockResolvedValue({});

    render(<SignUpModal />);
    const modal = screen.getByRole("dialog");

    fireEvent.change(within(modal).getByPlaceholderText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(within(modal).getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(within(modal).getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    const signUpButton = within(modal).getByText("Sign Up", { selector: "button" });
    await act(async () => fireEvent.click(signUpButton));

    expect(mockedCreateUser).toHaveBeenCalledWith(auth, "test@test.com", "123456");
    expect(mockedUpdateProfile).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(
      signInUser({
        name: "Test User",
        username: "test",
        email: "test@test.com",
        uid: "123",
      })
    );
    expect(mockDispatch).toHaveBeenCalledWith(closeSignUpModal());
  });

  it("logs in as guest", async () => {
    mockedUseSelector.mockReturnValue(true);
    mockedSignIn.mockResolvedValue({});

    render(<SignUpModal />);
    const modal = screen.getByRole("dialog");
    const guestButton = within(modal).getByText("Log In as Guest", { selector: "button" });
    await act(async () => fireEvent.click(guestButton));

    expect(mockedSignIn).toHaveBeenCalledWith(auth, "guest@guest.com", "1234567890");
    expect(mockDispatch).toHaveBeenCalledWith(closeSignUpModal());
  });

  it("handles onAuthStateChanged and dispatches signInUser", () => {
    const fakeUser = { displayName: "Auth User", email: "auth@test.com", uid: "456" };
    mockedOnAuthStateChanged.mockImplementation((authInstance, callback) => {
      callback(fakeUser);
      return jest.fn(); // unsubscribe
    });

    render(<SignUpModal />);
    expect(mockDispatch).toHaveBeenCalledWith(
      signInUser({
        name: "Auth User",
        username: "auth",
        email: "auth@test.com",
        uid: "456",
      })
    );
  });
});
