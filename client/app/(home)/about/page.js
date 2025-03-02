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

export const metadata = {
  title: "About",
  description: "This is the about page of our website",
};

const sizeIconLarge = 24;

const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

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
      <div className="flex flex-col md:mt-10 mt-4 md:gap-20 gap-10 px-1 md:px-12 lg:px-24">
        <div className="flex flex-col xl:flex-row items-center justify-between md:gap-10 gap-6">
          <section className="max-w-lg text-center md:text-left">
            <h1 className="md:mb-6 mb-3 md:text-4xl text-3xl font-bold">
              Our Story
            </h1>
            <p className="md:text-base text-sm text-primary-800">
              Launched in 2015, Exclusive is South Asia’s premier online
              shopping marketplace. Exclusive has over 10,500 sellers, 300
              brands, and serves 3 million customers across the region.
            </p>
            <p className="md:mt-4 mt-2 md:text-base text-sm text-primary-800">
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
            className="w-full md:w-auto rounded-sm"
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <li
              key={achievement.title}
              className="flex flex-col items-center p-6 border border-gray-300 rounded-md text-primary-800 hover:bg-black hover:text-white transition"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary-900 text-primary-50 rounded-full">
                {achievement.icon}
              </div>
              <h3 className="md:text-2xl text-xl font-bold">{achievement.title}</h3>
              <p className="mt-2 text-sm text-center">
                {achievement.description}
              </p>
            </li>
          ))}
        </ul>

        <Oursteam />

        <ul className="flex flex-col xl:flex-row items-center justify-around md:gap-6 gap-4">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex flex-col items-center text-center"
            >
              <span className="flex items-center justify-center md:w-12 md:h-12 w-10 h-10 md:mb-4 mb-2 bg-primary-900 text-primary-50 rounded-full">
                {service.icon}
              </span>
              <h3 className="md:text-xl text-base font-bold">{service.title}</h3>
              <p className="md:mt-2 mt-0 md:text-sm text-xs">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
