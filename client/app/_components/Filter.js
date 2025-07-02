import React, { useState } from "react";
import useFetchCategories from "../hooks/useFetchCategories";

export default function Filter({ openFilter, query, setQuery, loading }) {
  const handleCategoryChange = (e) => {
    setQuery({ ...query, category: e.target.value });
  };

  const { categories } = useFetchCategories();
  return (
    <section
      className={`xl:block ${
        openFilter ? "block" : "hidden "
      } px-3 bg-white rounded-md`}>
      {/* Categories */}
      <div className="mt-8 font-medium ">
        <h4 className="text-xl ">CATEGORIES</h4>
        <select
          onChange={handleCategoryChange}
          disabled={loading}
          className="w-full p-2 mt-4 text-xs border rounded-md outline-none">
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      {/* Price */}
      <div className="mt-8 mb-8 font-medium">
        <h4 className="text-xl ">PRICE</h4>
        <div className="flex flex-col gap-2 mt-4 text-sm text-primary-500">
          <div className="flex items-center justify-between">
            <label> All Price</label>
            <input className="w-4 h-4 accent-primary-900" type="checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <label> $0.00 - 99.99</label>
            <input className="w-4 h-4 accent-primary-900" type="checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <label> $100.00 - 199.99</label>
            <input className="w-4 h-4 accent-primary-900" type="checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <label> $200.00 - 299.99</label>
            <input className="w-4 h-4 accent-primary-900" type="checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <label> $300.00 - 399.99</label>
            <input className="w-4 h-4 accent-primary-900" type="checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <label> $400.00+</label>
            <input className="w-4 h-4 accent-primary-900" type="checkbox" />
          </div>
        </div>
      </div>
    </section>
  );
}
