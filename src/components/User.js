import { useState } from "react";
import "../../index.css"; // Same CSS file

const User = ({ name, role }) => {
  const [count] = useState(0); // Example ID

  return (
    <div className="user-card bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5 w-full max-w-xs mx-auto hover:shadow-2xl transition-transform transform hover:-translate-y-2 text-center">
      
      {/* User Avatar */}
      <img
        src="https://i.pravatar.cc/150?img=5"
        alt="Profile"
        className="w-28 h-28 mx-auto rounded-full border-4 border-orange-400 mb-3 object-cover"
      />

      {/* User Info */}
      <h1 className="text-sm text-gray-500 mb-1">ID: {count}</h1>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-gray-700 font-medium">{role}</p>
      <p className="text-gray-600 text-sm mt-2">
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
};

export default User;
