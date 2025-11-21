const { render } = require("@testing-library/react");
import RestaurantCard,{ withPromotedLabel } from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";



it("Should render RestaurantCard component correctly", () => {
    // Test implementation goes here
    render(<RestaurantCard  resData={MOCK_DATA}/>);
    const name=screen.getByText("Cheesecake & Co.");
    expect(name).toBeInTheDocument();
});


it("should render RestaurantCard with promoted label", () => {
  const PromotedCard = withPromotedLabel(RestaurantCard);

  render(<PromotedCard resData={MOCK_DATA} />);

  const label = screen.getByText(/Promoted/i);
  expect(label).toBeInTheDocument();
});

