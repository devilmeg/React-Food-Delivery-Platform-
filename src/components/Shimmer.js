import React from "react";
import "../../index.css";

const Shimmer = () => {
  // Create an array to render multiple shimmer cards
  const cards = Array(12).fill("");

  return (
    <div className="shimmer-container">
      {cards.map((_, index) => (
        <div key={index} className="shimmer-card">
          {/* Image placeholder */}
          <div className="shimmer-img"></div>

          <div className="shimmer-content">
            {/* Title placeholder */}
            <div className="shimmer-title"></div>

            {/* Description placeholders */}
            <div className="shimmer-line"></div>
            <div className="shimmer-line short"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
