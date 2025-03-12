"use client";
import React from "react";
import CategorySlider from "../_components/CategorySliderHome";
import ProductList from "../_components/ProductList";
import { GrPersonalComputer } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductsListHeader from "../_components/ProductsListHeader";
import Service from "../_components/Service";
import CustomerEvaluate from "../_components/CustomerEvaluate";
const categories = [
  {
    name: "Phones",
    icon: <GrPersonalComputer size={56} />,
  },
  {
    name: "Computers",
    icon: <GrPersonalComputer size={56} />,
  },
  {
    name: "SmartWatch",
    icon: <GrPersonalComputer size={56} />,
  },
  {
    name: "HeadPhones",
    icon: <GrPersonalComputer size={56} />,
  },
  {
    name: "Gaming",
    icon: <GrPersonalComputer size={56} />,
  },
  {
    name: "T-Shirt",
    icon: <GrPersonalComputer size={56} />,
  },
  {
    name: "Laptop",
    icon: <GrPersonalComputer size={56} />,
  },
  {
    name: "Airpods",
    icon: <GrPersonalComputer size={56} />,
  },
  {
    name: "Tablet",
    icon: <GrPersonalComputer size={56} />,
  },
];
export default function Page() {
  return (
    <>
      <CategorySlider />
      <ProductList name={"Flash Sales"} haveTime={true} link={"#"} />
      <hr className="w-full mx-auto my-4 md:my-14 border-primary-300" />
      {/* Categories list */}   
      <div>
        <ProductsListHeader haveTime={false} name={"Browse By Category"} link={"#"} />
        <Swiper
          slidesPerView={5}
          spaceBetween={16}
          pagination={{
            clickable: true,
          }}
          className="mt-10 mySwiper"
        >
          {categories.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="border rounded-sm border-primary-300">
                <div className="flex flex-col items-center justify-center gap-4 px-8 py-6 transition-colors group hover:bg-primary-900 hover:text-primary-50 hover:cursor-pointer">
                  <span>{item.icon}</span>
                  <span className="text-sm text-primary-900 group-hover:text-primary-50">
                    {item.name}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ProductList name={"Best Selling Products"} haveTime={false} link={"#"}/>
      <ProductList name={"Explore Our Products"} haveTime={false} link={"#"}/>
      <CustomerEvaluate/>
      <Service/>
    </>
  );
}
