"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Input from "./Input";
import Introduce from "./Introduce";

import { usePathname } from "next/navigation";
import { CiUser, CiShoppingCart, CiHeart, CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import ButtonLink from "./ButtonLink";
import useGetUserWithGoogle from "../hooks/useGetUserWithGoogle";
import Dropdown from "./Dropdown";

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
const navIcon = [
  {
    icon: <CiHeart size={sizeIcon} />,
  },
  {
    icon: <CiShoppingCart size={sizeIcon} />,
  },
];

export default function Header() {
  // const { user: userGoogle } = useGetUserWithGoogle();
  const styleIcon =
    "p-1 transition-colors rounded-full hover:bg-black hover:text-primary-50 hover:cursor-pointer";
  const pathname = usePathname();
  const user = useSelector((state) => state.user);
  const currentUser = user.user;
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
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
  return (
    <>
      <Introduce />
      <header className="flex items-center justify-between px-8 py-5 border-b border-b-primary-300">
        <Logo />

        <ul className="flex items-center gap-10 text-base text-primary-800">
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

        <div className="flex items-center gap-4">
          <Input
            icon={
              <CiSearch
                className="rounded-full cursor-pointer hover:bg-primary-200"
                size={sizeIcon}
              />
            }
          />
          <div className="flex items-center gap-1">
            {navIcon.map((icon, index) => (
              <span className={`${styleIcon}`} key={index}>
                {icon.icon}
              </span>
            ))}
            {currentUser.username ? (
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
                      className="absolute right-0 mt-2"
                    >
                      <Dropdown user={currentUser} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <ButtonLink link={"/signup"} text={"Sign Up"} />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
