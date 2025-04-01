import React from "react";

export default function ProductDescription({ description }) {
  return (
    <>
      <h4 className="text-xl font-semibold md:text-2xl">Description</h4>
      <p className="mt-3 text-xs md:mt-6 md:text-sm text-primary-500">
        {description}
      </p>
    </>
  );
}
