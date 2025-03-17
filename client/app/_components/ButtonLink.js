import Link from "next/link";
import React from "react";

export default function ButtonLink({ link, text, className }) {
  return (
    <Link
      href={link}
      className={`p-2  bg-primary-900 text-white rounded-xl text-[10px]  hover:opacity-95 ${className}`}
    >
      {text}
    </Link>
  );
}
