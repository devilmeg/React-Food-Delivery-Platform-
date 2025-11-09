import React, { useEffect, useState, lazy, Suspense } from "react";

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
import Shimmer from "./components/Shimmer";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
// import Grocery from "./components/Grocery";
import Cart from "./components/Cart";

///restaurant card Component

//Lazy loading for components
const Grocery=lazy(()=>import("./components/Grocery"));

const AppLayout = () => {
  const [userName,setUserName]=useState();
  //Authentication code
  useEffect(()=>{

    const data={
      name:"Aniket"
    };
    setUserName(data.name);
  },[]);
  return (
    //store as props....redux
    <Provider store={appStore}>
      <UserContext.Provider value ={{loggedInUser:userName,setUserName:setUserName}}>
    <div className="app">
      <Header />
      <Outlet />
    </div>
    </UserContext.Provider>
    </Provider>
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
        element:<RestaurantMenu/>,
      },{
        path:"/Grocery",
        element:<Suspense fallback={<h1>loading...</h1>}><Grocery/></Suspense>,
      },
      {
        path:"/cart",
        element:<Cart/>,

      }
    ],
    errorElement: <Error />,
  },
]); 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
 