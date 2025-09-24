import { renderHook, act } from "@testing-library/react";
import { useUsers } from "@/hooks/useUsers";
import { waitFor } from "@testing-library/react";

const mockUsersResponse = [{ fullName: "John Doe", userName: "@johndoe", avatar: "/avatar1.png" }];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        results: [
          {
            name: { first: "John", last: "Doe" },
            login: { username: "johndoe" },
            picture: { medium: "/avatar1.png" },
          },
        ],
      }),
  })
) as jest.Mock;

describe("useUsers hook", () => {
  it("fetches users and sets state correctly", async () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual(mockUsersResponse);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch users");
  });
});
