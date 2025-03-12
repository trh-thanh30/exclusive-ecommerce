import Link from "next/link";
import { useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";
const categories = [
  {
    name: "Woman's Fashion",
    link: "#",
    subcategories: ["T-Shirts", "Jeans", "Shoes", "Accessories", "T-Shirts",],
  },
  {
    name: "Men's Fashion",
    link: "#",
    subcategories: ["T-Shirts", "Jeans", "Shoes", "Accessories"],
  },
  { name: "Electronics", link: "#" },
  { name: "Home & Lifestyle", link: "#" },
  { name: "Medicine", link: "#" },
  { name: "Sports & Outdoor", link: "#" },
  { name: "Baby's & Toys", link: "#" },
  { name: "Groceries & Pets", link: "#" },
  { name: "Health & Beauty", link: "#" },
];

const slides = [
  {
    id: 1,
    image:
      "https://via.placeholder.com/800x400/000000/FFFFFF?text=iPhone+14+Series",
    title: "iPhone 14 Series",
    description: "Up to 10% off Voucher",
  },
  {
    id: 2,
    image:
      "https://via.placeholder.com/800x400/000000/FFFFFF?text=New+Arrivals",
    title: "New Arrivals",
    description: "Exclusive Deals on New Products",
  },
];

export default function CategorySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openCategory, setOpenCategory] = useState(null);
  const toggleDropdown = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };
  return (
    <div className="flex items-center gap-11">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 border-r border-r-gray-300">
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                href={category.link}
                className="flex items-center justify-between py-2 text-sm font-medium cursor-pointer hover:text-primary-900 text-primary-700"
                onClick={() => toggleDropdown(index)}
              >
                {category.name}
                <div className="transition-all duration-300">
                  {category.subcategories ? (
                    openCategory === index ? (
                      <span className="">
                        <FaAngleDown size={16} />
                      </span>
                    ) : (
                      <span className="">
                        <FaAngleRight size={16} />
                      </span>
                    )
                  ) : null}
                </div>
              </Link>
              <ul
                className={`pl-5 space-y-1 overflow-hidden transition-all duration-300 border-dotted list-disc ${
                  openCategory === index
                    ? "max-h-screen opacity-100 translate-y-0 "
                    : "max-h-0 opacity-0 -translate-y-1"
                }`}
              >
                {category.subcategories?.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="py-1 text-sm cursor-pointer text-primary-600 hover:text-primary-900"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
      {/* Slider */}
      <div className="w-3/4">
        <Swiper
          // spaceBetween={30}
          effect={"fade"}
          //   navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="w-full object-cover h-[400px]"
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full object-cover h-[400px]"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/ecommerce-youtube-thumbnail-design-template-1eb328fdc02797a2d8b84235c90582a7_screen.jpg?ts=1593855677"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
