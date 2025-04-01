"use client";
import React from "react";
import CategorySlider from "../_components/CategorySliderHome";
import ProductList from "../_components/ProductList";
import "swiper/css";
import "swiper/css/pagination";
import Service from "../_components/Service";
import CustomerEvaluate from "../_components/CustomerEvaluate";
import TrustedBy from "../_components/TrustedBy";

export default function Page() {
  return (
    <>
      <CategorySlider />
      <ProductList name={"Flash Sales"} haveTime={true} link={"#"} />
      <hr className="w-full mx-auto my-8 md:my-14 border-primary-300" />
      {/* Categories list */}
      <TrustedBy />
      <hr className="w-full mx-auto my-8 md:my-14 border-primary-300" />
      {/* <ProductList name={"Best Selling Products"} haveTime={false} link={"#"} /> */}
      {/* <ProductList name={"Explore Our Products"} haveTime={false} link={"#"} /> */}
      <CustomerEvaluate />
      <Service />
    </>
  );
}
