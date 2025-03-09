import React from "react";
import Breadcrumb from "../../_components/Breadcrumb";
import Image from "next/image";
import AboutImg1 from "@/public/about-img1.png";
import {
  CiShop,
  CiDollar,
  CiBag1,
  CiCoins1,
  CiDeliveryTruck,
} from "react-icons/ci";
import { SlEarphonesAlt } from "react-icons/sl";
import { GrStatusGood } from "react-icons/gr";
import Oursteam from "../../_components/Oursteam";
import Achivment from "@/app/_components/Achivment";

export const metadata = {
  title: "About",
  description: "This is the about page of our website",
};

const sizeIconLarge = 24;

const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

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

export default function Page() {
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="flex flex-col gap-10 px-1 mt-4 md:mt-10 md:gap-20 md:px-12 lg:px-24">
        <div className="flex flex-col items-center justify-between gap-6 xl:flex-row md:gap-10">
          <section className="max-w-lg text-center md:text-left">
            <h1 className="mb-3 text-3xl font-bold md:mb-6 md:text-4xl">
              Our Story
            </h1>
            <p className="text-sm md:text-base text-primary-800">
              Launched in 2015, Exclusive is South Asia’s premier online
              shopping marketplace. Exclusive has over 10,500 sellers, 300
              brands, and serves 3 million customers across the region.
            </p>
            <p className="mt-2 text-sm md:mt-4 md:text-base text-primary-800">
              With more than 1 million products, Exclusive offers a diverse
              assortment in categories ranging from consumer electronics to
              fashion and lifestyle.
            </p>
          </section>
          <Image
            src={AboutImg1}
            placeholder="blur"
            width={500}
            alt="About Us"
            className="w-full rounded-sm md:w-auto"
          />
        </div>

        <Achivment />

        <Oursteam />

        <ul className="flex flex-col items-center justify-around gap-4 xl:flex-row md:gap-6">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex flex-col items-center text-center"
            >
              <span className="flex items-center justify-center w-10 h-10 mb-2 rounded-full md:w-12 md:h-12 md:mb-4 bg-primary-900 text-primary-50">
                {service.icon}
              </span>
              <h3 className="text-base font-bold md:text-xl">
                {service.title}
              </h3>
              <p className="mt-0 text-xs md:mt-2 md:text-sm">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
