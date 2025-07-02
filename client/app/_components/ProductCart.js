import Link from "next/link";
import React from "react";
import StarRating from "./StarRating";
import Image from "next/image";

import { FaCartPlus, FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { truncateText } from "../constants/truncateText";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCart({ product }) {
  const { addToWishList, wishlist } = useWishlist();
  const isProductInWishlist = wishlist.some(
    (item) => item._id === product?._id
  );
  return (
    <div className="relative transition-all bg-white rounded-md shadow-sm group hover:cursor-pointer shadow-primary-200 hover:shadow-lg">
      <span className="absolute top-0 left-0 z-10 px-2 py-1 text-xs rounded-sm text-primary-50 bg-primary-900">
        {product.discount ? product.discount : 0}%
      </span>
      <Link href={`/product/${product._id}`} className="relative group ">
        <Image
          loading="lazy"
          src={product?.images[0]}
          width={500}
          height={500}
          alt={product.title}
          className="object-cover w-full transition-all h-44 md:h-64 "
        />
        <Image
          loading="lazy"
          src={product?.images[1]}
          width={500}
          height={500}
          alt={product.title}
          className="absolute top-0 left-0 object-cover w-full transition-all opacity-0 h-44 md:h-64 group-hover:opacity-100 group-hover:duration-500"
        />
      </Link>
      <div className="flex flex-col gap-2 p-2 mt-2 ">
        <div className="absolute block transition-all md:hidden top-2 right-2 group-hover:block">
          <FaHeart
            onClick={() => addToWishList(product)}
            className={`cursor-pointer  hover:text-error-500 ${
              isProductInWishlist ? "text-error-500" : "text-primary-600"
            } `}
          />
        </div>
        <div className="flex flex-col text-nowrap ">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <h3 className="text-xs font-semibold md:text-sm text-primary-900">
              {truncateText(product.title, 30)}
            </h3>
            <span className="text-xs font-medium text-primary-700">
              ${product.price}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-primary-400">
              {truncateText(product.brand, 10)}
            </span>
            <span className="text-xs font-medium text-primary-500">
              {product.category.title}
            </span>
          </div>
        </div>

        <span className="text-xs text-primary-500">
          Quantity: {product.quantity}
        </span>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarRating className={"text-sm"} start={product.totalRating} />
            <span className="text-xs text-primary-400">
              ({product.ratings.length})
            </span>
          </div>
          <button className="flex items-center p-2 text-sm rounded-full md:hidden bg-primary-900 text-primary-50">
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
