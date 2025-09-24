import { renderHook } from "@testing-library/react";
import { useTrends } from "@/hooks/useTrends";
import { waitFor } from "@testing-library/react";

const mockTrendsResponse = [
  { country: "US", hashtag: "#React", shares: 1200, link: "https://example.com/react" },
  { country: "US", hashtag: "#JS", shares: 800, link: "https://example.com/js" },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockTrendsResponse),
  })
) as jest.Mock;

describe("useTrends hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches trends and sets state correctly", async () => {
    const { result } = renderHook(() => useTrends());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.trends).toEqual(mockTrendsResponse);
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));

    const { result } = renderHook(() => useTrends());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.trends).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch trends");
  });
});
