"use client";
import React from "react";
import Breadcrumb from "../../_components/Breadcrumb";
import useCreateContact from "@/app/hooks/useCreateContact";
import banner from "@/public/banner-about.jpg";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa";
import home from "../../IconSvg/home.svg";
import phone from "../../IconSvg/phone.svg";
import mail from "../../IconSvg/mail.svg";
import Link from "next/link";
import { LOCATION } from "@/app/constants/api";
import Achivment from "@/app/_components/Achivment";
import SpinnerMini from "@/app/_components/SpinnerMini";
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Contact Us", href: "/contact" },
];

export default function Page() {
  const { loading, formData, handleChange, handleSubmitContact } =
    useCreateContact();
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <h1 className="mt-10 text-xl font-medium text-center md:text-3xl md:mt-12 text-primary-900">
        Exclusive – Where Elegance, Sustainability, and Quality Come Together.
      </h1>
      <p className="mt-4 text-xs italic text-center md:text-sm text-primary-400 md:mt-6">
        At Exclusive, we curate a collection of premium products that seamlessly
        blend timeless elegance, modern sophistication, and enduring quality.
        Designed with meticulous craftsmanship and sustainable principles, our
        pieces enhance every aspect of life while maintaining a perfect balance
        between tradition and contemporary innovation
      </p>
      <div className="grid items-center md:grid-cols-2 grid-cols-1 md:gap-16  mt-6 md:mt-12 bg-neutral-50 md:h-[314px] h-[440px]">
        <Image
          src={banner}
          alt="Banner"
          loading="lazy"
          className="object-cover h-full"
        />
        <div className="flex flex-col gap-2 px-3 md:gap-5 md:px-0">
          <h2 className="text-xl font-medium md:text-3xl text-primary-900">
            About Us
          </h2>
          <div className="flex flex-col gap-1 text-xs md:text-sm xl:w-[452px] w-full text-primary-600 ">
            <span>
              Exclusive is a gift & decorations store based in QuangNinh,
              Vietnam. Est since 2024
            </span>
            <span>
              Our customer service is always prepared to support you 24/7
            </span>
          </div>
          <Link
            href={`/about`}
            className="flex items-center gap-1 text-sm font-medium md:text-base text-primary-700 hover:underline group"
          >
            Read More{" "}
            <FaAngleRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
      <h2 className="mt-4 text-xl font-medium text-center md:mt-12 md:text-3xl">
        Contact Us
      </h2>
      <div className="grid grid-cols-1 gap-6 mt-6 md:mt-10 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center py-4 text-base font-medium rounded-md px-9 bg-[#F3F5F7]">
          <Image src={home} alt="home icon" />
          <span className="mt-4 text-primary-500">Address</span>
          <p className="mt-2 text-center text-primary-900">
            Cao Son 2, Quang Ninh City, Viet Nam
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-4 text-base font-medium rounded-md px-9 bg-[#F3F5F7]">
          <Image src={phone} alt="phone icon" />
          <span className="mt-4 text-primary-500">Contact Us</span>
          <p className="mt-2 text-center text-primary-900">+84 344 24 79 18</p>
        </div>
        <div className="flex flex-col items-center justify-center py-4 text-base font-medium rounded-md px-9 bg-[#F3F5F7]">
          <Image src={mail} alt="mail icon" />
          <span className="mt-4 text-primary-500">Email</span>
          <p className="mt-2 text-center text-primary-900">
            support@exclusive.com
          </p>
        </div>
      </div>
      <div className="flex flex-col max-w-6xl gap-6 mx-auto mt-6 mb-8 md:gap-8 md:mt-10 md:mb-16 md:flex-row">
        {/* Form Section */}
        <div className="flex-1">
          <form onSubmit={handleSubmitContact}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mb-4 text-sm border rounded-md outline-none text-primary-600"
              placeholder="Your Name"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-4 text-sm border rounded-md outline-none text-primary-600"
              placeholder="Your Email"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full h-32 p-2 mb-4 text-sm border rounded-md outline-none text-primary-600"
              placeholder="Your message"
            ></textarea>

            <button
              type="submit"
              className="px-5 py-3 text-xs transition-colors border rounded-full md:px-6 md:text-sm text-primary-900 border-primary-900 hover:bg-primary-900 hover:text-primary-50"
            >
              {loading ? <SpinnerMini /> : "Send Message"}
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="relative flex-1">
          <iframe
            src={LOCATION}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-sm shadow-md h-[300px] md:h-full"
          ></iframe>
        </div>
      </div>
      <Achivment />
    </>
  );
}
