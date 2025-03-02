import Link from "next/link";
import React from "react";

const options = [
  {
    name: "English",
    value: "english",
  },
  {
    name: "Viet Nam",
    value: "vietnam",
  },
];

export default function Introduce() {
  return (
    <div className="flex items-center justify-between p-3 bg-neutral-900 md:p-4 ">
      <div className="flex-1 text-left md:text-center">
        <span className="text-xs text-left text-primary-50 md:text-sm ">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>{" "}
        <Link
          href={"/"}
          className="text-xs hover:underline md:text-sm text-primary-50"
        >
          Shop Now
        </Link>
      </div>
      <select
        className="ml-auto text-xs bg-transparent border-none outline-none cursor-pointer text-primary-50"
        id=""
      >
        {options.map((option, index) => (
          <option className="bg-black" key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
