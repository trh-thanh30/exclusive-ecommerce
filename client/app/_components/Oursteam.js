// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Navigation, Pagination } from "swiper/modules";
// import Image from "next/image";
// import Link from "next/link";
// import { CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import staff1 from "@/public/staff-1.png";
// import staff2 from "@/public/staff-2.png";
// import staff3 from "@/public/staff-3.png";

// const sizeIconSmall = 20;

// const oursteam = [
//   {
//     name: "Tom Cruise",
//     role: "Founder & Chairman",
//     iconSocial: {
//       facebook: <CiFacebook size={sizeIconSmall} />,
//       instagram: <CiInstagram size={sizeIconSmall} />,
//       linkedin: <CiLinkedin size={sizeIconSmall} />,
//     },
//     image: staff1,
//   },
//   {
//     name: "Emma Watson",
//     role: "Managing Director",
//     iconSocial: {
//       facebook: <CiFacebook size={sizeIconSmall} />,
//       instagram: <CiInstagram size={sizeIconSmall} />,
//       linkedin: <CiLinkedin size={sizeIconSmall} />,
//     },
//     image: staff2,
//   },
//   {
//     name: "Will Smith",
//     role: "Product Designer",
//     iconSocial: {
//       facebook: <CiFacebook size={sizeIconSmall} />,
//       instagram: <CiInstagram size={sizeIconSmall} />,
//       linkedin: <CiLinkedin size={sizeIconSmall} />,
//     },
//     image: staff3,
//   },

//   {
//     name: "Emma Watson",
//     role: "Managing Director",
//     iconSocial: {
//       facebook: <CiFacebook size={sizeIconSmall} />,
//       instagram: <CiInstagram size={sizeIconSmall} />,
//       linkedin: <CiLinkedin size={sizeIconSmall} />,
//     },
//     image: staff2,
//   },
//   {
//     name: "Emma Watson",
//     role: "Managing Director",
//     iconSocial: {
//       facebook: <CiFacebook size={sizeIconSmall} />,
//       instagram: <CiInstagram size={sizeIconSmall} />,
//       linkedin: <CiLinkedin size={sizeIconSmall} />,
//     },
//     image: staff2,
//   },
//   {
//     name: "Emma Watson",
//     role: "Managing Director",
//     iconSocial: {
//       facebook: <CiFacebook size={sizeIconSmall} />,
//       instagram: <CiInstagram size={sizeIconSmall} />,
//       linkedin: <CiLinkedin size={sizeIconSmall} />,
//     },
//     image: staff2,
//   },
// ];

// export default function OurTeamSlider() {
//   return (
//     <div className="">
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={20}
//         freeMode={true}
//         pagination={{
//           clickable: false,
//         }}
//         breakpoints={{
//           340: { slidesPerView: 2, spaceBetween: 16 },
//           700: { slidesPerView: 3, spaceBetween: 24 },
//         }}
//         modules={[FreeMode, Pagination]}
//         className="mySwiper"
//       >
//         {oursteam.map((team) => (
//           <SwiperSlide key={team.name}>
//             <div className="flex flex-col items-center p-6 border rounded-sm bg-primary-50 border-primary-200 hover:shadow-lg">
//               <Image
//                 placeholder="blur"
//                 className="mb-4 rounded-sm w-44 h-44"
//                 src={team.image}
//                 alt={team.name}
//               />
//               <h3 className="text-lg font-semibold text-primary-800">
//                 {team.name}
//               </h3>
//               <p className="text-sm text-gray-500">{team.role}</p>
//               <div className="flex gap-4 mt-4">
//                 {Object.keys(team.iconSocial).map((key) => (
//                   <Link
//                     href={`#${key}`} // Thay '#' bằng URL thực tế
//                     key={key}
//                     className="text-primary-600 hover:text-primary-900"
//                   >
//                     {team.iconSocial[key]}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
import staff1 from "@/public/staff-1.png";
import staff2 from "@/public/staff-2.png";
import staff3 from "@/public/staff-3.png";

const sizeIconSmall = 20;
const oursteam = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    iconSocial: {
      facebook: <CiFacebook size={sizeIconSmall} />,
      twitter: <CiInstagram size={sizeIconSmall} />,
      linkedin: <CiLinkedin size={sizeIconSmall} />,
    },
    image: staff1,
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    iconSocial: {
      facebook: <CiFacebook size={sizeIconSmall} />,
      twitter: <CiInstagram size={sizeIconSmall} />,
      linkedin: <CiLinkedin size={sizeIconSmall} />,
    },
    image: staff2,
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    iconSocial: {
      facebook: <CiFacebook size={sizeIconSmall} />,
      twitter: <CiInstagram size={sizeIconSmall} />,
      linkedin: <CiLinkedin size={sizeIconSmall} />,
    },
    image: staff3,
  },
];
export default function Oursteam() {
  return (
    <ul className="grid grid-cols-3 gap-6">
      {oursteam.map((team) => (
        <li
          key={team.name}
          className="flex flex-col items-center gap-2 p-6 transition-transform border rounded-sm bg-primary-50 border-primary-200 hover:scale-105 hover:shadow-lg"
        >
          <Image
            placeholder="blur"
            className="mb-4 rounded-sm w-44 h-44"
            src={team.image}
            alt={team.name}
          />
          <h3 className="text-lg font-semibold text-primary-800">
            {team.name}
          </h3>
          <p className="text-sm text-gray-500">{team.role}</p>
          <div className="flex gap-4 mt-4">
            {Object.keys(team.iconSocial).map((key) => (
              <Link
                href={key}
                key={key}
                className="p-1 transition-colors rounded-full text-primary-900 hover:text-primary-50 hover:bg-black"
              >
                {team.iconSocial[key]}
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
