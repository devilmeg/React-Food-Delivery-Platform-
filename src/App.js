import React, { useEffect, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";
import UserContext from "./utils/UserContext";
import LocationContext from "./utils/LocationContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  const [userName, setUserName] = useState();
  const [locationData, setLocationData] = useState({
    city: "Fetching...",
    coords: { lat: null, lon: null },
  });

  // 🔹 Authentication simulation
  useEffect(() => {
    const data = { name: "Aniket" };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        {/* 🌍 Global Location Provider */}
        <LocationContext.Provider value={{ ...locationData, setLocationData }}>
          <div className="app">
            <Header />
            <Outlet />
          </div>
        </LocationContext.Provider>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body />, errorElement: <Error /> },
      { path: "/about", element: <About />, errorElement: <Error /> },
      { path: "/contact", element: <Contact /> },
      { path: "/restaurant/:resId", element: <RestaurantMenu /> },
      { path: "/Grocery", element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense> },
      { path: "/cart", element: <Cart /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
