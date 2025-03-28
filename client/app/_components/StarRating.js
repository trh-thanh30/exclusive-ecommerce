import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ start, className }) {
  const fullStars = Math.floor(start); // Số lượng sao đầy
  const hasHalfStar = start % 1 !== 0; // Kiểm tra có sao nửa không
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Số sao rỗng

  return (
    <div className={`flex ${className}`}>
      {/* Hiển thị sao đầy */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={i} color="#FBBF24" />
      ))}
      
      {/* Hiển thị sao nửa nếu có */}
      {hasHalfStar && <FaStarHalfAlt color="#FBBF24" />}
      
      {/* Hiển thị sao rỗng */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={i + fullStars + 1} color="#FBBF24" />
      ))}
    </div>
  );
}
