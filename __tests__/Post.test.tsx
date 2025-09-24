import { render, screen } from "@testing-library/react";
import Post from "../app/[locale]/components/Post";

import * as redux from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("@/firebase", () => ({
  db: {},
}));

describe("Post component basic render", () => {
  const mockedUseSelector = redux.useSelector as unknown as jest.Mock;
  const mockedUseDispatch = redux.useDispatch as unknown as jest.Mock;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockedUseSelector.mockReturnValue({ uid: "user2", username: "andres123" });
    mockedUseDispatch.mockReturnValue(mockDispatch);
  });

  const postData = {
    name: "Andres",
    username: "andres123",
    text: "Hello world!",
    timestamp: {
      toDate: () => new Date(2020, 1, 1),
    },
    likes: ["user1"],
  };

  it("renders PostHeader correctly", () => {
    render(<Post data={postData} id="postId" />);
    expect(screen.getByText("Andres")).toBeInTheDocument();
    expect(screen.getByText("andres123")).toBeInTheDocument();
    expect(screen.getByText("Hello world!")).toBeInTheDocument();
  });

  it("renders Comment and Like buttons", () => {
    render(<Post data={postData} id="postId" />);
    expect(screen.getByLabelText("Comment")).toBeInTheDocument();
    expect(screen.getByLabelText("Like")).toBeInTheDocument();
  });
});
