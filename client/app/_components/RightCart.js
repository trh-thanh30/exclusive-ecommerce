"use client";
import React, { useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { sizeIconPrimary } from "../constants/icons";
import { FaArrowRightLong } from "react-icons/fa6";
export default function RightCart({ onClose }) {
  const sidebarCart = useRef(null);
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

  return (
    <div
      ref={sidebarCart}
      className="fixed top-0 right-0 z-50 flex flex-col h-full p-3 shadow-2xl w-72 bg-primary-50 rounded-l-2xl"
    >
      <button className="flex justify-end w-full py-2" onClick={onClose}>
        <FaArrowRightLong size={sizeIconPrimary} />
      </button>
      {/* Header */}
      <div className="flex items-center justify-between mt-3 md:mt-4">
        <h1 className="text-xl font-medium">Cart</h1>
        <span className="text-sm text-primary-500">2</span>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between py-4 border-b border-b-primary-300">
          <div className="flex items-center gap-4">
            <img
              className="object-cover w-24 h-24 rounded-sm"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpNN_25XTGVvH0SheXyxi0PysKyq7lqiW1g&s"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-medium">Tray Table</h2>
              <span className="text-xs text-primary-400">Color: Black</span>
              <div className="flex items-center justify-between p-1 text-sm border rounded-md border-primary-300">
                <FiMinus />
                <span>2</span>
                <GoPlus />
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-medium">$19.19</h3>
            <IoMdClose className="text-primary-500 hover:cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Total - Luôn ở cuối */}
      <div className="pt-4 mt-auto border-t border-primary-300">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span>Price (Total)</span>
          <span className="font-medium">$39.38</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span>Shipping</span>
          <span className="font-medium">$0.00</span>
        </div>
        <div className="flex items-center justify-between py-4 mt-3 text-sm font-medium border-y border-y-primary-300">
          <span>Subtotal</span>
          <span>$39.38</span>
        </div>
        <Link
          href={"/checkout"}
          className="block w-full p-2 mt-4 text-sm text-center rounded-md bg-primary-900 text-primary-50"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
