import React from "react";
import "../../index.css";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  render() {
    return (
      <div className="about-container px-6 md:px-16 py-12 bg-gradient-to-br from-orange-50 to-white min-h-screen text-center">
        {/* ✅ Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
          About Us
        </h1>

        {/* ✅ Subtitle */}
        <h2 className="text-xl md:text-2xl text-gray-700 mb-8">
          Meet Our Developers
        </h2>

        {/* ✅ Logged-in User Info */}
        <UserContext.Consumer>
          {({ loggedInUser }) => (
            <h3 className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold text-md mb-10 shadow-sm">
              👋 Logged in as: {loggedInUser}
            </h3>
          )}
        </UserContext.Consumer>

        {/* ✅ Team Section */}
        <div className="team-section grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center mt-10">
          {/* Your Profile (Aniket) */}
          <UserClass
            name={"Aniket Kumar Thakur"}
            role={"Full Stack Developer"}
            githubUsername={"devilmeg"} // replace with your actual GitHub username
          />

          {/* Teammate’s Profile */}
          <UserClass
            name={"Gagan Singh"}
            role={"Frontend Developer"}
            githubUsername={"GaganSingh512"} // replace this with your teammate’s GitHub handle
          />
        </div>

        {/* ✅ Footer */}
        <div className="mt-12 text-gray-600 text-sm">
          <p>
            Passionate about building modern, user-focused web applications using
            React, Redux, Tailwind CSS, and Node.js.
          </p>
          <p className="mt-2 italic text-orange-600 font-medium">
            💡 “Code together, grow together.”
          </p>
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
