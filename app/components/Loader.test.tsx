import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  it("renders the loader with the correct role and aria attributes", () => {
    render(<Loader className="my-custom-class" />);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute("aria-live", "polite");
    expect(loader).toHaveAttribute("aria-busy", "true");
  });

  it("applies the custom className", () => {
    render(<Loader className="my-custom-class" />);
    const loader = screen.getByRole("status");
    expect(loader).toHaveClass("my-custom-class");
    expect(loader).toHaveClass("flex", "justify-center", "items-center", "py-10");
  });

  it("renders the spinning SVG", () => {
    render(<Loader className="my-custom-class" />);
    const svg = screen.getByRole("status").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("animate-spin", "h-12", "w-12", "text-[#F4AF01]");
    expect(svg?.querySelector("circle")).toHaveClass("opacity-25");
    expect(svg?.querySelector("path")).toHaveClass("opacity-75");
  });
});
