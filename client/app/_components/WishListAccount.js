import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import useWishlist from "../hooks/useWishlist";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function WishListAccount() {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { addToWishList } = useWishlist();
  if (wishlist?.length === 0)
    return (
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-medium">Your Wishlist</h2>
          <span className="text-sm font-medium text-primary-600">
            Items: {wishlist.length}
          </span>
        </div>
        <p className="mt-10 text-xs font-medium text-center md:text-base text-primary-500">
          You don't have any products in your favorites list yet!!!
        </p>
        <Link
          href={"/product"}
          className="px-8 py-2 mx-auto mt-10 text-xs transition-colors border rounded-full w-fit text-primary-900 md:px-10 md:text-sm border-primary-900 hover:bg-primary-900 hover:text-primary-50"
        >
          Go to product
        </Link>
      </div>
    );

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="mb-4 text-xl font-medium">Your Wishlist</h2>
        <span className="text-sm font-medium text-primary-600">
          Items: {wishlist.length}
        </span>
      </div>
      {/* Table for PC */}
      <div className="hidden mt-8 md:block">
        <table className="w-full">
          <thead>
            <tr className="text-sm font-normal text-left text-primary-500">
              <th className="pb-2 border-b border-b-primary-200">Product</th>
              <th className="pb-2 border-b border-b-primary-200">Price</th>
              <th className="pb-2 border-b border-b-primary-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((product) => (
              <tr key={product._id} className="text-sm border-b">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 transition-colors rounded-full hover:bg-primary-900 hover:text-primary-50"
                      onClick={() => addToWishList(product)}
                    >
                      <IoCloseOutline size={20} />
                    </button>
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      loading="lazy"
                      width={400}
                      height={400}
                      className="object-cover w-24 h-24 rounded-sm"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">{product.title}</p>
                      {/* <p className="text-sm text-primary-500">
                        {product?.category?.title}
                      </p> */}
                    </div>
                  </div>
                </td>
                <td className="py-4 font-medium">{product.price}</td>
                <td className="py-4 ">
                  <button className="w-full px-4 py-2 transition-colors border rounded-full border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-50">
                    Add to cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile */}
      <div className="flex flex-col gap-3 mt-7 md:hidden">
        {wishlist.map((product) => (
          <div key={product._id} className="pb-4 border-b border-b-primary-300">
            <div className="flex items-center gap-4">
              <button>
                <IoCloseOutline size={20} />
              </button>
              <img
                src={product?.images[0]}
                alt={product.title}
                loading="lazy"
                className="w-20 h-20"
              />
              <div className="flex flex-col gap-1">
                <p className="font-medium">{product.title}</p>
                <p className="text-xs text-primary-500">
                  Category: {product.category?.title}
                </p>
                <p className="text-xs">{product.price}</p>
              </div>
            </div>
            <button className="w-full px-4 py-2 mt-4 text-xs rounded-lg bg-primary-900 text-primary-50">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
