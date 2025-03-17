import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { GrStatusGood } from "react-icons/gr";
import { SlEarphonesAlt } from "react-icons/sl";

const sizeIconLarge = 24;
const services = [
  {
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
    icon: <CiDeliveryTruck size={sizeIconLarge} />,
  },
  {
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
    icon: <SlEarphonesAlt size={sizeIconLarge} />,
  },
  {
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
    icon: <GrStatusGood size={sizeIconLarge} />,
  },
];
export default function Service() {
  return (
    <ul className="flex flex-col items-center justify-around gap-4 md:flex-row md:gap-6">
      {services.map((service) => (
        <li
          key={service.title}
          className="flex flex-col items-center text-center"
        >
          <span className="flex items-center justify-center w-10 h-10 mb-2 rounded-full md:w-12 md:h-12 md:mb-4 bg-primary-900 text-primary-50">
            {service.icon}
          </span>
          <h3 className="text-base font-bold md:text-xl">{service.title}</h3>
          <p className="mt-0 text-xs md:mt-2 md:text-sm">
            {service.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
