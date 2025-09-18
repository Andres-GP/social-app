/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button component", () => {
  it("renders with given text", () => {
    render(<Button text="Click me" className="bg-blue-500" handleClick={() => {}} />);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-500");
  });

  it("calls handleClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Click me" className="bg-green-500" handleClick={handleClick} />);
    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as disabled when disabled prop is true", () => {
    const handleClick = jest.fn();
    render(
      <Button text="Cannot click" className="bg-gray-500" handleClick={handleClick} disabled />
    );
    const button = screen.getByRole("button", { name: "Cannot click" });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
