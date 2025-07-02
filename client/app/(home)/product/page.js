"use client";
import Breadcrumb from "@/app/_components/Breadcrumb";
import React, { useState } from "react";
import filter from "../../IconSvg/filter.svg";
import Image from "next/image";
import ProductCart from "@/app/_components/ProductCart";
import Paginations from "@/app/_components/Paginations";
import Filter from "@/app/_components/Filter";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import LoadingSkeleton from "@/app/_components/LoadingSkeleton";

const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Product",
    href: "/product",
  },
];
export default function page() {
  const [openFilter, setOpenFilter] = useState(false);
  const { loading, paginations, products, query, setQuery } =
    useFetchProducts();
  const handleSort = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <h1 className="mt-8 text-2xl font-medium text-center md:mt-20 md:text-4xl">
        Products Page
      </h1>
      <p className="mt-1 text-xs text-center md:mt-4 md:text-sm text-primary-400">
        Let’s see our products.
      </p>

      {/* Header */}
      <div className="grid md:grid-cols-[0.5fr_2fr] grid-cols-1 md:mt-16 mt-6 md:gap-6 gap-4 items-center ">
        <div className="gap-1 py-2 font-medium border-y border-y-primary-200 md:border-none xl:border-none ">
          <button
            onClick={() => setOpenFilter((filter) => !filter)}
            className="flex items-center gap-2 hover:opacity-80">
            <Image alt="filter-icon" src={filter}></Image>
            <h3>Filter</h3>
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 font-medium md:justify-between ">
          <h3 className="mt-2 text-sm sm:mt-0 text-nowrap">Living Room</h3>
          <select
            className="py-[7px] px-2 text-xs border rounded-lg outline-none border-primary-400 text-primary-800 w-full md:w-fit  sm:mt-0 mt-2"
            id="sort"
            disabled={loading}
            name="sort"
            onChange={handleSort}>
            <option value="title">Sort by name(A-Z)</option>
            <option value="-title">Sort by name(Z-A)</option>
            <option value="price">Sort by price(Min-Max)</option>
            <option value="-price">Sort by price(Max-Min)</option>
            <option value="createdAt">Sort by date(newest)</option>
            <option value="-createdAt">Sort by date(oldest)</option>
          </select>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 xl:grid-cols-[0.5fr_2fr] md:mt-6 mt-3 gap-6 ">
        {/* Left */}
        <Filter loading={loading} query={query} setQuery={setQuery} openFilter={openFilter} />
        {/* Right */}
        {loading ? (
          <div className="grid grid-cols-2 mt-8 gap-x-2 md:gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <section>
            <div className="grid grid-cols-2 mt-8 gap-x-2 md:gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCart key={product._id} product={product} />
              ))}
            </div>
            <Paginations
              query={query}
              setQuery={setQuery}
              pagination={paginations}
            />
          </section>
        )}
      </div>
    </>
  );
}
