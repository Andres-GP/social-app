import { render, screen } from "@testing-library/react";
import ErrorMessage from "../app/[locale]/components/ErrorMessage";

describe("ErrorMessage component", () => {
  it("renders the error message correctly", () => {
    render(<ErrorMessage error="Something went wrong" />);
    expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument();
  });

  it("renders the SVG icon", () => {
    const { container } = render(<ErrorMessage error="Error here" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
