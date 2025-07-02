"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Controller } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import useFetchProducts from "../hooks/useFetchProducts";
import Link from "next/link";

export default function ResponsiveHeroSlider() {
  const { products } = useFetchProducts();
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full overflow-hidden bg-neutral-900">
      {/* MAIN SLIDER */}
      <Swiper
        pagination={{ clickable: false }}
        modules={[Pagination, Controller]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full">
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col-reverse items-center justify-between gap-6 px-4 py-4 md:flex-row md:px-20 md:py-28">
              {/* TEXT CONTENT */}
              <div className="text-center md:text-left md:max-w-lg">
                <h3 className="mb-2 text-lg font-semibold text-primary-50/60">
                  {product.brand}
                </h3>

                <h2 className="space-x-2 text-2xl font-bold leading-tight md:text-4xl">
                  {product.title.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className={
                        word.toLowerCase() === "pro"
                          ? "text-primary-50"
                          : "text-primary-50/80"
                      }>
                      {word}
                    </span>
                  ))}
                </h2>

                <p className="my-4 text-xs text-primary-500 md:text-sm">
                  {product.description}
                </p>

                <Link
                  href={`/product/${product._id}`}
                  className="px-6 py-2 text-sm font-medium transition-colors duration-300 rounded text-primary-900 bg-primary-50 hover:bg-primary-300">
                  Shop Now
                </Link>
              </div>

              {/* IMAGE */}
              {product.images.length > 0 && (
                <div className="relative flex items-center justify-center w-[300px] h-[300px] bg-primary-50 rounded-md">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain w-full"
                    priority
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMBNAILS */}
      <div className="flex flex-wrap justify-center gap-3 pb-12">
        {products.map((product, idx) => (
          <button
            key={idx}
            onClick={() => swiperRef.current?.slideTo(idx)}
            className={`md:w-20 md:h-20 w-16 h-16 overflow-hidden transition border-2 border-transparent rounded-lg hover:border-white hover:scale-110`}>
            <Image
              src={product.images[0]}
              alt={`thumb-${idx}`}
              width={80}
              height={60}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
