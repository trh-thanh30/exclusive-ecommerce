import React from "react";
import { FaStar } from "react-icons/fa";

export default function Star({ star, setStar, hoverStar, setHoverStar }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-1">
      {Array.from({ length: 5 }).map((s, i) => (
        <label key={i} htmlFor="">
          <input type="radio" name="star" hidden value={i + 1} />
          <FaStar
            onClick={() => setStar(i + 1)}
            onMouseLeave={() => setHoverStar(null)}
            onMouseEnter={() => setHoverStar(i + 1)}
            className={`cursor-pointer md:text-3xl text-2xl ${
              star >= i + 1 ? "text-yellow-400" : "text-primary-400"
            } ${
              hoverStar >= i + 1
                ? "text-yellow-400 transition-colors"
                : "text-primary-400"
            }`}
          />
        </label>
      ))}
    </div>
  );
}
