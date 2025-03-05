"use client";
import React from "react";
import { useSelector } from "react-redux";
export default function HeaderDash({ page }) {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex items-center justify-between w-full p-3 bg-white border border-b-primary-200 border-l-primary-200 text-neutral-900">
      <div className="flex items-center gap-1 text-sm ">
        <span>Welcome back!</span>
        <span className="text-neutral-300">{user?.user?.username}</span>
      </div>
      <h1 className="text-xl font-medium uppercase">{page}</h1>
    </div>
  );
}
