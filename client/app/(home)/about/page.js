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
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
];
const achievements = [
  {
    title: "10.5k ",
    icon: <CiShop size={sizeIconLarge} />,
    description: "Sallers active our site",
  },
  {
    title: "33k",
    icon: <CiDollar size={sizeIconLarge} />,
    description: "Monthly Produduct Sale",
  },
  {
    title: "45.5k",
    icon: <CiBag1 size={sizeIconLarge} />,
    description: "Customer active in our site",
  },
  {
    title: "25k",
    icon: <CiCoins1 size={sizeIconLarge} />,
    description: "Anual gross sale in our site",
  },
];

const service = [
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
    description: "We reurn money within 30 days",
    icon: <GrStatusGood size={sizeIconLarge} />,
  },
];
export default function Page() {
  const iconStyle = `flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-full bg-primary-900 text-primary-50`;
  return (
    <>
      <Breadcrumb items={breadcrumb} />

      <div className="flex flex-col mt-10 gap-28">
        <div className="flex items-center justify-between">
          <section className="">
            <h1 className="mb-10 text-5xl">Our Story</h1>
            <p className="text-base max-w-[525px] text-primary-800">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.{" "}
            </p>
            <p className="mt-6 max-w-[525px] text-base text-primary-800">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </section>
          <Image
            src={AboutImg1}
            placeholder="blur"
            width={500}
            alt={"About Us"}
          />
        </div>

        <ul className="grid grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <li
              className="flex flex-col items-center p-6 transition-colors border border-gray-300 rounded-md cursor-pointer group text-primary-800 hover:bg-black hover:text-primary-50"
              key={achievement.title}
            >
              <div
                className={` ${iconStyle} group-hover:bg-white group-hover:text-primary-900`}
              >
                {achievement.icon}
              </div>
              <h3 className="text-2xl font-bold ">{achievement.title}</h3>
              <p className="mt-2 text-sm ">{achievement.description}</p>
            </li>
          ))}
        </ul>

        <Oursteam />

        <ul className="flex items-center justify-around">
          {service.map((service) => (
            <li
              className="flex flex-col items-center gap-2"
              key={service.title}
            >
              <span className={`${iconStyle}`}>{service.icon}</span>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-2 text-sm">{service.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
