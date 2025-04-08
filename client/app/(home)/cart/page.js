"use client";
import Checkout from "@/app/_components/cart/Checkout";
import OrderComplete from "@/app/_components/cart/OrderComplete";
import ShoppingCart from "@/app/_components/cart/ShoppingCart";
import Spinner from "@/app/_components/Spinner";
import { useCart } from "@/app/context/CartContext";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { TiTick } from "react-icons/ti";

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
  const {
    loading,
    carts,
    cartLength,
    totalPriceCarts,
    handleChangeQuantity,
    handleRemoveItem,
    handleFetchCarts,
  } = useCart();
  const location = useSearchParams();
  const router = useRouter();
  const cart = location.get("cart");
  useEffect(() => {
    if (!cart || cartLength === 0) {
      router.push("/cart?cart=shopping-cart");
    }
  }, [cart, cartLength]);

  useEffect(() => {
    handleFetchCarts();
  }, []);
  const orderId = cart?.split("order-complete/")[1];
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
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
            className={`flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm   ${
              cart === "shopping-cart"
                ? "bg-primary-900 text-primary-50"
                : "text-success-50 bg-success-400"
            }  `}>
            {cart === "shopping-cart"
              ? "1"
              : (cart === "checkout" || "order-complete") && <TiTick />}
          </span>
          <span
            className={`text-xs font-medium md:text-base  ${
              cart === "shopping-cart"
                ? "text-primary-900 "
                : (cart === "checkout" || "order-complete") &&
                  "text-success-400 "
            }
            }`}>
            Shopping cart
          </span>
        </div>
        {/* 2 */}
        <div
          className={`flex flex-col items-center gap-1 md:flex-row md:gap-2 `}>
          <span
            className={`flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm text-primary-50  ${
              cart === "checkout" ? "bg-primary-900 " : " bg-primary-400"
            } ${cart?.startsWith("order-complete/") && "bg-success-400"}`}>
            {cart ? "2" : cart?.startsWith("order-complete/") && <TiTick />}
          </span>
          <span
            className={`text-xs font-medium md:text-base ${
              cart === "checkout" ? "text-primary-900" : "text-primary-400"
            } ${cart?.startsWith("order-complete/") && "text-success-400"}`}>
            Checkout details
          </span>
        </div>
        {/* 3 */}
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
          <span
            className={`flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm text-primary-50 ${
              cart?.startsWith("order-complete/")
                ? "bg-primary-900 "
                : " bg-primary-400"
            }`}>
            3
          </span>
          <span
            className={`text-xs font-medium md:text-base  ${
              cart?.startsWith("order-complete/")
                ? "text-primary-900"
                : "text-primary-400"
            }`}>
            Order complete
          </span>
        </div>
      </div>

      {/* Body */}
      <>
        {cart === "shopping-cart" && (
          <ShoppingCart
            carts={carts}
            cartItems={cartItems}
            handleRemoveItem={handleRemoveItem}
            handleChangeQuantity={handleChangeQuantity}
            totalPriceCarts={totalPriceCarts}
            cartLength={cartLength}
          />
        )}

        {cart === "checkout" && (
          <Checkout totalPriceCarts={totalPriceCarts} carts={carts} />
        )}
        {cart?.startsWith("order-complete/") && (
          <OrderComplete orderId={orderId} />
        )}
      </>
    </>
  );
}
