import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";

import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// import "../../index.css";   // ✅ Keeping your original comment

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  // ✅ State for hamburger toggle in mobile view
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //useContext concept
  const { loggedInUser } = useContext(UserContext);
  //console.log(loggedInUser);
  // console.log(data);

  //Subscribing to the store using selector hook
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div
      className="flex justify-between items-center bg-gradient-to-r from-orange-600 to-orange-400 
                 px-6 md:px-10 py-4 text-white shadow-md sticky top-0 z-50 rounded-b-xl"
    >
      {/* Logo Container */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src={LOGO_URL}
            alt="Logo"
            className="h-14 md:h-16 w-auto cursor-pointer rounded-lg"
          />
        </Link>
      </div>

      {/* Desktop Navigation Items */}
      <div className="hidden md:flex nav-Item">
        <ul className="flex gap-6 list-none items-center">
          {/* ✅ Online/Offline Status */}
          <li className="flex items-center font-semibold">
            {onlineStatus ? (
              <span
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm 
                               bg-white/20 backdrop-blur-md text-white font-medium 
                               transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-md"></span>
                Online
              </span>
            ) : (
              <span
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm 
                               bg-white/20 backdrop-blur-md text-white font-medium 
                               transition-all"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-md"></span>
                Offline
              </span>
            )}
          </li>

          {/* Nav Links */}
          <li className="cursor-pointer font-medium hover:-translate-y-0.5 hover:text-orange-100 transition">
            <Link to="/Grocery" className="text-white no-underline">
              Grocery
            </Link>
          </li>
          <li className="cursor-pointer font-medium hover:-translate-y-0.5 hover:text-orange-100 transition">
            <Link to="/" className="text-white no-underline">
              Home
            </Link>
          </li>
          <li className="cursor-pointer font-medium hover:-translate-y-0.5 hover:text-orange-100 transition">
            <Link to="/about" className="text-white no-underline">
              About Us
            </Link>
          </li>
          <li className="cursor-pointer font-medium hover:-translate-y-0.5 hover:text-orange-100 transition">
            <Link to="/contact" className="text-white no-underline">
              Contact Us
            </Link>
          </li>

          {/* Cart with badge */}
          {/* Cart with dynamic badge */}
          <li className="relative cursor-pointer font-medium hover:text-orange-100 transition">
            <Link to="/cart" className="text-white no-underline">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>

          {/* Login/Logout Button */}
          <li>
            <button
              aria-label={btnName} // ✅ Accessibility
              className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-400 
                         font-semibold text-sm text-white shadow-md hover:from-orange-700 
                         hover:to-orange-500 transition transform hover:-translate-y-0.5"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Logout")
                  : setBtnName("Login");
              }}
            >
              {btnName}
            </button>
          </li>
          <li className="px-3 py-2 font-bold border-l border-white/30">
            {loggedInUser}
          </li>
        </ul>
      </div>

      {/* ✅ Mobile Hamburger Button */}
      <div className="md:hidden flex items-center">
        <button
          aria-label="Toggle Menu"
          className="text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* ✅ Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-orange-500 shadow-lg rounded-b-xl md:hidden">
          <ul className="flex flex-col gap-4 p-6 text-white font-medium">
            <li>
              {onlineStatus ? (
                <span className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  Online
                </span>
              ) : (
                <span className="flex items-center gap-2 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  Offline
                </span>
              )}
            </li>
            <li>
              <Link to="/Grocery" onClick={() => setIsMenuOpen(false)}>
                Grocery
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li className="relative cursor-pointer font-medium hover:text-orange-100 transition">
              <Link to="/cart" className="text-white no-underline">
                Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <button
                aria-label={btnName}
                className="w-full px-5 py-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-400 
                           font-semibold text-sm text-white shadow-md hover:from-orange-700 
                           hover:to-orange-500 transition"
                onClick={() => {
                  btnName === "Login"
                    ? setBtnName("Logout")
                    : setBtnName("Login");
                  setIsMenuOpen(false);
                }}
              >
                {btnName}
              </button>
            </li>
            <li className="px-3 py-2 font-bold border-t border-white/30">
              {loggedInUser}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// this is standard way to export a component.
export default Header;
