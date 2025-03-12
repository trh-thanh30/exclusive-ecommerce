import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Thêm FaStarHalfAlt

const evaluate = [
  {
    id: 1,
    name: "Sarah M.",
    star: 5,
    comment:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
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
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <div className="mt-20 mb-20">
      <h2 className="pl-1 mb-10 text-3xl font-medium border-l-8 rounded-sm text-primary-900 border-l-primary-900">
        OUR HAPPY CUSTOMERS
      </h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        pagination={{ clickable: true }}
        className=" mySwiper"
      >
        {evaluate.map((e) => (
          <SwiperSlide key={e.id} >
            <div className="h-[210px] p-6 border rounded-md border-primary-300">
              {/* Hiển thị sao */}
              <div className="flex mb-3">
                {Array.from({ length: Math.floor(e.star) }).map((_, i) => (
                  <FaStar key={i} color="#FBBF24" />
                ))}
                {e.star % 1 !== 0 && <FaStarHalfAlt color="#FBBF24" />}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <img
                  className="rounded-full w-7 h-7"
                  src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                  alt=""
                />
                <p className="text-base font-semibold text-primary-900">
                  {e.name}
                </p>
              </div>
              <p className="text-xs text-primary-600">"{truncateText(e.comment, 200)}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
