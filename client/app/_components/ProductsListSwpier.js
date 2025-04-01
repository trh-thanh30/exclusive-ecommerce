import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCart from "./ProductCart";
import useFetchProducts from "../hooks/useFetchProducts";

export default function ProductsListSwpier() {
  const { products } = useFetchProducts();
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
      spaceBetween={16}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductCart product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
