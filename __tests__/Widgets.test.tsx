import { render, screen, waitFor } from "@testing-library/react";
import Widgets from "../app/[locale]/components/Widgets";
import { Provider } from "react-redux";
import { store } from "../redux/store";

jest.mock("../app/[locale]/components/WhoToFollow", () => (props: any) => (
  <div data-testid="who-to-follow">{props.fullName}</div>
));
jest.mock("../app/[locale]/components/Trending", () => (props: any) => (
  <div data-testid="trending">{props.hashtag}</div>
));
jest.mock("../app/[locale]/components/Loader", () => (props: any) => (
  <div data-testid="loader" className={props.className}>
    Loading...
  </div>
));
jest.mock("../app/[locale]/components/ErrorMessage", () => (props: any) => (
  <div data-testid="error">{props.error}</div>
));

const mockUsers = [
  { fullName: "John Doe", userName: "@johndoe", avatar: "/avatar1.png" },
  { fullName: "Jane Smith", userName: "@janesmith", avatar: "/avatar2.png" },
];

const mockTrends = [
  { country: "US", hashtag: "#React", shares: 1200, link: "https://example.com/react" },
  { country: "US", hashtag: "#JS", shares: 800, link: "https://example.com/js" },
];

jest.mock("../hooks/useUsers", () => ({
  useUsers: jest.fn(),
}));

jest.mock("../hooks/useTrends", () => ({
  useTrends: jest.fn(),
}));

import { useUsers } from "../hooks/useUsers";
import { useTrends } from "../hooks/useTrends";

describe("Widgets component", () => {
  beforeEach(() => {
    (useUsers as jest.Mock).mockReturnValue({ users: [], loading: true, error: null });
    (useTrends as jest.Mock).mockReturnValue({ trends: [], loading: true, error: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loader initially", async () => {
    render(
      <Provider store={store}>
        <Widgets />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
  });

  it("renders Trending and WhoToFollow after data fetch", async () => {
    (useUsers as jest.Mock).mockReturnValue({ users: mockUsers, loading: false, error: null });
    (useTrends as jest.Mock).mockReturnValue({ trends: mockTrends, loading: false, error: null });

    render(
      <Provider store={store}>
        <Widgets />
      </Provider>
    );

    await waitFor(() => {
      mockTrends.forEach((trend) => {
        expect(screen.getByText(trend.hashtag)).toBeInTheDocument();
      });
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.fullName)).toBeInTheDocument();
      });
    });
  });

  it("renders ErrorMessage if trends hook has error", async () => {
    (useUsers as jest.Mock).mockReturnValue({ users: mockUsers, loading: false, error: null });
    (useTrends as jest.Mock).mockReturnValue({
      trends: [],
      loading: false,
      error: "Failed to fetch trends",
    });

    render(
      <Provider store={store}>
        <Widgets />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent("Failed to fetch trends");
    });
  });

  it("renders ErrorMessage if users hook has error", async () => {
    (useUsers as jest.Mock).mockReturnValue({ users: [], loading: false, error: "Users failed" });
    (useTrends as jest.Mock).mockReturnValue({ trends: mockTrends, loading: false, error: null });

    render(
      <Provider store={store}>
        <Widgets />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent("Users failed");
    });
  });
});
