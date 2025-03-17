"use client";
import Breadcrumb from "@/app/_components/Breadcrumb";
import { useParams } from "next/navigation";
import img1 from "../../../../public/img1.svg";
import img2 from "../../../../public/img2.svg";
import img3 from "../../../../public/img3.svg";
import img4 from "../../../../public/img4.svg";
import Image from "next/image";
import { useState } from "react";
import StarRating from "@/app/_components/StarRating";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import truck from "../../../IconSvg/truck.svg";
import returnicon from "../../../IconSvg/return.svg";
import ProductsListSwpier from "@/app/_components/ProductsListSwpier";
import Reviews from "@/app/_components/Reviews";
import ProductDescription from "@/app/_components/ProductDescription";
const dataImg = [
  {
    index: 0,
    src: img1,
    alt: "Product",
  },
  {
    index: 1,
    src: img2,
    alt: "Product",
  },
  {
    index: 2,
    src: img3,
    alt: "Product",
  },
  {
    index: 3,
    src: img4,
    alt: "Product",
  },
];
const colors = [
  {
    index: 0,
    name: "black",
  },
  {
    index: 1,
    name: "green",
  },
  {
    index: 2,
    name: "red",
  },
];
export default function ProductDetails() {
  const params = useParams();
  const [image, setImage] = useState(dataImg[0].src);
  const [colorGet, setColorGet] = useState(colors[0].name);
  const [activeOption, setActiveOption] = useState("description");
  const handleChangeImage = (index) => {
    setImage(dataImg[index].src);
  };
  const handleChangeColor = (name) => {
    setColorGet(name);
  };

  const { id } = params;
  const breadcrumb = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Categories",
      href: "/product",
    },
    {
      name: id,
      href: `/blog/${id}`,
    },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      {/* Product */}
      <div className="grid items-center grid-cols-1 md:grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr] md:mt-20 mt-10">
        {/* Left img */}
        <section className="flex flex-col-reverse items-center justify-center h-full gap-2 lg:gap-8 md:gap-4 md:flex-col-reverse md:items-center md:justify-center lg:flex-row lg:justify-normal">
          <div className="flex gap-2 md:gap-4 lg:flex-col md:flex-row">
            {dataImg.map((img, index) => (
              <Image
                key={img.index}
                onClick={() => handleChangeImage(index)}
                src={img.src}
                className={`p-2 transition-all bg-white border-[1.2px] rounded-md md:w-28 md:h-28 w-14 h-14 hover:border-[1.2px]  hover:border-primary-800 border-primary-300 
                ${
                  img.src === image
                    ? "border-[1.2px] opacity-70 cursor-default border-primary-800"
                    : "hover:scale-105 hover:cursor-pointer"
                }
                  `}
                alt={img.alt}
              />
            ))}
          </div>
          <Image
            className="w-56 h-56 p-4 bg-white rounded-md md:w-96 md:h-96 lg:h-full"
            src={image}
            alt="Product"
          />
        </section>
        {/* Right img */}
        <section className="p-3 bg-white rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-medium md:text-2xl text-primary-900">
              Havic HV G-92 Gamepad
            </h1>
            <span className="text-sm text-primary-500">Brand</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm md:mt-4">
            <StarRating start={4.5} />
            <span className="text-primary-400">(150 Reviews)</span>
            <span className="h-5 border border-primary-300"></span>
            <span className="text-emerald-400">In Stock</span>
          </div>
          <h2 className="mt-2 text-base font-medium md:text-xl md:mt-4 text-primary-900">
            $192.00
          </h2>
          <p className="md:mt-6 mt-2 md:text-sm text-xs text-primary-600 md:w-[380px] w-[248px]">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal Pressure
            sensitive.
          </p>

          <hr className="w-full my-4 md:my-6 border-primary-300" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary-900">Colours:</span>
            <div className="flex items-center gap-2 ml-2">
              {colors.map((color, index) => (
                <span
                  onClick={() => handleChangeColor(color.name)}
                  key={index}
                  className={`w-5 h-5 border rounded-full border-primary-300 hover:cursor-pointer ${
                    color.name === colorGet
                      ? "border-[1.5px] border-primary-900 opacity-70 transition-opacity"
                      : ""
                  }`}
                  style={{ backgroundColor: color.name }}
                ></span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:gap-4 md:mt-6">
            <div className="flex items-center justify-between gap-5 p-2 text-sm border rounded-md md:gap-6 md:p-3 bg-primary-100">
              <FiMinus className="hover:cursor-pointer" />
              <span className="">2</span>
              <GoPlus className="hover:cursor-pointer" />
            </div>
            <Link
              href={"#"}
              className="px-4 py-3 text-xs rounded-md text-nowrap md:py-3 md:text-sm md:px-7 bg-primary-800 text-primary-50"
            >
              Add to Cart
            </Link>
            <button className="p-2 transition-colors border rounded-md md:p-3 border-primary-500 hover:text-error-500 hover:border-error-500">
              <FaHeart size={20} />
            </button>
          </div>

          <div className="p-3 mt-6 border rounded-md md:mt-10 border-primary-300">
            <div className="flex items-center gap-4">
              <Image src={truck} alt="Truck" />
              <div className="flex flex-col">
                <h4 className="text-sm font-medium md:text-base">
                  Free Delivery
                </h4>
                <span className="text-xs underline hover:cursor-pointer text-primary-500">
                  Enter your postal code for Delivery Availability
                </span>
              </div>
            </div>
            <hr className="w-full my-4 border-primary-300" />
            <div className="flex items-center gap-4 ">
              <Image src={returnicon} alt="Return" />
              <div className="flex flex-col">
                <h4 className="text-sm font-medium md:text-base">
                  Return Delivery
                </h4>
                <span className="text-xs underline hover:cursor-pointer text-primary-500">
                  Free 30 Days Delivery Returns. Details
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Options */}
      <div className="flex items-center gap-6 mt-8 text-base font-medium transition-colors md:gap-10 md:text-xl md:mt-14 text-primary-400">
        <span
          onClick={() => setActiveOption("description")}
          className={`hover:text-primary-900 hover:cursor-pointer ${
            activeOption === "description" ? "text-primary-900" : ""
          }`}
        >
          Description
        </span>
        <span
          onClick={() => setActiveOption("reviews")}
          className={`hover:text-primary-900 hover:cursor-pointer ${
            activeOption === "reviews" ? "text-primary-900" : ""
          }`}
        >
          Reviews
        </span>
        <span
          onClick={() => setActiveOption("similar")}
          className={`hover:text-primary-900 hover:cursor-pointer ${
            activeOption === "similar" ? "text-primary-900" : ""
          }`}
        >
          Similar
        </span>
      </div>
      {/* Option Reviews */}
      {activeOption === "description" && (
        <div className="mt-6 md:mt-12">
          <ProductDescription />
        </div>
      )}
      {/* Option Reviews */}
      {activeOption === "reviews" && (
        <div className="mt-6 md:mt-12">
          <Reviews />
        </div>
      )}
      {/* Option Similar */}
      {activeOption === "similar" && (
        <div className="mt-6 md:mt-12">
          <h4 className="mb-6 text-xl font-semibold md:text-2xl">Similar Products</h4>
          <ProductsListSwpier />
        </div>
      )}
    </>
  );
}
