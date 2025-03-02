import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { sizeIconPrimary } from "../constants/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RightSidebar({ onClose, navLink }) {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-primary-50 shadow-2xl z-50 transition-transform duration-300 rounded-l-2xl rounded-bl-2xl p-4 block md:hidden">
      <button className="w-full flex justify-end" onClick={onClose}>
        <FaArrowRightLong size={sizeIconPrimary} />
      </button>
      <div className="mt-5 flex flex-col gap-4 text-sm font-medium text-primary-900">
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
