import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCart from "./ProductCart";
import useFetchProducts from "../hooks/useFetchProducts";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ProductsListSwpier() {
  const { products, loading } = useFetchProducts();
  return (
    <Swiper
      slidesPerView={5}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        320: {
          slidesPerView: 2,
        },
        639: {
          slidesPerView: 3,
        },
        865: {
          slidesPerView: 4,
        },
        1000: {
          slidesPerView: 5,
        },
      }}
      spaceBetween={14}
      grabCursor={true}
      pagination={{
        clickable: true,
      }}
      className="mySwiper">
      {loading
        ? Array.from({ length: 20 }).map((_, i) => (
            <SwiperSlide key={i}>
              <LoadingSkeleton key={i} />
            </SwiperSlide>
          ))
        : products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCart key={product._id} product={product} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
}
