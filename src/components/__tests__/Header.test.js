import { render,fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// Suppress React Router warnings
beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

jest.mock("../../utils/useOnlineStatus", () => jest.fn(() => false));


it("should render Header component correctly", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton=screen.getByRole("button",{name:"Login"});
  expect(loginButton).toBeInTheDocument();
});
it("should render an empty cart (no cart badge)", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // "Cart" link is present
  const cartLink = screen.getByText(/Cart/);
  expect(cartLink).toBeInTheDocument();

  // Badge should NOT appear when cartItems.length === 0
  const badge = screen.queryByText("0");
  expect(badge).toBeNull();
});


it("should toggle Login → Logout using fireEvent", () => {
  // Render header
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // Before click: Login should be visible
  const loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeInTheDocument();

  // Click the button
  fireEvent.click(loginButton);

  // After click: Logout should appear
  const logoutButton = screen.getByRole("button", { name: "Logout" });
  expect(logoutButton).toBeInTheDocument();
});
