import { render, screen } from "@testing-library/react";
import PostHeader from "./PostHeader";

const mockTimestamp = {
  toDate: () => new Date("2025-01-01T12:00:00Z"),
};

describe("PostHeader component", () => {
  it("renders name and username correctly", () => {
    render(<PostHeader name="John Doe" username="johndoe" text="Hello World" />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders timestamp correctly when provided", () => {
    render(
      <PostHeader
        name="John Doe"
        username="johndoe"
        text="Hello World"
        timestamp={mockTimestamp as any}
      />
    );

    expect(screen.getByText(/ago/i)).toBeInTheDocument();
  });

  it("renders replyTo text when provided", () => {
    render(<PostHeader name="John Doe" username="johndoe" text="Hello World" replyTo="alice" />);

    expect(screen.getByText(/Replying to/i)).toBeInTheDocument();
    expect(screen.getByText("@alice")).toBeInTheDocument();
  });

  it("renders default values when name or username is empty", () => {
    render(<PostHeader name="" username="" text="Hello World" />);

    expect(screen.getByText("Guest")).toBeInTheDocument();
    expect(screen.getByText("guest123")).toBeInTheDocument();
  });
});
