import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="bg-white group">
      <div className="w-full bg-gray-200 h-44 animate-pulse" />
      <div className="flex flex-col gap-2 p-2 mt-2">
        <div className="flex flex-col text-nowrap ">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="w-24 h-4 bg-gray-200 animate-pulse" />
            <div className="w-16 h-4 bg-gray-200 animate-pulse" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="w-24 h-4 bg-gray-200 animate-pulse" />
            <div className="w-20 h-4 bg-gray-200 animate-pulse" />
          </div>
        </div>

        <div className="h-4 bg-gray-200 w-28 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="w-24 h-5 bg-gray-200 animate-pulse" />
          <div className="w-24 h-5 bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
