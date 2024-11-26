import React from "react";
import Breadcrumb from "../_components/Breadcrumb";
import Image from "next/image";
import AboutImg1 from "@/public/about-img1.png";

import { CiShop, CiDollar, CiBag1, CiCoins1 } from "react-icons/ci";

export const metadata = {
  title: "About",
  description: "This is the about page of our website",
};

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
    icon: <CiShop />,
    description: "Sallers active our site",
  },
  {
    title: "33k",
    icon: <CiDollar />,
    description: "Monthly Produduct Sale",
  },
  {
    title: "45.5k",
    icon: <CiBag1 />,
    description: "Customer active in our site",
  },
  {
    title: "25k",
    icon: <CiCoins1 />,
    description: "Anual gross sale in our site",
  },
];

const 

export default function Page() {
  return (
    <div>
      <div className="">
        <Breadcrumb items={breadcrumb} />
      </div>
      <div className="">
        <div className="">
          <h1>Our Story</h1>
          <p>
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.{" "}
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <Image
          src={AboutImg1}
          placeholder="blur"
          width={500}
          alt={"About Us"}
        />
      </div>

      {achievements.map((achievement) => (
        <ul key={achievement.title}>
          <li>
            <span>{achievement.icon}</span>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}
