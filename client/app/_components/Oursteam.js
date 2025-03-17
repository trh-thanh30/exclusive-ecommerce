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
    name: "John Carvan",
    role: "CO.Founder",
    iconSocial: {
      facebook: <CiFacebook size={sizeIconSmall} />,
      twitter: <CiInstagram size={sizeIconSmall} />,
      linkedin: <CiLinkedin size={sizeIconSmall} />,
    },
    image: staff2,
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
    <>
      <div className="flex flex-col gap-3 text-center ">
        <h2 className="text-2xl font-medium md:text-4xl">Meet Our Team</h2>
        <div className="flex items-center justify-center w-full">
          <p className="text-sm text-primary-500 w-[494px]">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {oursteam.map((team) => (
          <li
            key={team.name}
            className="flex flex-col items-center gap-2 p-4 transition-transform border rounded-md border-primary-200 hover:scale-105 hover:cursor-pointer bg-primary-50 md:p-6 hover:shadow-lg"
          >
            <Image
              placeholder="blur"
              className="object-contain w-48 h-48 mb-4 rounded-sm"
              src={team.image}
              alt={team.name}
            />
            <h3 className="text-sm font-semibold md:text-lg text-primary-800">
              {team.name}
            </h3>
            <p className="text-sm text-gray-500">{team.role}</p>
            <div className="flex gap-4">
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
    </>
  );
}
