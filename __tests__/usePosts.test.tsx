import { renderHook } from "@testing-library/react";
import { usePosts, PostType } from "../hooks/usePosts";
import { waitFor } from "@testing-library/react";

const mockPostsResponse: PostType[] = [
  { id: "1", username: "john", content: "Post 1" },
  { id: "2", username: "jane", content: "Post 2" },
];

jest.mock("../firebase", () => ({
  db: {
    collection: jest.fn(),
  },
}));

jest.mock("firebase/firestore", () => {
  const original = jest.requireActual("firebase/firestore");
  return {
    ...original,
    collection: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
    onSnapshot: jest.fn((q, callback) => {
      const snapshot = {
        docs: mockPostsResponse.map((post) => ({
          id: post.id,
          data: () => ({
            username: post.username,
            content: post.content,
          }),
        })),
      };
      callback(snapshot);
      return jest.fn(); // unsubscribe
    }),
  };
});

describe("usePosts hook", () => {
  it("returns posts correctly", async () => {
    const { result } = renderHook(() => usePosts());

    await waitFor(() => {
      expect(result.current.length).toBe(2);
    });

    expect(result.current).toEqual(mockPostsResponse);
  });
});
