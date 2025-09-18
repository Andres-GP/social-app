import { render, screen } from "@testing-library/react";
import LoadingScreen from "./LoadingScreen";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("LoadingScreen component", () => {
  const mockedUseSelector = useSelector as unknown as jest.Mock;

  it("renders correctly when loadingScreenOpen is true", () => {
    mockedUseSelector.mockReturnValue(true);

    const { container } = render(<LoadingScreen />);

    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass("opacity-100", "z-50");

    expect(screen.getByText("Social")).toBeInTheDocument();
    expect(screen.getByText("App")).toHaveClass("text-[#F4AF01]");
  });

  it("renders correctly when loadingScreenOpen is false", () => {
    mockedUseSelector.mockReturnValue(false);

    const { container } = render(<LoadingScreen />);

    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass("opacity-0", "-z-50");
  });

  it("renders LinearProgress bar", () => {
    mockedUseSelector.mockReturnValue(true);

    render(<LoadingScreen />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });
});
