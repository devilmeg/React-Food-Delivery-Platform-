import { useState, useEffect, useContext } from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { getPredictedFreshness } from "../utils/freshnessScore";
import { calculateDistance } from "../utils/distanceCalculator";
import LocationContext from "../utils/LocationContext";

const ItemList = ({ category, isOpen }) => {
  const dispatch = useDispatch();
  const { coords } = useContext(LocationContext);
  const [freshnessData, setFreshnessData] = useState({});

  const handleAddItem = (item) => {
    dispatch(addItem(item.card?.info || item));
  };

  useEffect(() => {
    async function fetchFreshness() {
      const prepTime = Math.floor(Math.random() * 15) + 10;
      const restaurantLat = 28.5355;
      const restaurantLon = 77.3910;

      let deliveryTime = 25;
      if (coords.lat && coords.lon) {
        const distance = calculateDistance(
          coords.lat,
          coords.lon,
          restaurantLat,
          restaurantLon
        );
        const avgSpeed = 25; // km/h
        deliveryTime = Math.ceil((distance / avgSpeed) * 60);
      }

      const { freshnessScore, temperature } = await getPredictedFreshness(
        prepTime,
        deliveryTime
      );

      setFreshnessData({ freshnessScore, temperature, deliveryTime });
    }

    fetchFreshness();
  }, [coords]);

  // ✅ Safe fallback for inconsistent data shape
  const items =
    category?.card?.card?.itemCards ||
    category?.card?.itemCards ||
    category?.itemCards ||
    [];

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul className="px-5 pb-5 grid grid-cols-1 gap-4">
        {items.map((item, index) => {
          const {
            name,
            description,
            price,
            defaultPrice,
            cloudinaryImageId,
            imageId,
          } = item.card?.info || item;

          const imgUrl =
            cloudinaryImageId || imageId
              ? CDN_URL + (cloudinaryImageId || imageId)
              : null;

          const freshness = freshnessData.freshnessScore ?? 85;

          return (
            <li
              key={`${item.card?.info?.id || index}-${index}`}
              className="flex items-start justify-between gap-4 p-4 bg-white rounded-xl shadow-md 
                         hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 text-base tracking-wide">
                    {name}
                  </span>
                  <span className="font-bold text-orange-600 text-lg">
                    ₹{price / 100 || defaultPrice / 100}
                  </span>
                </div>

                {description && (
                  <p className="text-gray-700 text-sm mt-2 leading-relaxed line-clamp-2">
                    {description}
                  </p>
                )}

                {/* 🧠 Freshness Indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">
                    🍱 Freshness Score:
                  </span>
                  <span
                    className={`font-bold ${
                      freshness > 80
                        ? "text-green-600"
                        : freshness > 60
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {freshness}%
                  </span>
                </div>

                <div className="h-2 mt-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      freshness > 80
                        ? "bg-green-500"
                        : freshness > 60
                        ? "bg-yellow-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${freshness}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={name}
                    className="w-20 h-20 object-cover rounded-lg shadow-lg"
                  />
                )}

                {/* + | - buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddItem(item)}
                    className="bg-green-500 text-white font-bold w-7 h-7 rounded-full shadow hover:bg-green-600"
                  >
                    +
                  </button>
                  <button className="bg-red-500 text-white font-bold w-7 h-7 rounded-full shadow hover:bg-red-600">
                    -
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
