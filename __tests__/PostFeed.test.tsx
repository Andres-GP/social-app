import { render, screen } from "@testing-library/react";
import * as redux from "react-redux";

jest.mock("@/firebase", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: (q: any, callback: any) => {
    callback({
      docs: [
        {
          id: "1",
          data: () => ({
            username: "user1",
            text: "Hello world!",
            timestamp: { toDate: () => new Date(2020, 1, 1) },
          }),
        },
        {
          id: "2",
          data: () => ({
            username: "user2",
            text: "Second post",
            timestamp: { toDate: () => new Date(2020, 1, 2) },
          }),
        },
      ],
    });
    return jest.fn(); // unsubscribe
  },
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../app/[locale]/components/Post", () => (props: any) => (
  <div data-testid="post">{props.data.text}</div>
));
jest.mock("../app/[locale]/components/PostInput", () => () => <div data-testid="post-input" />);

import PostFeed from "../app/[locale]/components/PostFeed";

describe("PostFeed component", () => {
  const mockDispatch = jest.fn();
  const mockedUseDispatch = redux.useDispatch as unknown as jest.Mock;
  const mockedUseSelector = redux.useSelector as unknown as jest.Mock;

  beforeEach(() => {
    mockedUseDispatch.mockReturnValue(mockDispatch);
    mockedUseSelector.mockImplementation((selectorFn) => selectorFn({ search: { query: "" } }));

    jest.clearAllMocks();
  });

  it("renders PostInput", () => {
    render(<PostFeed />);
    expect(screen.getByTestId("post-input")).toBeInTheDocument();
  });

  it("renders posts from onSnapshot", () => {
    render(<PostFeed />);
    const posts = screen.getAllByTestId("post");
    expect(posts).toHaveLength(2);
    expect(posts[0]).toHaveTextContent("Hello world!");
    expect(posts[1]).toHaveTextContent("Second post");
  });

  it("calls closeLoadingScreen dispatch", () => {
    render(<PostFeed />);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "loading/closeLoadingScreen" })
    );
  });

  it("filters posts when search query is set", () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn({ search: { query: "hello" } })
    );

    render(<PostFeed />);
    const posts = screen.getAllByTestId("post");
    expect(posts).toHaveLength(1);
    expect(posts[0]).toHaveTextContent("Hello world!");
  });
});
