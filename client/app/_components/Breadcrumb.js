"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb({ items }) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <ul className="flex items-center text-sm">
      {items.map((item, index) => (
        <li key={index}>
          {index > 0 && <span className="mx-2 text-slate-500">/</span>}
          <Link
            className={`hover:underline ${
              pathname === item.href ? "text-primary-900" : "text-slate-500"
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
