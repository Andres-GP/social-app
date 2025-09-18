/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentModal from "./CommentModal";
import { useSelector } from "react-redux";
import { closeCommentModal } from "@/redux/slices/modalSlice";

jest.mock("@/firebase");

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

const mockedUseSelector = useSelector as unknown as jest.Mock;

describe("CommentModal", () => {
  const commentDetails = {
    id: "post1",
    name: "John Doe",
    username: "johnd",
    text: "This is a comment",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal when open is true", () => {
    mockedUseSelector.mockImplementation((selectorFn: any) =>
      selectorFn({
        modals: { commentModalOpen: true, commentPostDetails: commentDetails },
        user: { username: "johnd", name: "John Doe" },
      })
    );

    render(<CommentModal />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a comment")).toBeInTheDocument();
    expect(screen.getByText("@johnd")).toBeInTheDocument();
  });

  it("does not render modal when open is false", () => {
    mockedUseSelector.mockImplementation((selectorFn: any) =>
      selectorFn({
        modals: { commentModalOpen: false, commentPostDetails: commentDetails },
        user: { username: "johnd", name: "John Doe" },
      })
    );

    const { queryByText } = render(<CommentModal />);
    expect(queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("dispatches closeCommentModal when close button is clicked", () => {
    mockedUseSelector.mockImplementation((selectorFn: any) =>
      selectorFn({
        modals: { commentModalOpen: true, commentPostDetails: commentDetails },
        user: { username: "johnd", name: "John Doe" },
      })
    );

    render(<CommentModal />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith(closeCommentModal());
  });
});
