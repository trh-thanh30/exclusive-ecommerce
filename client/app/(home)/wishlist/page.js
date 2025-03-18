import Breadcrumb from "@/app/_components/Breadcrumb";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "wishlist", href: "/wishlist" },
];
export default function Page() {
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="px-3 py-5 bg-white rounded-md mt-7 md:py-8 md:mt-10">
        {/* Header wishlist */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-medium md:text-2xl">Favourite List</h1>
            <p className="mt-1 text-xs md:mt-2 md:text-sm text-primary-900">3 Items</p>
          </div>

          <button className="px-4 py-2 text-xs transition-colors bg-white border rounded-full md:text-sm md:px-7 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-50">
            Delete All
          </button>
        </div>

        {/* Products */}
        <div className="flex items-center gap-1 pb-3 border-b md:gap-6 mt-7 border-b-primary-200">
          <img
            className="w-24 h-24 md:w-40 md:h-40"
            src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
            alt=""
          />
          <div className="flex flex-col w-full gap-2 md:gap-4">
            <div className="flex items-center justify-between text-primary-900">
              <h1 className="text-xs font-medium md:text-xl">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h1>
              <h2 className="hidden text-base font-semibold md:block">$10.00</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium md:text-base ">
              <span className="text-primary-400">$10.00</span>
              <span className="h-5 border border-primary-300"></span>
              <span className="text-emerald-400">In Stock</span>
            </div>
            <div className="flex items-center justify-between gap-0 text-sm md:gap-4 md:justify-normal md:text-base">
              <button className="flex items-center gap-1 hover:cursor-default">
                <FaHeart className="text-error-500" />
                <span className="text-primary-400">Save</span>
              </button>
              <button className="flex items-center gap-1 transition-colors text-primary-400 hover:text-primary-900">
                <GoTrash /> <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

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
