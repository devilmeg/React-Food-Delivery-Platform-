import React from "react";
import "../../index.css"; // Same CSS file
import UserContext from "../utils/UserContext";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      userInfo: {
        name: "Dummy Name",
        location: "Dummy Location",
        avatar_url: "https://i.pravatar.cc/150?img=12", // default image
      },
    };
    // console.log("Child constructor is called");
  }

  async componentDidMount() {
    // console.log("Child component did mount is called");
    try {
      const data = await fetch("https://api.github.com/users/devilmeg");
      const json = await data.json();

      this.setState({
        userInfo: json,
      });
      console.log(json);
    } catch (error) {
      console.error("Failed to fetch GitHub user:", error);
    }
  }

  render() {
    // console.log("Child render is called");
    const { name, location, avatar_url } = this.state.userInfo;
    const { role } = this.props;

    return (
      <div className="user-card bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5 w-full max-w-xs hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer text-center">
        
        {/* User Avatar */}
        <img
          src={avatar_url}
          alt="Profile"
          className="user-avatar w-28 h-28 mx-auto rounded-full border-4 border-orange-400 mb-4 object-cover"
        />
        {/* <div>
          loggedInUser
          <UserContext.Consumer>
            {({loggedInUser})=><h1 className="font-bold text-lg">{loggedInUser}</h1>}
          </UserContext.Consumer>
        </div> */}
        {/* User Name & Location */}
        <h3 className="user-name text-xl font-bold text-gray-900 truncate">{name}</h3>
        <h4 className="user-location text-gray-500 text-sm">{location}</h4>

        {/* Role */}
        <p className="user-role mt-2 text-gray-700 font-medium">{role}</p>

        {/* Description */}
        <p className="user-desc mt-3 text-gray-600 text-sm">
          Passionate about building scalable applications and crafting delightful user experiences.
        </p>

        {/* ✅ Connect Button */}
        <button
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl font-semibold 
                     hover:from-orange-600 hover:to-orange-500 transition-all shadow-md hover:shadow-lg"
          onClick={() => alert(`Connecting with ${name}...`)}
        >
          Connect
        </button>
      </div>
    );
  }
}

export default UserClass;
