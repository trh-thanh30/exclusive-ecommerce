"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { CART_ENDPOINT, PRODUCTS_ENDPOINT } from "@/app/constants/api";

import Breadcrumb from "@/app/_components/Breadcrumb";
import Image from "next/image";
import StarRating from "@/app/_components/StarRating";
import Link from "next/link";
import truck from "../../../IconSvg/truck.svg";
import returnicon from "../../../IconSvg/return.svg";
import ProductsListSwpier from "@/app/_components/ProductsListSwpier";
import Reviews from "@/app/_components/Reviews";
import ProductDescription from "@/app/_components/ProductDescription";
import { useWishlist } from "@/app/context/WishlistContext";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CardContext";

export default function ProductDetails() {
  const params = useParams();
  const { id } = params;
  const [colorGet, setColorGet] = useState(null);
  const [activeOption, setActiveOption] = useState("description");
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);
  const { addToWishList, wishlist } = useWishlist();
  const isProductInWishlist = wishlist.some(
    (item) => item._id === product?._id
  );
  const { addToCart } = useCart();
  const handleGetProduct = async () => {
    try {
      const res = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      setProduct(data.product);
      setImage(data?.product?.images[0]);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    handleGetProduct();
  }, []);

  const breadcrumb = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/product",
    },
    {
      name: product.title,
      href: `/product/${product._id}`,
    },
  ];

  const handleChangeImage = (index) => {
    setImage(product?.images[index]);
  };
  const handleChangeColor = (name) => {
    setColorGet(name);
  };

  return (
    <>
      <Breadcrumb items={breadcrumb} />
      {/* Product */}
      <div className="grid items-center grid-cols-1 md:grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr] md:mt-20 mt-10">
        {/* Left img */}
        <section className="flex flex-col-reverse items-center justify-center h-full gap-2 lg:gap-8 md:gap-4 md:flex-col-reverse md:items-center md:justify-center lg:flex-row lg:justify-normal">
          <div className="flex gap-2 md:gap-4 lg:flex-col md:flex-row">
            {product?.images?.map((img, index) => (
              <Image
                key={img}
                onClick={() => handleChangeImage(index)}
                src={img}
                className={`p-1 transition-all bg-white border-[1.2px] rounded-md md:w-28 md:h-28 w-14 h-14 hover:border-[1.2px]  hover:border-primary-800 border-primary-300 
                ${
                  img === image
                    ? "border-[1.2px] opacity-70 cursor-default border-primary-800"
                    : "hover:scale-105 hover:cursor-pointer"
                }
                  `}
                alt={product.title}
                width={500}
                height={500}
              />
            ))}
          </div>
          {product?.images?.length > 0 && (
            <Image
              className="w-56 h-56 p-2 bg-white rounded-md md:w-96 md:h-96 lg:h-full"
              src={image}
              loading="lazy"
              width={500}
              height={500}
              alt={product.title}
            />
          )}
        </section>
        {/* Right img */}
        <section className="p-3 bg-white rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-medium md:text-2xl text-primary-900">
              {product.title}
            </h1>
            <span className="text-sm text-primary-500">{product.brand}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm md:mt-4">
            <StarRating start={product.totalRating} />
            <span className="text-primary-400">({product.totalRating})</span>
            <span className="h-5 border border-primary-300"></span>
            <span
              className={
                product.quantity > 0 ? "text-emerald-400" : "text-error-500"
              }
            >
              {product.quantity > 0
                ? `In Stock (${product.quantity})`
                : "Out of Stock"}
            </span>
          </div>
          <h2 className="mt-2 text-base font-medium md:text-xl md:mt-4 text-primary-900">
            ${product.price}
          </h2>
          <p className="md:mt-6 mt-2 md:text-sm text-xs text-primary-500 md:w-[400px] w-full">
            {product.description}
          </p>

          <hr className="w-full my-4 md:my-6 border-primary-300" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary-900">Colours:</span>
            <div className="flex items-center gap-2 ml-2">
              {product.color?.map((color, index) => (
                <span
                  onClick={() => handleChangeColor(color)}
                  key={index}
                  className={`w-5 h-5 border rounded-full border-primary-300 hover:cursor-pointer ${
                    color === colorGet
                      ? "border-[1.5px]  opacity-70 transition-opacity"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:gap-4 md:mt-6">
            <div className="flex items-center justify-between gap-5 p-2 text-sm border rounded-md md:gap-6 md:p-3 bg-primary-100">
              <button
                disabled={quantity === 1}
                onClick={() => setQuantity((prev) => prev - 1)}
                className="hover:cursor-pointer disabled:cursor-not-allowed"
              >
                <FiMinus />
              </button>
              <span className="">{+(quantity)}</span>
              <button
                disabled={quantity === product.quantity}
                onClick={() => setQuantity((prev) => prev + 1)}
                className="hover:cursor-pointer disabled:cursor-not-allowed"
              >
                <GoPlus />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product, colorGet, quantity)}
              className="px-4 py-3 text-xs rounded-md text-nowrap md:py-3 md:text-sm md:px-7 bg-primary-800 text-primary-50"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => addToWishList(product)}
              className={`p-2 transition-colors border rounded-md md:p-3  hover:text-error-500 hover:border-error-500 ${
                isProductInWishlist
                  ? "text-error-500 border-error-500"
                  : "border-primary-500"
              }`}
            >
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
      {/* Option Description */}
      {activeOption === "description" && (
        <div className="mt-6 md:mt-12">
          <ProductDescription description={product.description} />
        </div>
      )}
      {/* Option Reviews */}
      {activeOption === "reviews" && (
        <div className="mt-6 md:mt-12">
          <Reviews
            fetchProduct={handleGetProduct}
            productId={product._id}
            ratings={product.ratings}
          />
        </div>
      )}
      {/* Option Similar */}
      {activeOption === "similar" && (
        <div className="mt-6 md:mt-12">
          <h4 className="mb-6 text-xl font-semibold md:text-2xl">
            Similar Products
          </h4>
          <ProductsListSwpier />
        </div>
      )}
    </>
  );
}
