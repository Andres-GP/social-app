import { render, screen } from "@testing-library/react";
import SignUpPrompt from "./SignUpPrompt";

const mockUseSelector = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: (fn: any) => mockUseSelector(fn),
}));

jest.mock("./modals/SignUpModal", () => () => <div>SignUpModal</div>);
jest.mock("./modals/LogInModal", () => () => <div>LogInModal</div>);

describe("SignUpPrompt component", () => {
  beforeEach(() => {
    mockUseSelector.mockClear();
  });

  it("renders footer and modals when user name is empty", () => {
    mockUseSelector.mockReturnValue("");
    render(<SignUpPrompt />);

    expect(screen.getByText("Don't miss out on the buzz")).toBeInTheDocument();
    expect(screen.getByText("SignUpModal")).toBeInTheDocument();
    expect(screen.getByText("LogInModal")).toBeInTheDocument();
  });

  it("does not render footer when user name exists", () => {
    mockUseSelector.mockReturnValue("John Doe");
    render(<SignUpPrompt />);

    expect(screen.queryByText("Don't miss out on the buzz")).not.toBeInTheDocument();
    expect(screen.queryByText("SignUpModal")).not.toBeInTheDocument();
    expect(screen.queryByText("LogInModal")).not.toBeInTheDocument();
  });
});
