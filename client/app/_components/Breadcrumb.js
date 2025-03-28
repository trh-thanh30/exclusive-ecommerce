"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaAngleRight } from "react-icons/fa6";

export default function Breadcrumb({ items, className }) {
  const pathname = usePathname();
  return (
    <ul
      className={`flex items-center text-xs md:text-sm ${className} bg-white shadow-sm md:p-5 p-3 rounded-lg `}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {index > 0 && (
            <span className="px-2 text-primary-400">
              <FaAngleRight />
            </span>
          )}
          <Link
            className={` ${
              index === items.length - 1
                ? "font-medium text-primary-900 cursor-default"
                : "text-primary-400 hover:underline hover:text-primary-900 transition-colors"
            }`}
            href={item.href}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
