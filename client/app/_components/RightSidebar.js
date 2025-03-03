"use client";
import React, { useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiShoppingCart, CiHeart, CiLogout } from "react-icons/ci";
import { sizeIconPrimary } from "../constants/icons";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import useSignOut from "../hooks/useSignOut";
import SpinnerMini from "./SpinnerMini";
import ButtonLink from "./ButtonLink";

export default function RightSidebar({ onClose, navLink }) {
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { loading, signout } = useSignOut();
  // Hàm xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
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
      ref={sidebarRef}
      className="fixed top-0 right-0 z-50 block h-full p-3 overflow-y-scroll transition-transform duration-300 shadow-2xl w-72 bg-primary-50 rounded-l-2xl rounded-bl-2xl md:hidden"
    >
      <button className="flex justify-end w-full py-2" onClick={onClose}>
        <FaArrowRightLong size={sizeIconPrimary} />
      </button>
      <div className="flex flex-col gap-4 mt-3 text-sm font-medium text-primary-900">
        <Link className="flex items-center justify-between " href={"#"}>
          <div className="flex items-center gap-1">
            <CiShoppingCart size={25} />
            <span>Order</span>
          </div>
          <span>2</span>
        </Link>
        <Link className="flex items-center justify-between" href={"#"}>
          <div className="flex items-center gap-1">
            <CiHeart size={25} />
            <span>Favorite</span>
          </div>
          <span>2</span>
        </Link>
        <ul className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <li>Woman’s Fashion</li>
            <FaChevronRight />
          </div>
          <li className="flex items-center justify-between">
            <li>Men’s Fashion</li>
            <FaChevronRight />
          </li>
          <Link href={"#"}>Electronics</Link>
          <Link href={"#"}>Home & Lifestyle</Link>
          <Link href={"#"}>Medicine</Link>
          <Link href={"#"}>Sports & Outdoor</Link>
          <Link href={"#"}>Baby’s & Toys</Link>
          <Link href={"#"}>Groceries & Pets</Link>
          <Link href={"#"}>Health & Beauty</Link>
          {user?.user ? (
            <div
              onClick={signout}
              className="flex items-center justify-center gap-1 px-2 py-1 text-xs text-red-500 transition-colors rounded-sm cursor-pointer bg-red-50"
            >
              <span>
                <CiLogout size={20} />
              </span>
              <span className="text-sm text-inherit ">
                {loading ? <SpinnerMini /> : "Sign Out"}
              </span>
            </div>
          ) : (
            <ButtonLink
              link={"/signin"}
              className={"text-center"}
              text={"Sign In"}
            />
          )}
        </ul>
        <hr className="w-full max-w-4xl mx-auto my-1 md:my-5 border-primary-600" />
        {navLink.map((link, index) => (
          <p key={index} className="py-1">
            {" "}
            <Link
              className={
                pathname === link.href
                  ? "border-b-[1.5px] border-primary-900 py-1"
                  : ""
              }
              href={link.href}
            >
              {link.name}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
}
