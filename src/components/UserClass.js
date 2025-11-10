import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    const { githubUsername } = this.props;

    try {
      const res = await fetch(`https://api.github.com/users/${githubUsername}`);
      if (!res.ok) throw new Error("Failed to fetch GitHub data");

      const data = await res.json();
      this.setState({ userData: data, isLoading: false });
    } catch (err) {
      this.setState({ error: err.message, isLoading: false });
      console.error("❌ GitHub Fetch Error:", err);
    }
  }

  render() {
    const { name, role } = this.props;
    const { userData, isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-64 h-72 flex flex-col justify-center items-center">
          <div className="w-14 h-14 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4 font-medium">Loading GitHub Data...</p>
        </div>
      );
    }

    if (error || !userData) {
      return (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-64 text-center text-red-500 font-medium">
          ⚠️ Failed to load profile
        </div>
      );
    }

    return (
      <div
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl 
                   transition-transform hover:-translate-y-2 w-72 p-6 text-center"
      >
        {/* ✅ Profile Picture */}
        <img
          src={userData.avatar_url}
          alt={`${name}'s GitHub Avatar`}
          className="w-24 h-24 rounded-full mx-auto shadow-md border-4 border-orange-200"
        />

        {/* ✅ Developer Info */}
        <h3 className="mt-4 text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 font-medium">{role}</p>

        {/* ✅ GitHub Username */}
        <a
          href={userData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 text-sm font-semibold mt-2 inline-block hover:underline"
        >
          @{userData.login}
        </a>

        {/* ✅ Bio / Location */}
        <p className="text-gray-500 text-xs mt-2">
          {userData.bio ? userData.bio : "Passionate Developer 💻"}
        </p>
        {userData.location && (
          <p className="text-gray-500 text-xs mt-1">
            📍 {userData.location}
          </p>
        )}

        {/* ✅ GitHub Link Button */}
        <a
          href={userData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white text-sm 
                     font-semibold rounded-full shadow hover:bg-orange-600 transition"
        >
          View GitHub Profile
        </a>
      </div>
    );
  }
}

export default UserClass;
