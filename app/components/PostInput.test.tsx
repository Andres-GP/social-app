import { render, screen, fireEvent, act } from "@testing-library/react";
import PostInput from "./PostInput";

const mockDispatch = jest.fn();
const mockOpenLogInModal = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selectorFn: any) => ({
    username: "",
    name: "",
    commentPostDetails: { id: "mockPostId" },
  }),
}));

jest.mock("@/redux/slices/modalSlice", () => ({
  openLogInModal: () => mockOpenLogInModal,
  closeCommentModal: jest.fn(),
}));

jest.mock("@/firebase", () => ({ db: {} }));
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  serverTimestamp: jest.fn(() => new Date()),
  arrayUnion: jest.fn((x) => x),
}));

describe("PostInput component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders textarea and Post button", () => {
    render(<PostInput />);
    expect(screen.getByPlaceholderText("What's happening!?")).toBeInTheDocument();
    expect(screen.getByText("Post")).toBeInTheDocument();
  });

  it("updates textarea on typing", () => {
    render(<PostInput />);
    const textarea = screen.getByPlaceholderText("What's happening!?") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    expect(textarea.value).toBe("Hello world");
  });

  it("calls addDoc when Post button is clicked and user is logged in", async () => {
    jest.spyOn(require("react-redux"), "useSelector").mockImplementation(() => ({
      username: "testuser",
      name: "Test User",
      commentPostDetails: { id: "mockPostId" },
    }));
    const { addDoc } = require("firebase/firestore");

    render(<PostInput />);
    const textarea = screen.getByPlaceholderText("What's happening!?") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Hello world" } });

    await act(async () => {
      const button = screen.getByText("Post");
      fireEvent.click(button);
    });

    expect(addDoc).toHaveBeenCalled();
  });
});
