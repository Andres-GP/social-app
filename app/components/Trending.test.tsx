import { render, screen } from "@testing-library/react";
import Trending from "./Trending";

describe("Trending component", () => {
  it("renders country, hashtag and shares correctly", () => {
    render(
      <Trending link="https://example.com" country="US" hashtag="#ReactTesting" shares={123} />
    );

    expect(screen.getByText("US Trending")).toBeInTheDocument();
    expect(screen.getByText("#ReactTesting")).toBeInTheDocument();
    expect(screen.getByText("123 shares")).toBeInTheDocument();

    const link = screen.getByRole("link") as HTMLAnchorElement;
    expect(link.href).toBe("https://example.com/");
  });

  it("uses default link if none is provided", () => {
    render(<Trending country="UK" hashtag="#Jest" shares={0} link={undefined as any} />);

    const link = screen.getByRole("link") as HTMLAnchorElement;
    expect(link.href).toBe("https://www.reddit.com/");
  });

  it("does not render shares text if shares is 0", () => {
    render(<Trending link="https://example.com" country="FR" hashtag="#Testing" shares={0} />);

    expect(screen.queryByText("0 shares")).not.toBeInTheDocument();
  });
});
