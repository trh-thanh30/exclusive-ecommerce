import React from "react";
import emptyCart from "../../../public/cart-empty.png";
import Link from "next/link";
import Image from "next/image";
export default function CartEmpty({ className }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Image src={emptyCart} alt="empty-cart" className="w-32 h-32" />
      <h1 className="text-2xl font-medium md:text-3xl text-primary-900">
        Your cart is empty
      </h1>
      <p className="mt-3 text-xs text-center md:text-sm text-primary-400">
        Look like you haven't added anything to your cart yet
      </p>
      <Link
        href={"/product"}
        className="px-8 py-3 mt-4 text-xs rounded-full md:text-sm text-primary-50 bg-primary-900 hover:opacity-90"
      >
        Let's add something to your cart
      </Link>
    </div>
  );
}
