import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  
  // const { loggedInUser } = useContext(UserContext);
  const { 
    name,
    cuisines,
    costForTwo,
    avgRating,
    totalRatingsString,
    cloudinaryImageId,
    sla
  } = resData?.info || {}; // Safely destructure with optional chaining

  return (
    <div 
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl 
                 transition-transform hover:-translate-y-2 transform cursor-pointer 
                 overflow-hidden w-full max-w-xs mx-auto md:mx-0"
    >
      {/* ✅ Restaurant Image */}
      <img 
        alt="res-logo" 
        src={CDN_URL + cloudinaryImageId} 
        className="h-44 w-full object-cover rounded-t-2xl"
      />

      {/* ✅ Card Content */}
      <div className="p-5 flex flex-col gap-2">
        {/* Restaurant Name */}
        <h4 className="text-lg font-bold text-gray-900 truncate">{name}</h4>

        {/* Cuisines */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {cuisines?.join(", ") ?? "Cuisines not available"}
        </p>

        {/* Cost */}
        <p className="text-sm font-medium text-gray-700">{costForTwo}</p>

        {/* Ratings & Delivery Time */}
        <div className="flex justify-between items-center mt-2">
          <span 
            className={`px-2 py-0.5 rounded-md text-xs font-semibold text-white 
                        ${avgRating >= 4 ? "bg-green-500" : "bg-yellow-500"}`}
          >
            ⭐ {avgRating || "N/A"}
          </span>
          <span className="text-gray-500 text-xs">{sla?.deliveryTime} mins</span>
        </div>
        {/* ✅ Show logged in user
        <h4 className="text-sm text-gray-600 font-bold mt-2">
          User: {loggedInUser}
        </h4> */}

        {/* Total Ratings */}
        <p className="text-xs text-gray-500 mt-1">
          Total Ratings: {totalRatingsString || "No Ratings"}
        </p>

        {/* ✅ Order Button */}
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

// ✅ HOC with Tailwind-styled "Promoted" Label
// 🔥 Higher-Order Component for Promoted Label
// 🔥 Higher-Order Component for Promoted Label
export const withPromotedLabel = (WrappedCard) => {
  return (props) => {
    return (
      <div className="relative">
        <WrappedCard {...props} />
        {/* Black Badge */}
        <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
          PROMOTED
        </span>
      </div>
    );
  };
};


export default RestaurantCard;
