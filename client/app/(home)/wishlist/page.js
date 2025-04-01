"use client";
import Breadcrumb from "@/app/_components/Breadcrumb";
import { truncateText } from "@/app/constants/truncateText";
import { useWishlist } from "@/app/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";

const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "wishlist", href: "/wishlist" },
];
export default function Page() {
  const { addToWishList, wishlist, removeAllWishlist } = useWishlist();

  if (wishlist?.length === 0)
    return (
      <>
        <Breadcrumb items={breadcrumb} />
        <div className="px-2 py-5 bg-white rounded-md md:px-3 mt-7 md:py-8 md:mt-10">
          {/* Header wishlist */}
          <div className="flex items-center justify-between w-full">
            <h1 className="text-base font-medium md:text-2xl">
              Favourite List
            </h1>
            <p className="mt-1 text-xs font-medium md:mt-2 md:text-sm text-primary-900">
              {wishlist.length} Items
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 mt-8 md:mt-12">
            <div className="p-4 rounded-full bg-primary-50">
              <CiHeart size={46} />
            </div>
            <span className="text-xs text-center md:text-sm text-primary-400">
              You don't have any products in your favourite list yet!!!
            </span>
            <Link
              href={"/product"}
              className="px-6 py-3 text-xs transition-colors border rounded-full text-primary-900 border-primary-900 hover:bg-primary-900 hover:text-primary-50"
            >
              Let's add product to favourite list
            </Link>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="px-2 py-5 bg-white rounded-md md:px-3 mt-7 md:py-8 md:mt-10">
        {/* Header wishlist */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-medium md:text-2xl">
              Favourite List
            </h1>
            <p className="mt-1 text-xs md:mt-2 md:text-sm text-primary-900">
              {wishlist.length} Items
            </p>
          </div>

          <button
            onClick={removeAllWishlist}
            className="px-4 py-2 text-xs transition-colors bg-white border rounded-full md:text-sm md:px-7 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-50"
          >
            Delete All
          </button>
        </div>

        {/* Products */}
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="flex items-center gap-2 pb-3 border-b md:gap-6 mt-7 border-b-primary-200"
          >
            <Image
              className="w-24 h-24 rounded-sm md:w-40 md:h-44"
              src={product?.images[0]}
              alt="Product"
              loading="lazy"
              width={500}
              height={600}
              style={{ aspectRatio: "16/9", objectFit: "cover" }}
            />
            <div className="flex flex-col w-full gap-2 md:gap-4">
              <div className="flex items-center justify-between text-primary-900">
                <h1 className="text-xs font-medium md:text-xl">
                  {truncateText(product?.title, 30)}
                </h1>
                <h2 className="hidden text-base font-semibold md:block">
                  ${product?.price}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium md:text-base ">
                <span className="text-primary-400">
                  {product.category.title}
                </span>
                <span className="h-5 border border-primary-300"></span>
                <span
                  className={` ${
                    product.quantity > 0 ? "text-emerald-400" : "text-error-500"
                  }`}
                >
                  {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-0 text-sm md:gap-4 md:justify-normal md:text-base">
                <button className="flex items-center gap-1 hover:cursor-default">
                  <FaHeart className="text-error-500" />
                  <span className="text-primary-400">Save</span>
                </button>
                <button
                  onClick={() => addToWishList(product)}
                  className="flex items-center gap-1 transition-colors text-primary-400 hover:text-primary-900"
                >
                  <GoTrash /> <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Footer chech-out */}
        <div className="flex items-center justify-between mt-6 text-nowrap">
          <Link
            href={"/product"}
            className="flex items-center gap-0 text-xs font-medium md:gap-1 md:text-base text-primary-900 group"
          >
            <MdKeyboardArrowLeft
              size={25}
              className="transition-transform group-hover:-translate-x-2"
            />
            Continue Shopping
          </Link>
          <Link
            className="px-4 py-2 text-xs font-medium rounded-full md:px-8 md:text-base text-primary-50 bg-primary-900 hover:opacity-95"
            href={"/check-out"}
          >
            All Check Out
          </Link>
        </div>
      </div>
    </>
  );
}
