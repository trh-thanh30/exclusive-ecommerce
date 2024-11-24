import React from "react";
import thumb from "@/public/thumb-login.svg";
import Image from "next/image";

export default function ImageLeftForm() {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-screen gap-10 p-4 ">
      <Image
        src={thumb}
        width={500}
        alt="Family sitting around a fire pit in front of cabin"
        quality={100}
      />
      <p className="text-sm font-medium text-center text-primary-800">
        The best of luxury brand values, high quality products, and innovative
        services
      </p>
    </div>
  );
}
