import { useState } from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";

const ItemList = ({ category, isOpen, items }) => {
  const dispatch = useDispatch();

  // ✅ Handle both Menu and Cart mode
  const itemList = items || category?.card?.card?.itemCards || [];

  // ✅ Track expanded descriptions
  const [expandedItems, setExpandedItems] = useState([]);

  const handleAdd = (item) => {
    const info = item.card?.info || item;
    dispatch(addItem(info));
  };

  const handleRemove = () => {
    dispatch(removeItem());
  };

  const toggleExpand = (index) => {
    setExpandedItems((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen
          ? "max-h-[1000px] opacity-100"
          : isOpen === undefined
          ? "opacity-100"
          : "max-h-0 opacity-0"
      }`}
    >
      <ul className="px-5 pb-5 grid grid-cols-1 gap-4">
        {itemList.map((item, index) => {
          const info = item.card?.info || item;
          const {
            id,
            name,
            description,
            price,
            defaultPrice,
            cloudinaryImageId,
            imageId,
          } = info;

          const imgUrl =
            cloudinaryImageId
              ? CDN_URL + cloudinaryImageId
              : imageId
              ? CDN_URL + imageId
              : null;

          const isExpanded = expandedItems[index] || false;
          const isLongDesc = description && description.length > 100;

          return (
            <li
              key={id || `${name}-${index}`} // ✅ unique fallback key
              className="flex items-start justify-between gap-4 p-4 bg-white rounded-xl shadow-md
                         hover:shadow-xl hover:scale-[1.02] transition-all duration-300 
                         animate-fadeIn"
            >
              {/* ✅ Left Side: Item Info */}
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
                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {isExpanded || !isLongDesc
                      ? description
                      : description.slice(0, 100) + "..."}
                    {isLongDesc && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-orange-600 font-medium text-xs ml-1 hover:underline"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                )}
              </div>

              {/* ✅ Right Side: Image + +|- Buttons */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={name}
                    className="w-20 h-20 object-cover rounded-lg shadow-lg"
                  />
                )}
                <div className="flex items-center justify-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleAdd(item)}
                    className="px-3 py-1 bg-green-500 text-white font-bold rounded-l-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={handleRemove}
                    className="px-3 py-1 bg-red-500 text-white font-bold rounded-r-lg hover:bg-red-600 transition"
                  >
                    −
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
