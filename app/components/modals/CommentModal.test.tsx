/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentModal from "./CommentModal";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModal } from "@/redux/slices/modalSlice";

// Mock de react-redux
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe("CommentModal", () => {
  const commentDetails = {
    name: "John Doe",
    username: "johnd",
    text: "This is a comment",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal when open is true", () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn: any) =>
      selectorFn({
        modals: { commentModalOpen: true, commentPostDetails: commentDetails },
      })
    );

    render(<CommentModal />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a comment")).toBeInTheDocument();
    expect(screen.getByText("@johnd")).toBeInTheDocument();
  });

  it("does not render modal when open is false", () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn: any) =>
      selectorFn({
        modals: { commentModalOpen: false, commentPostDetails: commentDetails },
      })
    );

    const { queryByText } = render(<CommentModal />);
    expect(queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("dispatches closeCommentModal when close button is clicked", () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn: any) =>
      selectorFn({
        modals: { commentModalOpen: true, commentPostDetails: commentDetails },
      })
    );

    render(<CommentModal />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith(closeCommentModal());
  });
});
