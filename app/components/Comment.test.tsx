import { render, screen } from "@testing-library/react";
import Comment from "./Comment";

jest.mock("./PostHeader", () => ({
  __esModule: true,
  default: jest.fn(({ name, username, text }) => (
    <div data-testid="post-header">
      {name} {username} {text}
    </div>
  )),
}));

describe("Comment component", () => {
  const props = { name: "Andres", username: "andres123", text: "Hello world!" };

  it("renders PostHeader with correct props", () => {
    render(<Comment {...props} />);
    const postHeader = screen.getByTestId("post-header");
    expect(postHeader).toHaveTextContent("Andres");
    expect(postHeader).toHaveTextContent("andres123");
    expect(postHeader).toHaveTextContent("Hello world!");
  });

  it("renders all 4 icons with cursor-not-allowed", () => {
    const { container } = render(<Comment {...props} />);
    const icons = container.querySelectorAll("svg.cursor-not-allowed");
    expect(icons.length).toBe(4);
  });
});
