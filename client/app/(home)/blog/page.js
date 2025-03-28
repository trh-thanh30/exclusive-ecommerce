"use client";
import React from "react";
import Breadcrumb from "../../_components/Breadcrumb";
import Input from "@/app/_components/Input";
import { format } from "date-fns";
import {
  CiSearch,
  CiUser,
  CiCalendarDate,
  CiShoppingTag,
} from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import useFetchBlog from "@/app/hooks/useFetchBlog";
import { truncateText } from "@/app/constants/truncateText";

const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];

export default function Page() {
  const { blogs, fetchBlogs, loading, pagination } = useFetchBlog();
  const categoryCount = blogs.reduce((acc, blog) => {
    acc[blog.category] = (acc[blog.category] || 0) + 1;
    return acc;
  }, {});
  console.log(categoryCount)

  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr] md:gap-8 gap-6 md:mt-8 mt-7">
        {/* Blog sidebar */}
        <div className="flex flex-col">
          <Input
            placeholder={"Search blog...."}
            fullWidth={false}
            icon={<CiSearch />}
          />
          <section className="mt-6 md:mt-11">
            <h2 className="text-xl font-medium text-primary-900">Categories</h2>
            <ul className="flex flex-col gap-4 mt-4 text-xs md:text-sm md:gap-8 md:mt-8 text-primary-500">
              {Object.entries(categoryCount).map(([category, count]) => (
                <li
                  key={category}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium transition-colors cursor-pointer hover:text-primary-900">
                    {category}
                  </span>
                  <span>{count}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-6 md:mt-11">
            <h2 className="text-xl font-medium text-primary-900">
              Recent Posts
            </h2>
            {blogs.map((blog, index) => (
              <Link
                href={`/blog/${blog._id}`}
                className="flex items-center gap-2 p-2 mt-3 transition-colors rounded-md shadow-sm hover:bg-primary-200"
              >
                <Image
                  alt={blog.title}
                  loading="lazy"
                  className="rounded-md"
                  src={blog?.images[0]}
                  width={80}
                  style={{ aspectRatio: "16/9", objectFit: "cover" }}
                  height={80}
                />

                <div className="text-xs font-medium">
                  <p className=" text-primary-900">
                    {truncateText(blog.title, 100)}
                  </p>
                  <span className="text-primary-500">
                    {format(blog.createdAt, "yyyy-MM-dd")}
                  </span>
                </div>
              </Link>
            ))}
          </section>
        </div>

        {/* Blog content */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {blogs.map((blog, index) => (
            <section
              key={index}
              className="flex flex-col h-full p-3 rounded-md shadow-sm bg-slate-50"
            >
              <Link href={`/blog/${blog._id}`}>
                <Image
                  className="object-cover rounded-md"
                  src={blog?.images[0]}
                  loading="lazy"
                  width={500}
                  height={300}
                  alt="banner"
                  style={{ aspectRatio: "16/9", objectFit: "cover" }}
                />
              </Link>
              <div className="flex items-center gap-4 mt-4 text-xs text-nowrap md:text-sm md:gap-8 text-primary-500">
                <span className="flex items-center gap-1 ">
                  <CiUser size={20} />
                  {blog.author}
                </span>
                <span className="flex items-center gap-1 ">
                  <CiCalendarDate size={20} />
                  {format(blog.updatedAt, "yyyy-MM-dd")}
                </span>
                <span className="flex items-center gap-1 ">
                  <CiShoppingTag size={20} />
                  {blog.category}
                </span>
              </div>
              <h1 className="mt-2 text-sm font-medium md:text-base xl:text-xl text-primary-900">
                {truncateText(blog.title, 30)}
              </h1>
              <p className="my-2 text-xs md:text-sm text-primary-500">
                {truncateText(blog.description, 350)}
              </p>

              {/* Đẩy "Read More" xuống cuối */}
              <div className="mt-auto">
                <Link
                  href={`/blog/${blog._id}`}
                  className="flex items-center gap-1 text-sm font-medium md:text-base text-primary-700 hover:underline group"
                >
                  Read More{" "}
                  <FaAngleRight className="transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
