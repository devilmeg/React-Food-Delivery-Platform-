//new Optimized Dynamic code is below
import { useState } from "react"; // ✅ Import useState
import Shimmer from "./Shimmer";
import "../../style.css";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory"; // ✅ Import accordion category

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  // ✅ Track which category is open
  const [openIndex, setOpenIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  // ✅ Optimized way to get restaurant info
  const restaurantInfo =
    resInfo?.cards.find((c) => c?.card?.card?.info)?.card?.card?.info || {};
    
  // const category=resInfo?.cards.find((c) => c?.card?.card?.info)?.card?.card?.info.filter((c) => c?.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")||{};

  const { name, cuisines, avgRating, costForTwoMessage } = restaurantInfo;

  // ✅ Optimized way to fetch item categories
  const itemCategories =
    resInfo?.cards
      ?.find((c) => c.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
          c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      ) || [];

  return (
    <div className="menu min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Restaurant Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 truncate">
          {name}
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-4">
          {cuisines ? cuisines.join(", ") : "Cuisines not available"}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
              avgRating >= 4 ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            ⭐ {avgRating || "N/A"}
          </span>
          <span className="text-gray-700 font-medium">{costForTwoMessage}</span>
        </div>
      </div>

      {/* Menu Section */}
      <div className="menu-list max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-b-2 border-orange-400 pb-2">
          Menu
        </h2>

        {/* ✅ Use RestaurantCategory for each category (Accordion style) */}
        {itemCategories.map((category, index) => (
          <RestaurantCategory
            key={category.card.card.title}
            category={category}
            isOpen={openIndex === index} // ✅ controlled open state
            onToggle={() => {
              setOpenIndex(openIndex === index ? null : index); // ✅ toggle one at a time
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
