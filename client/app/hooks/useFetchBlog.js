"use client";
import { useEffect, useState } from "react";
import { BLOGS_ENDPOINT } from "../constants/api";
export default function useFetchBlog() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(BLOGS_ENDPOINT, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setBlogs(data.blogs);
        setPagination(data.pagination);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  return { loading, pagination, blogs };
}
