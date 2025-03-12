import React from "react";
import TimeSell from "./TimeSell";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function ProductsListHeader({ name, link, haveTime }) {
  return (
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-20">
        <h2 className="pl-1 text-3xl font-medium border-l-8 rounded-sm text-primary-900 border-l-primary-900">
          {name}
        </h2>
        {haveTime && <TimeSell />}
      </div>
      <Link
        href={link}
        className="flex items-center gap-1 text-base md:text-base text-primary-700 hover:underline group"
      >
        View All
        <FaAngleRight className="transition-transform group-hover:translate-x-2" />
      </Link>
    </div>
  );
}
