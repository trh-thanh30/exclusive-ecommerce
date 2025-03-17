"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Input from "./Input";
import Introduce from "./Introduce";

import { usePathname } from "next/navigation";
import {
  CiUser,
  CiShoppingCart,
  CiHeart,
  CiSearch,
  CiMenuBurger,
} from "react-icons/ci";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import ButtonLink from "./ButtonLink";
import Dropdown from "./Dropdown";
import RightSidebar from "./RightSidebar";
import DropDownHeart from "./DropDownHeart";
import RightCart from "./RightCart";

const navLink = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/contact",
    name: "Contact",
  },
  {
    href: "/about",
    name: "About",
  },
  {
    href: "/blog",
    name: "Blog",
  },
];

const sizeIcon = 20;

export default function Header() {
  // const { user: userGoogle } = useGetUserWithGoogle();
  const [dropDown, setDropDown] = useState(false);
  const [dropDownHeart, setDropDownHeart] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSearchInpt, setOpenSearchInpt] = useState(false);
  const [offIntro, setOffOffIntro] = useState(false);
  const styleIcon =
    "p-1 transition-colors rounded-full hover:bg-black hover:text-primary-50 hover:cursor-pointer";
  const pathname = usePathname();
  const user = useSelector((state) => state.user);
  const currentUser = user.user;
  const dropdownRef = useRef(null);
  const dropdownHeartRef = useRef(null);

  // Hàm xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownHeartRef.current &&
        !dropdownHeartRef.current.contains(event.target)
      ) {
        setDropDownHeart(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenSidebar = () => {
    setOpenSideBar((sidebar) => !sidebar);
  };
  const handleOpenSearch = () => {
    setOpenSearchInpt((search) => !search);
  };
  const handleOpenHeart = () => {
    setDropDownHeart((heart) => !heart);
  };
  const handleOpenCart = () => {
    setOpenCart((cart) => !cart);
  };
  return (
    <>
      {!offIntro ? <Introduce setOffOffIntro={setOffOffIntro} /> : ""}
      <header className="sticky top-[-2px] z-50 flex items-center justify-between p-3 py-5 border-b shadow-neutral-50 bg-neutral-50 md:px-8 border-b-neutral-100">
        <Logo logoDefault={true} />

        <ul className="items-center hidden gap-10 text-sm font-medium md:flex text-primary-800">
          {navLink.map((link, index) => (
            <li key={index} className="py-1 nav-link">
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
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 ">
          <div className="hidden xl:block">
            <Input
              icon={
                <CiSearch
                  className="rounded-full cursor-pointer hover:bg-primary-200"
                  size={sizeIcon}
                />
              }
            />
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0 md:gap-1">
              <CiSearch
                onClick={handleOpenSearch}
                className={`block xl:hidden ${styleIcon}`}
                size={26}
              />
              {/* Heart btn */}
              <div ref={dropdownHeartRef} className="relative group">
                <button onClick={handleOpenHeart} className={`${styleIcon} `}>
                  <CiHeart size={sizeIcon} />
                </button>
                {/* Them vao se hien ra con khong thi se khong hioen */}
                <div className="absolute w-4 h-4 text-xs text-center rounded-full -right-1 -top-1 bg-primary-900 text-primary-50">
                  2
                </div>
                {/* Dropdown xuất hiện khi click */}
                <AnimatePresence>
                  {dropDownHeart && (
                    <motion.div
                      initial={{
                        scale: 0,
                        opacity: 0,
                        transformOrigin: "top right",
                      }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 z-50 w-56 p-2 mt-2 overflow-x-scroll bg-white border rounded-md shadow-md md:p-4 border-slate-50 md:w-96"
                    >
                      <DropDownHeart />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart btn */}
              <div className="relative">
                <button onClick={handleOpenCart} className={`${styleIcon}`}>
                  <CiShoppingCart size={sizeIcon} />
                </button>
                <div className="absolute right-0 w-4 h-4 text-[10px] text-center rounded-full md:-right-1 -top-1 bg-primary-900 text-primary-50">
                  2
                </div>
              </div>

              {/* User btn */}
              {currentUser?.user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropDown((perv) => !perv)}
                    className={`${styleIcon}`}
                  >
                    <CiUser size={sizeIcon} />
                  </button>
                  <AnimatePresence>
                    {dropDown && (
                      <motion.div
                        initial={{
                          scale: 0,
                          opacity: 0,
                          transformOrigin: "top right",
                        }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{
                          scale: 0,
                          opacity: 0,
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 z-50 p-4 mt-2 bg-white border rounded-md shadow-md border-slate-50"
                      >
                        <Dropdown user={currentUser.user} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <ButtonLink link={"/signup"} text={"Sign Up"} />
              )}
            </div>
            <CiMenuBurger
              onClick={handleOpenSidebar}
              size={sizeIcon}
              className="block cursor-pointer md:hidden"
            />
          </div>
        </div>
        <AnimatePresence>
          {openSearchInpt && (
            <motion.div
              initial={{ y: "-50%" }}
              animate={{ y: 0 }}
              exit={{ y: "-50%" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute left-0 z-10 block w-full top-full md:hidden"
            >
              <Input
                fullWidth={true}
                placeholder={"Search some things..."}
                className={
                  "w-full p-2 outline-none border border-primary-400 text-xs rounded-none "
                }
                icon={
                  <CiSearch
                    className="rounded-full cursor-pointer hover:bg-primary-200 "
                    size={sizeIcon}
                  />
                }
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Open menu */}
      <AnimatePresence>
        {openSideBar && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="fixed top-0 right-0 z-50 block w-64 h-full bg-white shadow-2xl rounded-l-2xl rounded-bl-2xl md:hidden"
          >
            <RightSidebar
              navLink={navLink}
              onClose={() => setOpenSideBar(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Open Cart */}
      <AnimatePresence>
        {openCart && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="fixed top-0 right-0 z-50 block h-full bg-white shadow-2xl w-72 rounded-l-2xl rounded-bl-2xl"
          >
            <RightCart onClose={() => setOpenCart(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
