"use client";
import React, { useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { sizeIconPrimary } from "../constants/icons";
import { FaArrowRightLong } from "react-icons/fa6";

import cartEmpty from "../../public/cart-empty.png";
import Link from "next/link";
import SpinnerDoot from "./SpinnerDoot";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import CartEmpty from "./cart/CartEmpty";

export default function RightCart({ onClose }) {
  const sidebarCart = useRef(null);
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
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarCart.current && !sidebarCart.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <SpinnerDoot />
      </div>
    );

  return (
    <div
      ref={sidebarCart}
      className="fixed top-0 right-0 z-50 flex flex-col h-full p-3 shadow-2xl w-[300px] md:w-96 bg-primary-50 rounded-l-2xl"
    >
      <button className="flex justify-end w-full py-2" onClick={onClose}>
        <FaArrowRightLong size={sizeIconPrimary} />
      </button>
      {/* Header */}
      <div className="flex items-center justify-between mt-3 md:mt-4">
        <h1 className="text-xl font-medium">Cart</h1>
        <span className="text-sm text-primary-500">{cartLength}</span>
      </div>

      {cartLength ? (
        <>
          {/* List of carts */}
          <div className="flex-1 overflow-y-auto">
            {carts.map((cart, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 border-b border-b-primary-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="object-cover w-24 h-24 rounded-sm"
                    src={cart?.product?.images[0]}
                    alt={cart?.product?.title}
                    loading="lazy"
                  />

                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-medium">
                      {cart?.product?.title}
                    </h2>
                    <span className="text-xs text-primary-400">
                      Color: {cart.color}
                    </span>
                    <div className="flex items-center justify-between px-2 py-2 text-sm border rounded-md md:py-3 w-28 border-primary-300">
                      <button
                        className="hover:cursor-pointer disabled:cursor-not-allowed"
                        onClick={() =>
                          handleChangeQuantity(index, "decrement", cart._id)
                        }
                        disabled={cart.quantity === 1}
                      >
                        <FiMinus />
                      </button>
                      <span>{cart.quantity}</span>
                      <button
                        className="hover:cursor-pointer disabled:cursor-not-allowed"
                        onClick={() =>
                          handleChangeQuantity(index, "increment", cart._id)
                        }
                        disabled={cart.quantity === cart?.product?.quantity}
                      >
                        <GoPlus />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-xs font-medium">
                    ${cart?.price * cart.quantity}
                  </h3>
                  <IoMdClose
                    onClick={() => handleRemoveItem(cart._id)}
                    className="w-5 h-5 transition-colors rounded-full text-primary-500 hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-4 mt-auto ">
            <div className="flex items-center justify-between text-sm font-medium md:text-base">
              <span className="f">Price (Total)</span>
              <span className="">${totalPriceCarts}</span>
            </div>
            <div className="flex items-center justify-between mt-3 text-xs font-medium text-primary-500">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex items-center justify-between py-4 mt-3 text-base font-medium md:text-lg border-y border-y-primary-300">
              <span>Subtotal</span>
              <span>${totalPriceCarts}</span>
            </div>
            <Link
              href={"/cart?cart=checkout"}
              className="block w-full p-2 mt-4 text-sm text-center rounded-md bg-primary-900 text-primary-50"
            >
              Checkout
            </Link>
          </div>
        </>
      ) : (
        <CartEmpty className={"h-screen"} />
      )}
    </div>
  );
}
