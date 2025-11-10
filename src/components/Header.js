import { LOGO_URL } from "../utils/constants";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import LocationContext from "../utils/LocationContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  const { city, setLocationData } = useContext(LocationContext);

  // 🔹 Get user location + reverse geocode city
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
            );
            const data = await res.json();
            const cityName =
              data.city ||
              data.locality ||
              data.principalSubdivision ||
              "Unknown Area";

            setLocationData({
              city: cityName,
              coords: { lat, lon },
            });
          } catch (err) {
            console.error("⚠️ Reverse geocode failed:", err);
            setLocationData({
              city: "Location unavailable",
              coords: { lat, lon },
            });
          }
        },
        (error) => {
          console.warn("⚠️ Geolocation permission denied:", error);
          setLocationData({
            city: "Access denied",
            coords: { lat: null, lon: null },
          });
        }
      );
    } else {
      setLocationData({
        city: "Geolocation not supported",
        coords: { lat: null, lon: null },
      });
    }
  }, [setLocationData]);

  return (
    <div
      className="flex justify-between items-center bg-gradient-to-r from-orange-600 to-orange-400 
                 px-6 md:px-10 py-4 text-white shadow-md sticky top-0 z-50 rounded-b-xl"
    >
      {/* 🍔 Logo + City Location */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <img
            src={LOGO_URL}
            alt="Logo"
            className="h-12 md:h-14 w-auto cursor-pointer rounded-lg drop-shadow-md"
          />
        </Link>

        {/* 📍 Location Chip */}
        <div
          className="flex items-center gap-2 bg-white/25 px-3 py-1 rounded-full shadow-md
                     backdrop-blur-md border border-white/20 hover:scale-[1.03] transition-all cursor-pointer"
          title="Detected via browser location"
        >
          <span>📍</span>
          <span className="truncate max-w-[140px] font-medium">{city}</span>
        </div>
      </div>

      {/* 🧭 Navigation (Desktop) */}
      <div className="hidden md:flex items-center">
        <ul className="flex gap-6 list-none items-center">
          {/* ✅ Online Status */}
          <li>
            <span
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                onlineStatus
                  ? "bg-green-500/30 text-white"
                  : "bg-red-500/30 text-white"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  onlineStatus ? "bg-green-400" : "bg-red-400"
                } animate-pulse`}
              ></span>
              {onlineStatus ? "Online" : "Offline"}
            </span>
          </li>

          {/* 🔗 Links */}
          <li><Link to="/" className="hover:text-orange-100">Home</Link></li>
          <li><Link to="/Grocery" className="hover:text-orange-100">Grocery</Link></li>
          <li><Link to="/about" className="hover:text-orange-100">About</Link></li>
          <li><Link to="/contact" className="hover:text-orange-100">Contact</Link></li>

          {/* 🛒 Cart */}
          <li className="relative">
            <Link to="/cart" className="text-white no-underline">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>

          {/* 🔐 Login / Logout */}
          <li>
            <button
              aria-label={btnName}
              className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md
                         border border-white/20 font-semibold text-sm text-white
                         hover:bg-white/30 transition shadow-md"
              onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
            >
              {btnName}
            </button>
          </li>

          {/* 👤 Logged User */}
          <li className="px-3 py-2 font-bold border-l border-white/30">
            {loggedInUser}
          </li>
        </ul>
      </div>

      {/* 📱 Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button
          className="text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>
    </div>
  );
};

export default Header;
