import { LOGO_URL }  from "../utils/constants";
import { useState } from "react";
import {Link} from "react-router-dom";
// import "../../index.css";
const Header=()=>{

    
    const [btnName,setBtnName]=useState("Login")

      return(
      <div className="header">
          <div className="logo-container">
          <img src={LOGO_URL}></img>
          </div>
          <div className="nav-Item">
          <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About Us</Link></li>
          <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
          <li>Cart</li>      
        <li><button className="login" onClick={()=>{
            btnName==="Login"?setBtnName("Logout"):setBtnName("Login");
        }}>{btnName}</button></li>
          </ul>
          </div>
      </div>
      );
  };
  export default Header;// this is standard way to export a component.