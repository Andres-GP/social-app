import { render, screen } from "@testing-library/react";
import Comment from "../app/[locale]/components/Comment";

jest.mock("../app/[locale]/components/PostHeader", () => ({
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
});
