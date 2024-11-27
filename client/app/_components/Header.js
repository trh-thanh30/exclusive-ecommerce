"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import Input from "./Input";
import Introduce from "./Introduce";

import { usePathname } from "next/navigation";
import { CiUser, CiShoppingCart, CiHeart, CiSearch } from "react-icons/ci";

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
  {
    icon: <CiUser size={sizeIcon} />,
  },
];

export default function Header() {
  const pathname = usePathname();
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
          <Input icon={<CiSearch size={sizeIcon} />} />
          <div className="flex items-center gap-1">
            {navIcon.map((icon, index) => (
              <span
                className="p-1 transition-colors rounded-full hover:bg-black hover:text-primary-50 hover:cursor-pointer"
                key={index}
              >
                {icon.icon}
              </span>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
