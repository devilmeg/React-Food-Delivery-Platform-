import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import "../../index.css"; // Keep your original CSS import
import UserContext from "../utils/UserContext";
import { useState,useContext } from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
    // console.log("constructor is called");
  }

  // componentDidMount(){
  //     console.log("component did mount is called");
  // }

  render() {
    // console.log("render is called");
    return (
      <div className="about-container px-6 md:px-16 py-10 bg-gray-50 min-h-screen">
        {/* About Title */}
        <h1 className="about-title text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-4">
          About Us
        </h1>

        {/* About Subtitle */}
        <h2 className="about-subtitle text-xl md:text-2xl text-gray-700 text-center mb-10">
          Our Team
        </h2>

        <div>
          loggedInUser
          {/* ✅ Correct usage of Context.Consumer */}
          <UserContext.Consumer>
            {({ loggedInUser }) => (
              <h3 className="text-lg font-semibold border border-gray-300 rounded-lg shadow-sm p-2 text-center mb-6">
                {loggedInUser}
              </h3>
            )}
          </UserContext.Consumer>
        </div>

        {/* Team Section */}
        <div className="team-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {/* Functional Component */}
          <User name={"Aniket Kumar Thakur"} role={"FullStack Developer"} />

          {/* Class Component */}
          <UserClass name={"Aniket Kumar Thakur"} role={"FullStack Developer"} />

          {/* You can add more team members here dynamically */}
        </div>
      </div>
    );
  }
}

export default About;

// Functional version (kept for reference)
// const About = () => {
//   return (
//     <div className="about-container px-6 md:px-16 py-10 bg-gray-50 min-h-screen">
//       <h1 className="about-title text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-4">
//         About Us
//       </h1>
//       <h2 className="about-subtitle text-xl md:text-2xl text-gray-700 text-center mb-10">
//         Our Team
//       </h2>
//       <div className="team-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
//         <User name={"Aniket Kumar Thakur"} role={"FullStack Developer"} />
//         <UserClass name={"Aniket Kumar Thakur"} role={"FullStack Developer"} />
//       </div>
//     </div>
//   );
// }; 
// this is for functional component
