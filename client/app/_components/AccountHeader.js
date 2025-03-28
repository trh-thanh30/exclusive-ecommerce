"use client";
import React from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "./Breadcrumb";
const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Account",
    href: "/account",
  },
];
export default function AccountHeader() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="flex items-center justify-end w-full gap-1 mt-10 text-xs md:mt-16 md:text-sm text-primary-500">
        <span>Welcome! </span>{" "}
        <h1 className="font-medium text-primary-800">{user?.user?.username}</h1>
      </div>
    </>
  );
}
