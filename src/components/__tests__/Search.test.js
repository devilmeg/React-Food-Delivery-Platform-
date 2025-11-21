import Body from "../Body";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MOCK_DATA from "../mocks/mockApi.json";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

beforeEach(()=>{
    console.log("Before Running a test...");
})

it("Should search for restaurants and filter the list", async () => {

  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  // Wait for cards to appear (they have <h4> headings)
  await waitFor(() => {
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  const searchInput = screen.getByPlaceholderText("Search for Restaurant. . .");

  // Set search text
  fireEvent.change(searchInput, { target: { value: "cake" } });

  // Click search button~
  const searchButton = screen.getByRole("button", { name: "Search" });
  fireEvent.click(searchButton);

  // get updated cards
  const filtered = screen.getAllByRole("heading");

  // You can assert length based on your MOCK_DATA:
  expect(filtered.length).toBe(5); // Adjust based on your mock data!
});
it("Should search for top rated restaurants and filter the list", async () => {

  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  // Wait for cards to appear (they have <h4> headings)
  await waitFor(() => {
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  // cards before the filter
    const allCards = screen.getAllByRole("heading");
    expect(allCards.length).toBe(9); // Adjust based on your mock data!
    console.log("Before Filter",allCards.length);

    // Click Top Rated Restaurants button
    //now click the button
    const topRatedBtn=screen.getByText("Top Rated restaurant");
    fireEvent.click(topRatedBtn);

    // get updated cards
    const afterFilter=screen.getAllByRole("heading");
    console.log("After Filter",afterFilter.length);

    //expect
     // EXPECT filtered count — based on mock data with avgRating > 4
  const expectedFiltered = MOCK_DATA.data.cards[2]
    .card.card.gridElements.infoWithStyle.restaurants
    .filter((res) => res.info.avgRating > 4).length;

    expect(afterFilter.length).toBe(expectedFiltered);

});
