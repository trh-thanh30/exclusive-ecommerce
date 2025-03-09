import React from "react";
import Breadcrumb from "../../_components/Breadcrumb";
import Input from "@/app/_components/Input";
import {
  CiSearch,
  CiUser,
  CiCalendarDate,
  CiShoppingTag,
} from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import banner from "../../../public/banner.jpg";
import Image from "next/image";
export const metadata = {
  title: "Blog",
  description: "To read and inform about us",
};
const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];
export default function Page() {
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr] md:gap-8 gap-4 md:mt-8 mt-4">
        {/* Blog sidebar */}
        <div className="flex flex-col">
          <Input
            placeholder={"Search blog...."}
            fullWidth={false}
            icon={<CiSearch />}
          />
          <section className="mt-5 md:mt-11">
            <h2 className="text-xl font-medium text-primary-900">Categories</h2>
            <ul className="flex flex-col gap-4 mt-4 text-sm md:gap-8 md:mt-8 text-primary-500">
              <li className="flex items-center justify-between ">
                <Link className="hover:underline" href={"#"}>
                  Crafts
                </Link>
                <span>1</span>
              </li>
              <li className="flex items-center justify-between ">
                <Link className="hover:underline" href={"#"}>
                  Design
                </Link>
                <span>2</span>
              </li>
              <li className="flex items-center justify-between ">
                <Link className="hover:underline" href={"#"}>
                  Handmade
                </Link>
                <span>2</span>
              </li>
              <li className="flex items-center justify-between ">
                <Link className="hover:underline" href={"#"}>
                  Interior
                </Link>
                <span>3</span>
              </li>
              <li className="flex items-center justify-between ">
                <Link className="hover:underline" href={"#"}>
                  Wood
                </Link>
                <span>4</span>
              </li>
            </ul>
          </section>
          <section className="mt-5 md:mt-11">
            <h2 className="text-xl font-medium text-primary-900">
              Recent Posts
            </h2>
            <Link
              href={"#"}
              className="flex items-center gap-1 p-1 mt-2 transition-colors rounded-md shadow-sm hover:bg-primary-200"
            >
              <Image
                placeholder="blur"
                alt="banner"
                className="rounded-md"
                src={banner}
                width={80}
                height={80}
              />

              <div className="text-xs">
                <p className=" text-primary-900">
                  Going all-in with millennial Going all-in with millennial
                  design
                </p>
                <span className="text-primary-500">03 Aug 2022</span>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-1 p-2 mt-2 transition-colors rounded-md shadow-sm hover:bg-primary-200"
            >
              <Image
                placeholder="blur"
                alt="banner"
                className="rounded-md"
                src={banner}
                width={80}
                height={80}
              />

              <div className="text-xs">
                <p className=" text-primary-900">
                  Going all-in with millennial Going all-in with millennial
                  design
                </p>
                <span className="text-primary-500">03 Aug 2022</span>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-1 p-2 mt-2 transition-colors rounded-md shadow-sm hover:bg-primary-200"
            >
              <Image
                placeholder="blur"
                alt="banner"
                className="rounded-md"
                src={banner}
                width={80}
                height={80}
              />

              <div className="text-xs">
                <p className=" text-primary-900">
                  Going all-in with millennial Going all-in with millennial
                  design
                </p>
                <span className="text-primary-500">03 Aug 2022</span>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-1 p-2 mt-2 transition-colors rounded-md shadow-sm hover:bg-primary-200"
            >
              <Image
                placeholder="blur"
                alt="banner"
                className="rounded-md"
                src={banner}
                width={80}
                height={80}
              />

              <div className="text-xs">
                <p className=" text-primary-900">
                  Going all-in with millennial Going all-in with millennial
                  design
                </p>
                <span className="text-primary-500">03 Aug 2022</span>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-1 p-2 mt-2 transition-colors rounded-md shadow-sm hover:bg-primary-200"
            >
              <Image
                placeholder="blur"
                alt="banner"
                className="rounded-md"
                src={banner}
                width={80}
                height={80}
              />

              <div className="text-xs">
                <p className=" text-primary-900">
                  Going all-in with millennial Going all-in with millennial
                  design
                </p>
                <span className="text-primary-500">03 Aug 2022</span>
              </div>
            </Link>
          </section>
        </div>
        {/* Blog content */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <section className="p-3 rounded-md shadow-sm h-fit">
            <Link href={"#"}>
              <Image
                className="rounded-md"
                src={banner}
                placeholder="blur"
                alt="banner"
              />
            </Link>
            <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
              <span className="flex items-center gap-1 ">
                <CiUser size={20} />
                Admin
              </span>
              <span className="flex items-center gap-1 ">
                <CiCalendarDate size={20} />
                14 Oct 2022
              </span>
              <span className="flex items-center gap-1 ">
                <CiShoppingTag size={20} />
                Wood
              </span>
            </div>
            <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
              Going all-in with millennial design
            </h1>
            <p className="my-2 text-xs md:text-sm text-primary-500 w-">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices.
            </p>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
            >
              Read More{" "}
              <FaAngleRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </section>
          <section className="p-3 rounded-md shadow-sm h-fit">
            <Link href={"#"}>
              <Image
                className="rounded-md"
                src={banner}
                placeholder="blur"
                alt="banner"
              />
            </Link>
            <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
              <span className="flex items-center gap-1 ">
                <CiUser size={20} />
                Admin
              </span>
              <span className="flex items-center gap-1 ">
                <CiCalendarDate size={20} />
                14 Oct 2022
              </span>
              <span className="flex items-center gap-1 ">
                <CiShoppingTag size={20} />
                Wood
              </span>
            </div>
            <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
              Going all-in with millennial design
            </h1>
            <p className="my-2 text-xs md:text-sm text-primary-500 w-">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices.
            </p>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
            >
              Read More{" "}
              <FaAngleRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </section>
          <section className="p-3 rounded-md shadow-sm h-fit">
            <Link href={"#"}>
              <Image
                className="rounded-md"
                src={banner}
                placeholder="blur"
                alt="banner"
              />
            </Link>
            <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
              <span className="flex items-center gap-1 ">
                <CiUser size={20} />
                Admin
              </span>
              <span className="flex items-center gap-1 ">
                <CiCalendarDate size={20} />
                14 Oct 2022
              </span>
              <span className="flex items-center gap-1 ">
                <CiShoppingTag size={20} />
                Wood
              </span>
            </div>
            <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
              Going all-in with millennial design
            </h1>
            <p className="my-2 text-xs md:text-sm text-primary-500 w-">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices.
            </p>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
            >
              Read More{" "}
              <FaAngleRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </section>
          <section className="p-3 rounded-md shadow-sm h-fit">
            <Link href={"#"}>
              <Image
                className="rounded-md"
                src={banner}
                placeholder="blur"
                alt="banner"
              />
            </Link>
            <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
              <span className="flex items-center gap-1 ">
                <CiUser size={20} />
                Admin
              </span>
              <span className="flex items-center gap-1 ">
                <CiCalendarDate size={20} />
                14 Oct 2022
              </span>
              <span className="flex items-center gap-1 ">
                <CiShoppingTag size={20} />
                Wood
              </span>
            </div>
            <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
              Going all-in with millennial design
            </h1>
            <p className="my-2 text-xs md:text-sm text-primary-500 w-">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices.
            </p>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
            >
              Read More{" "}
              <FaAngleRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </section>
          <section className="p-3 rounded-md shadow-sm h-fit">
            <Link href={"#"}>
              <Image
                className="rounded-md"
                src={banner}
                placeholder="blur"
                alt="banner"
              />
            </Link>
            <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
              <span className="flex items-center gap-1 ">
                <CiUser size={20} />
                Admin
              </span>
              <span className="flex items-center gap-1 ">
                <CiCalendarDate size={20} />
                14 Oct 2022
              </span>
              <span className="flex items-center gap-1 ">
                <CiShoppingTag size={20} />
                Wood
              </span>
            </div>
            <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
              Going all-in with millennial design
            </h1>
            <p className="my-2 text-xs md:text-sm text-primary-500 w-">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices.
            </p>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
            >
              Read More{" "}
              <FaAngleRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </section>
          <section className="p-3 rounded-md shadow-sm h-fit">
            <Link href={"#"}>
              <Image
                className="rounded-md"
                src={banner}
                placeholder="blur"
                alt="banner"
              />
            </Link>
            <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
              <span className="flex items-center gap-1 ">
                <CiUser size={20} />
                Admin
              </span>
              <span className="flex items-center gap-1 ">
                <CiCalendarDate size={20} />
                14 Oct 2022
              </span>
              <span className="flex items-center gap-1 ">
                <CiShoppingTag size={20} />
                Wood
              </span>
            </div>
            <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
              Going all-in with millennial design
            </h1>
            <p className="my-2 text-xs md:text-sm text-primary-500 w-">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices.
            </p>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
            >
              Read More{" "}
              <FaAngleRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </section>
          <section className="p-3 rounded-md shadow-sm h-fit">
            <Link href={"#"}>
              <Image
                className="rounded-md"
                src={banner}
                placeholder="blur"
                alt="banner"
              />
            </Link>
            <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
              <span className="flex items-center gap-1 ">
                <CiUser size={20} />
                Admin
              </span>
              <span className="flex items-center gap-1 ">
                <CiCalendarDate size={20} />
                14 Oct 2022
              </span>
              <span className="flex items-center gap-1 ">
                <CiShoppingTag size={20} />
                Wood
              </span>
            </div>
            <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
              Going all-in with millennial design
            </h1>
            <p className="my-2 text-xs md:text-sm text-primary-500 w-">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices.
            </p>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
            >
              Read More{" "}
              <FaAngleRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </section>
          <section className="p-3 rounded-md shadow-sm h-fit">
            <Link href={"#"}>
              <Image
                className="rounded-md"
                src={banner}
                placeholder="blur"
                alt="banner"
              />
            </Link>
            <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
              <span className="flex items-center gap-1 ">
                <CiUser size={20} />
                Admin
              </span>
              <span className="flex items-center gap-1 ">
                <CiCalendarDate size={20} />
                14 Oct 2022
              </span>
              <span className="flex items-center gap-1 ">
                <CiShoppingTag size={20} />
                Wood
              </span>
            </div>
            <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
              Going all-in with millennial design
            </h1>
            <p className="my-2 text-xs md:text-sm text-primary-500 w-">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
              mauris vitae ultricies leo integer malesuada nunc. In nulla
              posuere sollicitudin aliquam ultrices.
            </p>
            <Link
              href={"#"}
              className="flex items-center gap-1 text-sm md:text-base text-primary-700 hover:underline group"
            >
              Read More{" "}
              <FaAngleRight className="transition-transform group-hover:translate-x-2" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
