"use client";
import CartEmpty from "@/app/_components/cart/CartEmpty";
import Checkout from "@/app/_components/cart/Checkout";
import OrderComplete from "@/app/_components/cart/OrderComplete";
import ShoppingCart from "@/app/_components/cart/ShoppingCart";
import { useCart } from "@/app/context/CartContext";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const cartItems = [
  {
    id: 1,
    name: "Tray Table",
    color: "Black",
    price: 19.0,
    quantity: 2,
    image:
      "https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png", // Thay bằng ảnh thật
  },
  {
    id: 2,
    name: "Tray Table",
    color: "Red",
    price: 19.0,
    quantity: 2,
    image:
      "https://trh-thanh30.github.io/demo-category/assets/img/product/product-2.png",
  },
  {
    id: 3,
    name: "Table lamp",
    color: "Gold",
    price: 39.0,
    quantity: 1,
    image:
      "https://trh-thanh30.github.io/demo-category/assets/img/product/product-3.png",
  },
];
export default function Page() {
  const location = useSearchParams();
  const router = useRouter();
  const cart = location.get("cart");
  useEffect(() => {
    if (!cart) {
      router.push("/cart?cart=shopping-cart");
    }
  }, [cart]);
  const {
    loading,
    carts,
    cartLength,
    totalPriceCarts,
    handleChangeQuantity,
    handleRemoveItem,
    handleFetchCarts,
  } = useCart();
  useEffect(() => {
    handleFetchCarts();
  }, []);
  return (
    <>
      {/* Header */}
      <h1 className="mt-1 text-3xl font-medium text-center md:mt-3 md:text-4xl text-primary-900">
        Cart
      </h1>
      <div className="flex items-center justify-center gap-3 mt-6 sm:gap-10 md:gap-28 md:mt-11 text-nowrap">
        {/* 1 */}
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
          <span
            className={`flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm  text-primary-50 ${
              cart === "shopping-cart" ? "bg-primary-900 " : " bg-primary-400"
            } `}
          >
            1
          </span>
          <span
            className={`text-xs font-medium md:text-base  ${
              cart === "shopping-cart"
                ? "text-primary-900 "
                : " text-primary-400"
            }`}
          >
            Shopping cart
          </span>
        </div>
        {/* 2 */}
        <div
          className={`flex flex-col items-center gap-1 md:flex-row md:gap-2 `}
        >
          <span
            className={`flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm text-primary-50  ${
              cart === "checkout" ? "bg-primary-900 " : " bg-primary-400"
            }`}
          >
            2
          </span>
          <span
            className={`text-xs font-medium md:text-base ${
              cart === "checkout" ? "text-primary-900" : "text-primary-400"
            }`}
          >
            Checkout details
          </span>
        </div>
        {/* 3 */}
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
          <span
            className={`flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm text-primary-50 ${
              cart === "order-complete" ? "bg-primary-900 " : " bg-primary-400"
            }`}
          >
            3
          </span>
          <span
            className={`text-xs font-medium md:text-base  ${
              cart === "order-complete"
                ? "text-primary-900"
                : "text-primary-400"
            }`}
          >
            Order complete
          </span>
        </div>
      </div>

      {/* Body */}
      <>
        {cartLength ? (
          <>
            {cart === "shopping-cart" && (
              <ShoppingCart
                carts={carts}
                cartItems={cartItems}
                handleRemoveItem={handleRemoveItem}
                handleChangeQuantity={handleChangeQuantity}
                totalPriceCarts={totalPriceCarts}
              />
            )}
            {cart === "checkout" && <Checkout />}
            {cart === "order-complete" && <OrderComplete />}
          </>
        ) : (
          <CartEmpty className={"md:mt-20 mt-10"}/>
        )}
      </>
    </>
  );
}
