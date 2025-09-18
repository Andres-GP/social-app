import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

jest.mock("./SidebarUserInfo", () => () => <div data-testid="sidebar-user-info" />);

describe("Sidebar component", () => {
  it("renders the Sidebar component", () => {
    render(<Sidebar />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("renders SidebarUserInfo inside Sidebar", () => {
    render(<Sidebar />);
    const userInfo = screen.getByTestId("sidebar-user-info");
    expect(userInfo).toBeInTheDocument();
  });
});
