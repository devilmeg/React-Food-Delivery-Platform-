import React from "react";
import "../../index.css";

const Shimmer = () => {
  const cards = Array(12).fill("");

  return (
    <div className="shimmer-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {cards.map((_, index) => (
        <div
          key={index}
          className="shimmer-card relative overflow-hidden rounded-2xl shadow-lg bg-white/70 backdrop-blur-md transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 animate-pulse"
        >
          {/* Gradient shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-70 animate-[shimmer_1.5s_infinite]"></div>

          {/* Image placeholder */}
          <div className="shimmer-img h-36 w-full bg-gray-300 rounded-t-2xl relative z-10"></div>

          {/* Content placeholder */}
          <div className="shimmer-content p-4 flex flex-col gap-2 relative z-10">
            {/* Title */}
            <div className="shimmer-title h-5 w-3/4 bg-gray-300 rounded"></div>

            {/* Description lines */}
            <div className="shimmer-line h-3 w-full bg-gray-300 rounded"></div>
            <div className="shimmer-line h-3 w-5/6 bg-gray-300 rounded"></div>

            {/* Small detail */}
            <div className="shimmer-line h-3 w-2/3 bg-gray-300 rounded mt-2"></div>

            {/* Button placeholder */}
            <div className="h-8 w-full bg-orange-400/70 rounded-xl mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
