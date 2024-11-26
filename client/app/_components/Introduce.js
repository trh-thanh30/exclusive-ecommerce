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
    <div className="flex items-center justify-between p-4 text-xs text-center bg-black text-primary-50">
      <div className="flex-1 text-center">
        <span className="">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>{" "}
        <Link href={"/"} className="hover:underline">
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
