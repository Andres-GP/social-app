import { render, screen, waitFor } from "@testing-library/react";
import Widgets from "./Widgets";

jest.mock("./WhoToFollow", () => (props: any) => (
  <div data-testid="who-to-follow">{props.fullName}</div>
));
jest.mock("./Trending", () => (props: any) => <div data-testid="trending">{props.hashtag}</div>);
jest.mock("./Loader", () => (props: any) => (
  <div data-testid="loader" className={props.className}>
    Loading...
  </div>
));
jest.mock("./ErrorMessage", () => (props: any) => <div data-testid="error">{props.error}</div>);

const mockRandomUserResponse = {
  results: [
    {
      name: { first: "John", last: "Doe" },
      login: { username: "johndoe" },
      picture: { medium: "/avatar1.png" },
    },
    {
      name: { first: "Jane", last: "Smith" },
      login: { username: "janesmith" },
      picture: { medium: "/avatar2.png" },
    },
    {
      name: { first: "Bob", last: "Brown" },
      login: { username: "bobbrown" },
      picture: { medium: "/avatar3.png" },
    },
  ],
};

const mockTrendingResponse = [
  { country: "US", hashtag: "#React", shares: 1200, link: "https://example.com/react" },
  { country: "US", hashtag: "#JS", shares: 800, link: "https://example.com/js" },
];

beforeEach(() => {
  (global as any).fetch = jest.fn((url) => {
    if ((url as string).includes("randomuser.me")) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockRandomUserResponse) });
    }
    if ((url as string).includes("/api/trending")) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve(mockTrendingResponse) });
    }
    return Promise.reject("Unknown URL");
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("Widgets component", () => {
  it("renders Loader initially", () => {
    render(<Widgets />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders Trending and WhoToFollow after data fetch", async () => {
    render(<Widgets />);

    await waitFor(() => expect(screen.queryByTestId("loader")).not.toBeInTheDocument());

    mockTrendingResponse.forEach((trend) => {
      expect(screen.getByText(trend.hashtag)).toBeInTheDocument();
    });

    mockRandomUserResponse.results.forEach((user) => {
      const fullName = `${user.name.first} ${user.name.last}`;
      expect(screen.getByText(fullName)).toBeInTheDocument();
    });
  });

  it("renders ErrorMessage if trending fetch fails", async () => {
    (global as any).fetch = jest.fn((url) => {
      if ((url as string).includes("randomuser.me")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockRandomUserResponse) });
      }
      return Promise.resolve({ ok: false });
    });

    render(<Widgets />);

    await waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());
    expect(screen.getByTestId("error")).toHaveTextContent("Failed to fetch trends");
  });
});
