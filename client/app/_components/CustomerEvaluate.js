import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import StarRating from "./StarRating";

const evaluate = [
  {
    id: 2,
    name: "Alex K.",
    star: 5,
    // Đã sửa lỗi "cooment" thành "comment"
    comment:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: "Emily L.",
    star: 4.5,
    comment:
      "I absolutely love the way Exclusive.co. has made it easy to find and buy clothes that match my personal style. The quality and care they provide are unparalleled, and I've been able to save a significant amount on my wardrobe over the past few years.",
  },
  {
    id: 4,
    name: "Jake B.",
    star: 4,
    comment:
      "Exclusive.co. has been my go-to for finding quality clothing that fits my personal style. The variety of options available is truly inspiring, and I've been able to save a significant amount on my wardrobe over the past few years.",
  },
  {
    id: 5,
    name: "Michael J.",
    star: 5,
    comment:
      "I've been using Exclusive.co. for a few years now and I absolutely love the quality and style of the clothes I receive. They've been incredibly helpful in finding the perfect outfit for me, and I've been able to save a significant amount on my wardrobe over the past few years.",
  },
  {
    id: 6,
    name: "Daniel R.",
    star: 5,
    comment:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

export default function CustomerEvaluate() {
 
  return (
    <div className="my-10 md:my-20">
      <h2 className="pl-1 text-base font-medium border-l-2 rounded-sm md:border-l-8 text-nowrap md:text-xl xl:text-3xl text-primary-900 border-l-primary-900 mb-7 md:mb-10">
        OUR HAPPY CUSTOMERS
      </h2>
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        pagination={{
          dynamicBullets: true,
        }}
      >
        {evaluate.map((e) => (
          <SwiperSlide key={e.id}>
            <div className="flex flex-col items-center justify-center">
              {/* Hiển thị sao */}

              <div className="flex items-center gap-2 mb-1 md:mb-4">
                <img
                  className="rounded-full w-7 h-7"
                  src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                  alt=""
                />
                <p className="text-base font-semibold text-primary-900">
                  {e.name}
                </p>
              </div>
              <StarRating
                className={`mb-1 text-xs md:mb-3 md:text-sm`}
                start={e.star}
              />
              <p className="md:text-sm italic text-xs text-center md:w-[400px] w-[242px] h-full  text-primary-600 mb-5 md:mb-10">
                "{e.comment}"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
