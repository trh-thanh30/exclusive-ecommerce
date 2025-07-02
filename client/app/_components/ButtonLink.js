import Link from "next/link";
import React from "react";

export default function ButtonLink({ link, text, className }) {
  return (
    <Link
      href={link}
      className={`p-2 bg-primary-900 text-white rounded-md text-[10px] md:text-xs  hover:opacity-90 ${className}`}>
      {text}
    </Link>
  );
}
