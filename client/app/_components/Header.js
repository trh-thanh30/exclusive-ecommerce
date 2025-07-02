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
import { useCart } from "../context/CartContext";
import Image from "next/image";
import useFetchProducts from "../hooks/useFetchProducts";
import Spinner from "./Spinner";
import CategorySliderHome from "./CategorySliderHome";

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
  const styleIcon =
    "p-1 transition-colors rounded-full hover:bg-black hover:text-primary-50 hover:cursor-pointer";
  // const { user: userGoogle } = useGetUserWithGoogle();
  const { products, setQuery, query, loading } = useFetchProducts({
    fetchOnEmptySearch: false,
  });
  const [openSearchQuery, setOpenSearchQuery] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [dropDownHeart, setDropDownHeart] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSearchInpt, setOpenSearchInpt] = useState(false);
  const [offIntro, setOffOffIntro] = useState(false);

  const pathname = usePathname();
  const user = useSelector((state) => state.user);
  const currentUser = user.user;
  const dropdownRef = useRef(null);
  const dropdownHeartRef = useRef(null);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const { cartLength } = useCart();

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
  const handleChangeSearch = (e) => {
    setQuery({
      ...query,
      search: e.target.value,
    });
    setOpenSearchQuery(e.target.value);
  };

  return (
    <>
      {!offIntro ? <Introduce setOffOffIntro={setOffOffIntro} /> : ""}
      <header className="sticky top-[-2px] z-50 flex items-center justify-between px-3 py-5 border-b  shadow-neutral-200  bg-primary-50 md:px-12 border-b-neutral-100">
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
                href={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 ">
          <div className="relative hidden xl:block">
            <Input
              className={"!text-xs"}
              placeholder={"Search products...."}
              onChange={handleChangeSearch}
              type="search"
              icon={
                <CiSearch
                  className="rounded-full cursor-pointer hover:bg-primary-200"
                  size={sizeIcon}
                />
              }
            />
            {openSearchQuery && (
              <div className="absolute w-full h-[380px] p-3 overflow-y-scroll bg-white rounded-md shadow-lg shadow-primary-100">
                <span className="text-xs text-primary-900">
                  List of product
                </span>
                <>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      {products.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {products.map((product) => (
                            <>
                              <Link
                                href={`/product/${product?._id}`}
                                key={product?._id}
                                className="p-2 mt-2 transition-colors rounded-md hover:bg-primary-100 hover:cursor-pointer group">
                                <div className="flex items-center gap-2">
                                  <Image
                                    width={200}
                                    height={200}
                                    alt=""
                                    className="w-16 h-16 rounded-md"
                                    src={product?.images[0]}
                                  />
                                  <div className="flex flex-col w-full gap-2 text-xs font-medium">
                                    <div className="flex items-center justify-between w-full">
                                      <h3 className="text-primary-800">
                                        {product?.title}
                                      </h3>
                                      <span className="text-primary-400">
                                        ${product?.price.toFixed(2)}
                                      </span>
                                    </div>
                                    <span className="text-primary-500 group-hover:text-primary-900">
                                      {product?.category?.title}
                                    </span>
                                    <div className="flex items-center text-primary-400">
                                      <span className="pr-2 border-r border-r-primary-400">
                                        {product?.quantity}
                                      </span>
                                      <span className="pl-2">
                                        {product?.brand}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-center text-primary-900">
                          No results found
                        </p>
                      )}
                    </>
                  )}
                </>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
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
                  {wishlist.length}
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
                      className="absolute right-0 z-50 w-56 p-3 mt-2 overflow-y-scroll bg-white border rounded-md shadow-md md:p-4 border-slate-50 sm:w-[500px]">
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
                <div className="absolute w-4 h-4 text-xs text-center rounded-full -right-1 -top-1 bg-primary-900 text-primary-50">
                  {cartLength}
                </div>
              </div>

              {/* User btn */}
              {currentUser?.user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropDown((perv) => !perv)}
                    className={`${styleIcon}`}>
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
                        className="absolute right-0 z-50 px-6 py-4 mt-2 bg-white border rounded-md shadow-md border-slate-50">
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
        {/* Open search input */}
        <AnimatePresence>
          {openSearchInpt && (
            <motion.div
              initial={{ y: "-50%" }}
              animate={{ y: 0 }}
              exit={{ y: "-50%" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute left-0 z-10 w-full top-full xl:hidden">
              <div className="relative w-full">
                <Input
                  fullWidth={true}
                  placeholder={"Search some things..."}
                  onChange={handleChangeSearch}
                  type="search"
                  className={
                    "p-2 outline-none border border-primary-400 text-xs rounded-none "
                  }
                  icon={
                    <CiSearch
                      className="rounded-full cursor-pointer hover:bg-primary-200 "
                      size={sizeIcon}
                    />
                  }
                />

                {openSearchQuery && (
                  <div className="absolute w-full h-[380px] p-3 overflow-y-scroll bg-white rounded-md shadow-lg shadow-primary-100">
                    <span className="text-xs text-primary-900">
                      List of product
                    </span>
                    <>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          {products.length > 0 ? (
                            <div className="grid grid-cols-1 gap-2">
                              {products.map((product) => (
                                <>
                                  <section
                                    key={product?._id}
                                    className="p-2 mt-2 transition-colors rounded-md hover:bg-primary-100 hover:cursor-pointer group">
                                    <div className="flex items-center gap-2">
                                      <Image
                                        width={200}
                                        height={200}
                                        alt=""
                                        className="w-16 h-16 rounded-md"
                                        src={product?.images[0]}
                                      />
                                      <div className="flex flex-col w-full gap-2 text-xs font-medium">
                                        <div className="flex items-center justify-between w-full">
                                          <h3 className="text-primary-800">
                                            {product?.title}
                                          </h3>
                                          <span className="text-primary-400">
                                            ${product?.price.toFixed(2)}
                                          </span>
                                        </div>
                                        <span className="text-primary-500 group-hover:text-primary-900">
                                          {product?.category?.title}
                                        </span>
                                        <div className="flex items-center text-primary-400">
                                          <span className="pr-2 border-r border-r-primary-400">
                                            {product?.quantity}
                                          </span>
                                          <span className="pl-2">
                                            {product?.brand}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm font-medium text-center text-primary-900">
                              No results found
                            </p>
                          )}
                        </>
                      )}
                    </>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* === HERO BANNER THUMB === */}
      <CategorySliderHome />
      {/* Open menu */}
      <AnimatePresence>
        {openSideBar && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="fixed top-0 right-0 z-50 block w-64 h-full bg-white shadow-2xl rounded-l-2xl rounded-bl-2xl md:hidden">
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
            className="fixed top-0 right-0 z-50 block h-full bg-white shadow-2xl w-[300px] md:w-96 rounded-l-2xl rounded-bl-2xl">
            <RightCart onClose={() => setOpenCart(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
