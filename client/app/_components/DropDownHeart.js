import Image from "next/image";
import Link from "next/link";
import React from "react";
import { truncateText } from "../constants/truncateText";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function DropDownHeart() {
  const { wishlist } = useSelector((state) => state.wishlist);
  if (wishlist.length === 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <h3 className="mt-4 text-base font-medium md:text-xl md:mt-6 text-primary-900">
          Favourite List
        </h3>
        <span className="mt-1 text-xs">{wishlist?.length} item</span>
        <div className="p-3 mt-4 rounded-full md:mt-6 bg-primary-200">
          <CiHeart size={28} />
        </div>
        <p className="mt-3 text-xs text-center md:mt-6 text-primary-400">
          You don't have any products in your favorites list yet!!!
        </p>
        <span className="pb-3 mt-2 text-xs text-center text-primary-700">
          Explore more and shortlist some items
        </span>
      </div>
    );
  return (
    <div className="max-h-[400px]">
      <div className="flex items-center justify-between mt-3 text-xs md:mt-4 md:text-sm">
        <span className="font-medium text-primary-900">
          You have {wishlist.length} items
        </span>
        <Link
          href={"/wishlist"}
          className="transition-colors text-primary-500 hover:underline hover:text-primary-900"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2 pb-1 mt-4 border-b md:mt-6 md:pb-3 sm:grid-cols-3 border-b-primary-200">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="flex flex-col gap-1 pb-2 border-b md:border-b-none md:border-b-white border-b-primary-300 md:pb-0"
          >
            <Link href={`/product/${product._id}`}>
              <Image
                src={product?.images[0]}
                alt="Product"
                loading="lazy"
                className="object-cover w-full rounded-sm h-36"
                width={500}
                height={600}
                style={{ aspectRatio: "16/9", objectFit: "cover" }}
              />
            </Link>
            <span className="text-xs text-nowrap text-primary-500">
              {truncateText(product.title, 16)}
            </span>
            <div className="flex items-center justify-between ">
              <span className="text-xs font-medium text-primary-900 md:text-sm">
                ${product.price}
              </span>
              <span className="text-[12px] text-nowrap text-primary-400">
                {truncateText(product.brand, 10)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pb-3 mt-2 md:mt-3">
        <button className="p-2 text-xs md:p-3 rounded-3xl text-primary-50 bg-primary-900">
          Check Out All
        </button>
      </div>
    </div>
  );
}
