import { render, screen, fireEvent } from "@testing-library/react";
import WhoToFollow from "./WhoToFollow";

describe("WhoToFollow component", () => {
  it("renders fullName and userName correctly", () => {
    render(<WhoToFollow avatar="/avatar.png" fullName="John Doe" userName="@johndoe" />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
  });

  it("button toggles text on click", () => {
    render(<WhoToFollow avatar="/avatar.png" fullName="John Doe" userName="@johndoe" />);

    const button = screen.getByRole("button", { name: /Follow/i });
    fireEvent.click(button);
    expect(button).toHaveTextContent("Followed");
    fireEvent.click(button);
    expect(button).toHaveTextContent("Follow");
  });
});
