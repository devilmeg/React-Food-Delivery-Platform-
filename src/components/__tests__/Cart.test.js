import RestaurantMenu from "../RestaurantMenu";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import MOCK_DATA_NAME from "../mocks/resMockMenu.json";
import { Provider } from "react-redux";
import store from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA_NAME),
  });
});

it("Should open Recommended, show 20 items and update cart count on + click", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  // Locate the accordion header (Recommended (20))
  const header = screen.getByText((content, element) => {
    const txt = element.textContent.replace(/\s+/g, "");
    return txt === "Recommended(20)";
  });

  // Click to open category
  fireEvent.click(header);

  // The open panel is the sibling
  const panel = header.parentElement.nextElementSibling;

  // Get only items from this open panel
  const items = within(panel).queryAllByTestId("menu-item");

  // Verify count = 20
  expect(items.length).toBe(20);

  // Click the first "+" button
  const addBtns = within(panel).getAllByTestId("add-btn");
  fireEvent.click(addBtns[0]);

  // Now check cart count in Header
  const cartLink = screen.getByText(/Cart/);

  expect(cartLink.textContent).toBe("Cart1");
});
