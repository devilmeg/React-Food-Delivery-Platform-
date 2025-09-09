import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css"; // Make sure the path is correct based on your folder structure
import Header from "./components/Header";
import Body from "./components/Body";
//   import RestaurantCard from "./components/Restaurantcard";
import { createBrowserRouter, RouterProvider ,Outlet} from "react-router-dom";

import About from "./components/About";
import {Link} from "react-router-dom";
import Contact from "./components/Contact";
import Error from "./components/Error";
//body
import RestaurantMenu from "./components/RestaurantMenu";

///restaurant card Component

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
        errorElement: <Error />,
      },
      { path: "/about", element: <About />, errorElement: <Error /> },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path:"/restaurant/:resId",
        element:<RestaurantMenu/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
