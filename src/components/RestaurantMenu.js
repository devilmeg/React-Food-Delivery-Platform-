import { useState, useEffect } from "react";//nameimport 
import Shimmer from "./Shimmer";
import "../../style.css";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const {resId}=useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(
       MENU_URL +resId
      );
      const json = await data.json();
      console.log(json);

      setResInfo(json.data); // resInfo = json.data (no need for .data again later)
    } catch (error) {
      console.log("Failed to fetch the restaurant data:", error);
    }
  };

  if (resInfo === null) return <Shimmer />;

  // ✅ Fixed path (no extra .data)
  const { name, cuisines, avgRating, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

    const {itemCards}=resInfo?.cards[5].groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card;
    console.log(itemCards);
  return (
    <div className="menu">
      <div>
        <h1>{name}</h1>
        <p>{cuisines ? cuisines.join(", ") : "Cuisines not available"}</p>
        <div className="restaurant-info">
          <h2>Rating: ⭐ {avgRating || "N/A"}</h2>
          <h2>{costForTwoMessage}</h2>
        </div>
      </div>

      <div className="menu-list">
        <h2>Menu</h2>
        <ul>
          {itemCards.map(item=><li key={item.card.info.id}>{item.card.info.name}- Rs {item.card.info.price/100 || item.card.info.defaultPrice/100}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
