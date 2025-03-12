import React from "react";
import Link from "next/link";
import { FaHeart, FaEye, FaAngleRight } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
const products = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-40%",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw",
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    price: "$960",
    oldPrice: "$1160",
    discount: "-35%",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw",
    rating: 4.2,
    reviews: 75,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: "$370",
    oldPrice: "$400",
    discount: "-30%",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw",
    rating: 4.8,
    reviews: 99,
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    price: "$375",
    oldPrice: "$400",
    discount: "-25%",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw",
    rating: 4.7,
    reviews: 99,
  },
  {
    id: 5,
    name: "S-Series Comfort Chair",
    price: "$375",
    oldPrice: "$400",
    discount: "-25%",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw",
    rating: 4.7,
    reviews: 99,
  },
  {
    id: 6,
    name: "S-Series Comfort Chair",
    price: "$375",
    oldPrice: "$400",
    discount: "-25%",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTS8cCFuOp3iSjBmxKlKl6OOzw2ftc6ODXpmA3cXp-PHyQFLV7mJVZrOzknQNd0e93tLRHiEcN28-ZsK8PQ9Pv26YKaI4Okll6YW912_T-ysE_-_y7abga7bw",
    rating: 4.7,
    reviews: 99,
  },
];
export default function ProductsListSwpier() {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={16}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div
            key={product.id}
            className="relative p-4 bg-white rounded-md group"
          >
            <span className="absolute top-0 left-0 px-2 py-1 text-xs rounded-sm text-primary-50 bg-primary-900">
              {product.discount}
            </span>
            <Link href={"#"}>
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full mt-3 rounded-md h-44"
              />
            </Link>
            <div className="absolute flex items-center gap-2 transition opacity-0 top-2 right-2 group-hover:opacity-100">
              <FaHeart className="cursor-pointer text-primary-600 hover:text-error-500" />
              <FaEye className="cursor-pointer text-primary-600 hover:text-primary-900" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-primary-900 text-nowrap">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-sm">
              <span className="text-primary-900">{product.price}</span>
              <span className="text-primary-400">{product.oldPrice}</span>
            </div>
            <div className="flex items-center mt-1 text-yellow-500">
              {"★".repeat(Math.round(product.rating))}
              <span className="ml-1 text-xs text-gray-500">
                ({product.reviews})
              </span>
            </div>

            {/* Add to Cart Button */}
            <button className="absolute bottom-0 left-0 right-0 flex items-center justify-center w-full gap-1 py-1 text-sm transition rounded-sm opacity-0 text-primary-50 bg-primary-900 group-hover:opacity-100">
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
