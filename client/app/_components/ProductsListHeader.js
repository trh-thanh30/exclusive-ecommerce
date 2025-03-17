import React from "react";
import TimeSell from "./TimeSell";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default function ProductsListHeader({ name, link, haveTime }) {
  return (
    <div className="flex items-center justify-between mb-7 md:mb-10">
      <div className="flex items-center gap-2 md:gap-20">
        <h2 className="pl-1 text-base font-medium border-l-2 rounded-sm md:border-l-8 text-nowrap md:text-xl xl:text-3xl text-primary-900 border-l-primary-900">
          {name}
        </h2>
        {haveTime && <TimeSell />}
      </div>
      <Link
        href={"/product"}
        className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
      >
        View All
        <FaAngleRight className="transition-transform group-hover:translate-x-2" />
      </Link>
    </div>
  );
}
