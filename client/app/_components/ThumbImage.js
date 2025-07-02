import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ThumbImage({ title, desc, rscImage }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-[1.2fr_0.9fr] items-center  p-4 bg-gradient-to-r from-primary-900 to-primary-100  rounded-lg h-auto sm:h-[380px] gap-4">
      <div className="text-center sm:text-left">
        <h3 className="mb-2 text-base italic font-medium sm:text-xl text-primary-100">
          {desc}
        </h3>
        <h2 className="mb-3 text-3xl font-medium text-wrap md:text-4xl lg:text-6xl text-primary-100">
          {title}
        </h2>
        <Link
          href={"/product"}
          className="inline-block px-6 py-2 mt-1 text-xs font-medium transition-colors rounded-md sm:text-sm bg-primary-50 text-primary-900 hover:opacity-90">
          Shop Now
        </Link>
      </div>

      <div>
        <Image
          src={rscImage}
          alt="Image Thumb"
          className="object-contain w-72 h-44 sm:h-80 sm:w-80"
          width={500}
          height={500}
          loading="lazy"
        />
      </div>
    </div>
  );
}
