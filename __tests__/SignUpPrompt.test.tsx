import { render, screen } from "@testing-library/react";
import SignUpPrompt from "../app/[locale]/components/SignUpPrompt";

const mockUseSelector = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: (fn: any) => mockUseSelector(fn),
}));

jest.mock("../app/[locale]/components/modals/SignUpModal", () => () => <div>SignUpModal</div>);
jest.mock("../app/[locale]/components/modals/LogInModal", () => () => <div>LogInModal</div>);

describe("SignUpPrompt component", () => {
  beforeEach(() => {
    mockUseSelector.mockClear();
  });

  it("renders footer and modals when user name is empty", () => {
    mockUseSelector.mockReturnValue("");
    render(<SignUpPrompt />);

    expect(screen.getByText("dont_miss")).toBeInTheDocument();
    expect(screen.getByText("SignUpModal")).toBeInTheDocument();
    expect(screen.getByText("LogInModal")).toBeInTheDocument();
  });

  it("does not render footer when user name exists", () => {
    mockUseSelector.mockReturnValue("John Doe");
    render(<SignUpPrompt />);

    expect(screen.queryByText("dont_miss")).not.toBeInTheDocument();
    expect(screen.queryByText("SignUpModal")).not.toBeInTheDocument();
    expect(screen.queryByText("LogInModal")).not.toBeInTheDocument();
  });
});
