"use client";
import { FiUser } from "react-icons/fi";
import { GET_BLOG_ENDPOINT } from "@/app/constants/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { IoCalendarClearOutline } from "react-icons/io5";
import { PiEyesLight } from "react-icons/pi";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

import Breadcrumb from "@/app/_components/Breadcrumb";
import toast from "react-hot-toast";
import Image from "next/image";
import Spinner from "@/app/_components/Spinner";

export default function page() {
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setLoading(true);
    const fetchBlogId = async () => {
      try {
        const res = await fetch(`${GET_BLOG_ENDPOINT}/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          setLoading(false);
        }
        setBlog(data.blog);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchBlogId();
  }, []);

  const breadcrumb = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: blog?.title,
      href: `/blog/${id}`,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumb} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-8 md:mt-16">
            <h1 className="text-xl italic font-medium text-center md:text-3xl text-primary-900">
              {blog?.title}
            </h1>
            <div className="flex items-center justify-center mt-4 md:mt-6">
              <span className="p-2 text-[10px] transition-colors border rounded-full cursor-pointer border-primary-300 hover:bg-primary-900 hover:text-primary-50">
                {blog?.category}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 mt-4 text-xs font-medium border-b md:text-sm md:pb-3 md:mt-9 text-primary-500 border-b-primary-300">
              <div className="flex items-center gap-12">
                <p className="flex items-center gap-1">
                  <FiUser />
                  {blog?.author}
                </p>
                <p className="flex items-center gap-1">
                  <IoCalendarClearOutline />
                  {format(blog?.createdAt || 0, "yyyy-MM-dd")}
                </p>
              </div>
              <p className="flex items-center gap-1">
                <PiEyesLight />
                {blog?.numViews}
              </p>
            </div>
            {blog?.images?.[0] && (
              <Image
                className="object-cover w-full h-full mt-5 rounded-md md:mt-10"
                src={blog.images[0]}
                loading="lazy"
                width={1000}
                height={500}
                alt={blog.title || "Blog image"}
                style={{ aspectRatio: "16/9", objectFit: "cover" }}
              />
            )}
            <p className="max-w-2xl mx-auto mt-4 text-xs leading-loose md:mt-10 text-primary-500">
              "{blog?.description}"
            </p>
            {blog?.images?.[1] && blog?.images?.[2] && (
              <div className="flex items-center max-w-xl gap-1 mx-auto mt-4 md:gap-2 md:max-w-2xl md:mt-10">
                <Image
                  className="object-cover w-1/2 rounded-md"
                  src={blog.images[1]}
                  loading="lazy"
                  width={400}
                  height={400}
                  alt={blog.title || "Blog image"}
                  style={{ aspectRatio: "16/9", objectFit: "cover" }}
                />
                <Image
                  className="object-cover w-1/2 rounded-md"
                  src={blog.images[2]}
                  loading="lazy"
                  width={400}
                  height={400}
                  alt={blog.title || "Blog image"}
                  style={{ aspectRatio: "16/9", objectFit: "cover" }}
                />
              </div>
            )}
            <div className="flex items-center justify-center gap-6 mt-4 text-base font-medium transition-colors md:mt-8 text-primary-500">
              <div className="flex items-center gap-1 ">
                <AiOutlineLike className="hover:text-blue-400 hover:cursor-pointer " />
                <span>{blog?.userLikes?.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <AiOutlineDislike className="hover:text-blue-400 hover:cursor-pointer " />
                <span> {blog?.userDislikes?.length}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
