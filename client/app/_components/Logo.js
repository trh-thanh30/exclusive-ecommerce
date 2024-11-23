import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.svg";

export default function Logo({ classname }) {
  return (
    <Link className={classname} href={"/"}>
      <Image src={logo} alt="logo"></Image>
    </Link>
  );
}
