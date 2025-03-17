import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({ start , className}) {
  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: Math.floor(start) }).map((_, i) => (
        <FaStar key={i} color="#FBBF24" />
      ))}
      {start % 1 !== 0 && <FaStarHalfAlt color="#FBBF24" />}
    </div>
  );
}
