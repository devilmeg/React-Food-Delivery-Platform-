import { useSelector, useDispatch } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // 🧮 Calculate total price safely
  const totalPrice = cartItems.reduce((total, item) => {
    const info = item.card?.info || item;
    return total + (info.price || info.defaultPrice || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center py-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-3 tracking-wide">
          🛒 Your Cart
        </h1>
        <p className="text-gray-600 text-lg">
          Review your added items and proceed to checkout.
        </p>
      </div>

      {/* Cart Container */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl p-8 transition-all duration-500">
        {/* Empty Cart UI */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-32 h-32 mb-4 opacity-80"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Your cart is empty 😔
            </h2>
            <p className="text-gray-500 mb-6">
              Add some tasty items to make it happy!
            </p>
            <a
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 
                         text-white font-semibold rounded-full shadow-md hover:scale-105 
                         transition-transform"
            >
              🍽️ Go to Menu
            </a>
          </div>
        ) : (
          <>
            {/* Cart Controls */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Cart Items ({cartItems.length})
              </h2>
              <button
                onClick={handleClearCart}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white 
                           font-medium rounded-full shadow-md hover:scale-105 transition-transform"
              >
                🧹 Clear Cart
              </button>
            </div>

            {/* Item List */}
            <div className="divide-y divide-gray-200">
              {/* ✅ Reusing ItemList component */}
              <ItemList category={{ card: { card: { itemCards: cartItems } } }} isOpen={true} />
            </div>

            {/* Total Summary */}
            <div className="mt-8 bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl p-6 text-center shadow-inner">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Total Amount:{" "}
                <span className="text-orange-600 font-bold">
                  ₹{(totalPrice / 100).toFixed(2)}
                </span>
              </h3>
              <p className="text-gray-600 mb-4">Including all taxes</p>

              <button
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-400 
                           text-white text-lg font-bold rounded-full shadow-lg 
                           hover:from-orange-600 hover:to-orange-500 transition-transform 
                           hover:scale-105"
                onClick={() => alert("Proceeding to checkout... 🚀")}
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
