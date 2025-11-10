import React, { useEffect, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Header from "./components/Header";
import Body from "./components/Body";
import {
  createHashRouter,   // ✅ Changed from createBrowserRouter
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Error from "./components/Error";
import UserContext from "./utils/UserContext";
import LocationContext from "./utils/LocationContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

// ✅ Fully Lazy-Loaded Routes
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Cart = lazy(() => import("./components/Cart"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Grocery = lazy(() => import("./components/Grocery"));
const Shimmer = lazy(() => import("./components/Shimmer"));

const AppLayout = () => {
  const [userName, setUserName] = useState();
  const [locationData, setLocationData] = useState({
    city: "Fetching...",
    coords: { lat: null, lon: null },
  });

  // Simulate logged-in user
  useEffect(() => {
    const data = { name: "Aniket" };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <LocationContext.Provider value={{ ...locationData, setLocationData }}>
          <div className="app">
            <Header />
            {/* Fallback while lazy routes load */}
            <Suspense fallback={<h1 className="text-center mt-10 text-orange-600">Loading...</h1>}>
              <Outlet />
            </Suspense>
          </div>
        </LocationContext.Provider>
      </UserContext.Provider>
    </Provider>
  );
};

// ✅ Define routes with createHashRouter (fixes 404 issue on GitHub Pages)
const appRouter = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body />, errorElement: <Error /> },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1 className="text-center mt-10 text-orange-600">Loading About...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1 className="text-center mt-10 text-orange-600">Loading Contact...</h1>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense fallback={<h1 className="text-center mt-10 text-orange-600">Loading Menu...</h1>}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/Grocery",
        element: (
          <Suspense fallback={<h1 className="text-center mt-10 text-orange-600">Loading Grocery...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1 className="text-center mt-10 text-orange-600">Loading Cart...</h1>}>
            <Cart />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

// ✅ Render the router
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
