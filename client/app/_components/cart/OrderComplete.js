import React from "react";
import Link from "next/link";
export default function OrderComplete() {
  return (
    <div className="flex flex-col p-4 mt-10 bg-white shadow-sm md:mt-20 md:items-center md:justify-center md:p-10">
      <span className="text-base font-medium md:text-2xl text-primary-400">
        Thank you! 🎉
      </span>
      <h1 className="mt-3 text-3xl font-medium md:mt-4 md:text-4xl text-primary-900">
        Your order has been received
      </h1>
      <div className="flex items-center gap-2 mt-5 md:gap-4 md:mt-10">
        <img
          src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
          className="w-20 h-20 md:w-28 md:h-28"
          alt=""
        />
        <img
          src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
          className="w-20 h-20 md:w-28 md:h-28"
          alt=""
        />
        <img
          src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
          className="w-20 h-20 md:w-28 md:h-28"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 mt-8 text-sm font-medium md:mt-10">
        <div className="flex gap-4">
          <span className="text-primary-500">Order code:</span>
          <span className="ml-auto text-primary-900">#123456</span>
        </div>
        <div className="flex gap-4">
          <span className="text-primary-500">Date:</span>
          <span className="ml-auto text-primary-900">October 19, 2023</span>
        </div>
        <div className="flex gap-4">
          <span className="text-primary-500">Total:</span>
          <span className="ml-auto text-primary-900">$1,345.00</span>
        </div>
        <div className="flex gap-4">
          <span className="text-primary-500">Payment method:</span>
          <span className="ml-auto text-primary-900">Credit Card</span>
        </div>
      </div>
      <Link
        href={"#"}
        className="py-3 text-sm text-center rounded-full mt-7 md:mt-10 px-14 text-primary-50 bg-primary-900 hover:opacity-90"
      >
        Purchase history
      </Link>
    </div>
  );
}
