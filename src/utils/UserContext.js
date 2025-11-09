// src/utils/UserContext.js
import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Defalut User", // default value
});

export default UserContext;
