import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.svg";
import logoWhite from "@/public/logo-white.svg";
export default function Logo({ classname, logoDefault }) {
  return (
    <Link className={classname} href={"/"}>
      <Image src={logoDefault ? logo : logoWhite} className="min-w-[120px]" alt="logo" />
    </Link>
  );
}
