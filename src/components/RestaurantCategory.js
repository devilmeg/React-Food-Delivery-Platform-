import ItemList from "./ItemList";

const RestaurantCategory = ({ category, isOpen, onToggle }) => {
  return (
    <div
      key={category.card.card.title}
      className="menu-category bg-white rounded-2xl shadow-lg border border-gray-100 mb-6 
                 hover:shadow-2xl transition-all duration-300"
    >
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center p-5 cursor-pointer rounded-t-2xl 
                   bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 
                   transition-colors"
        onClick={onToggle} // ✅ Use parent callback to control open state
      >
        <h3 className="text-lg md:text-xl font-bold text-gray-800 tracking-wide">
          {category.card.card.title}{" "}
          <span className="text-gray-500 font-medium">
            ({category.card.card.itemCards?.length || 0})
          </span>
        </h3>

        <span
          className={`text-xl font-bold transform transition-transform duration-300 ${
            isOpen ? "rotate-180 text-orange-600" : "text-gray-600"
          }`}
        >
          ▼
        </span>
      </div>

      {/* Accordion Content */}
      <ItemList category={category} isOpen={isOpen} />
    </div>
  );
};

export default RestaurantCategory;
