import React from "react";
import { CiBag1, CiCoins1, CiDollar, CiShop } from "react-icons/ci";
const sizeIconLarge = 24;
const achievements = [
  {
    title: "10.5k ",
    icon: <CiShop size={sizeIconLarge} />,
    description: "Sellers active on our site",
  },
  {
    title: "33k",
    icon: <CiDollar size={sizeIconLarge} />,
    description: "Monthly Product Sales",
  },
  {
    title: "45.5k",
    icon: <CiBag1 size={sizeIconLarge} />,
    description: "Active customers on our site",
  },
  {
    title: "25k",
    icon: <CiCoins1 size={sizeIconLarge} />,
    description: "Annual gross sales",
  },
];

export default function Achivment() {
  return (
    <>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {achievements.map((achievement) => (
          <li
            key={achievement.title}
            className="flex flex-col items-center p-6 transition border border-gray-300 rounded-md group text-primary-800 hover:bg-primary-900 hover:cursor-pointer hover:text-white"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 transition rounded-full bg-primary-900 text-primary-50 group-hover:bg-primary-50 group-hover:text-primary-900">
              {achievement.icon}
            </div>
            <h3 className="text-xl font-bold md:text-2xl">
              {achievement.title}
            </h3>
            <p className="mt-2 text-sm text-center">
              {achievement.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
