/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, within, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpModal from "../app/[locale]/components/modals/SignUpModal";

import { closeSignUpModal } from "@/redux/slices/modalSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";

jest.mock("@/firebase");
jest.mock("firebase/auth");

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

jest.mock("../app/[locale]/components/Button", () => (props: any) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
});

const mockedUseSelector = jest.spyOn(require("react-redux"), "useSelector");
const mockedCreateUser = createUserWithEmailAndPassword as jest.Mock;
const mockedUpdateProfile = updateProfile as jest.Mock;

describe("SignUpModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates a new user and dispatches signInUser", async () => {
    mockedUseSelector.mockReturnValue(true);
    mockedCreateUser.mockResolvedValue({
      user: { displayName: "Test User", email: "test@test.com", uid: "123" },
    });
    mockedUpdateProfile.mockResolvedValue({});

    render(<SignUpModal />);
    const modal = screen.getByRole("dialog");

    fireEvent.change(within(modal).getByPlaceholderText("name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(within(modal).getByPlaceholderText("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(within(modal).getByPlaceholderText("password"), {
      target: { value: "123456" },
    });

    const signUpButton = within(modal).getByText("sign_up", { selector: "button" });

    await act(async () => fireEvent.click(signUpButton));

    expect(mockedCreateUser).toHaveBeenCalledWith(auth, "test@test.com", "123456");
    expect(mockedUpdateProfile).toHaveBeenCalledWith(
      { displayName: "Test User", email: "test@test.com", uid: "123" },
      { displayName: "Test User" }
    );
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
});
