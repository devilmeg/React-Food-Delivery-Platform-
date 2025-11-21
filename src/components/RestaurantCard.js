import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import LocationContext from "../utils/LocationContext";
import { calculateDistance } from "../utils/distanceCalculator";

const RestaurantCard = ({ resData }) => {
  // console.log(resData);
  const { coords } = useContext(LocationContext);

  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    totalRatingsString,
    cloudinaryImageId,
    sla,
    lat,
    lon,
  } = resData?.info || {};

  // 🧭 Generate unique fallback coordinates if missing
  const randomOffset = resData?.info?.id
    ? (parseInt(resData.info.id.slice(-2)) % 10) / 100
    : Math.random() / 10;

  const restaurantLat = lat || 28.5355 + randomOffset;
  const restaurantLon = lon || 77.3910 + randomOffset;

  // 🧮 Calculate distance (User → Restaurant)
  let distance = 0;
  if (coords?.lat && coords?.lon) {
    distance = calculateDistance(coords.lat, coords.lon, restaurantLat, restaurantLon);
  } else {
    distance = Math.floor(Math.random() * 6) + 2; // 2–8 km fallback
  }

  distance = Number(distance.toFixed(1));

  // 🕒 Estimate delivery time based on distance
  const avgSpeed = 25; // km/h average delivery speed
  const estimatedTime = Math.ceil((distance / avgSpeed) * 60); // minutes

  return (
    <div
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl 
                 transition-transform hover:-translate-y-2 cursor-pointer 
                 overflow-hidden w-full max-w-xs mx-auto md:mx-0"
    >
      {/* ✅ Restaurant Image */}
      <img
        alt={`${name} logo`}
        src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : "/placeholder.png"}
        className="h-44 w-full object-cover rounded-t-2xl"
      />

      {/* ✅ Card Content */}
      <div className="p-5 flex flex-col gap-2">
        {/* Name & Cuisines */}
        <h4 className="text-lg font-bold text-gray-900 truncate">{name}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">
          {cuisines?.join(", ") ?? "Cuisines not available"}
        </p>

        {/* Price */}
        <p className="text-sm font-medium text-gray-700">{costForTwo || "₹200 for two"}</p>

        {/* Rating + Delivery Time */}
        <div className="flex justify-between items-center mt-2">
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-semibold text-white 
                        ${avgRating >= 4 ? "bg-green-500" : "bg-yellow-500"}`}
          >
            ⭐ {avgRating || "N/A"}
          </span>
          <span className="text-gray-500 text-xs">⏱️ {estimatedTime} mins</span>
        </div>

        {/* Distance Indicator */}
        <div className="flex items-center gap-1 text-xs mt-1">
          <span className="text-gray-700">📍</span>
          <span
            className={`font-medium ${
              distance < 3
                ? "text-green-600"
                : distance < 6
                ? "text-yellow-600"
                : "text-red-500"
            }`}
          >
            {distance} km away
          </span>
        </div>

        {/* Total Ratings */}
        <p className="text-xs text-gray-500 mt-1">
          Total Ratings: {totalRatingsString || "No Ratings"}
        </p>

        {/* Order Button */}
        <button
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 
                     text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-500 
                     transition-all shadow-md hover:shadow-lg"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

// ✅ Higher-Order Component for Promoted Label
export const withPromotedLabel = (WrappedCard) => {
  return (props) => (
    <div className="relative">
      <WrappedCard {...props} />
      <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
        PROMOTED
      </span>
    </div>
  );
};

export default RestaurantCard;
