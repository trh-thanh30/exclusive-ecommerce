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
    <div className="flex items-center justify-between">
      <Breadcrumb items={breadcrumb} />
      <div className="flex items-center gap-1 text-sm text-slate-500">
        <span>Welcome! </span>{" "}
        <span className="text-slate-800">{user?.user?.username}</span>
      </div>
    </div>
  );
}
