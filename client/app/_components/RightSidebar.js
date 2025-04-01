"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleRight, FaChevronRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiShoppingCart, CiHeart, CiLogout } from "react-icons/ci";
import { sizeIconPrimary } from "../constants/icons";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import useSignOut from "../hooks/useSignOut";
import SpinnerMini from "./SpinnerMini";
import ButtonLink from "./ButtonLink";
const categories = [
  {
    name: "Woman's Fashion",
    link: "#",
    subcategories: ["T-Shirts", "Jeans", "Shoes", "Accessories", "T-Shirts"],
  },
  {
    name: "Men's Fashion",
    link: "#",
    subcategories: ["T-Shirts", "Jeans", "Shoes", "Accessories"],
  },
  { name: "Electronics", link: "#" },
  { name: "Home & Lifestyle", link: "#" },
  { name: "Medicine", link: "#" },
  { name: "Sports & Outdoor", link: "#" },
  { name: "Baby's & Toys", link: "#" },
  { name: "Groceries & Pets", link: "#" },
  { name: "Health & Beauty", link: "#" },
];
export default function RightSidebar({ onClose, navLink }) {
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { loading, signout } = useSignOut();
  const [openCategory, setOpenCategory] = useState(null);
  const toggleDropdown = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };
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
        <Link className="flex items-center justify-between " href={"/cart"}>
          <div className="flex items-center gap-1">
            <CiShoppingCart size={25} />
            <span>Cart</span>
          </div>
          <span>2</span>
        </Link>
        <Link className="flex items-center justify-between" href={"/wishlist"}>
          <div className="flex items-center gap-1">
            <CiHeart size={25} />
            <span>Favorite</span>
          </div>
          <span>2</span>
        </Link>
        <ul className="flex flex-col gap-4">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                href={category.link}
                className="flex items-center justify-between py-2 text-sm font-medium cursor-pointer text-primary-900"
                onClick={() => toggleDropdown(index)}
              >
                {category.name}
                <div className="transition-all duration-300">
                  {category.subcategories ? (
                    openCategory === index ? (
                      <span className="">
                        <FaAngleDown />
                      </span>
                    ) : (
                      <span className="">
                        <FaAngleRight />
                      </span>
                    )
                  ) : null}
                </div>
              </Link>
              <ul
                className={`pl-5 space-y-1 overflow-hidden transition-all duration-300 border-dotted list-disc ${
                  openCategory === index
                    ? "max-h-screen opacity-100 translate-y-0 "
                    : "max-h-0 opacity-0 -translate-y-1"
                }`}
              >
                {category.subcategories?.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="py-1 text-xs cursor-pointer xl:text-sm text-primary-800"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </li>
          ))}
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
