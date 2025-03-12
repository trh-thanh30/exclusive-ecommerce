"use client";
import { useEffect, useState } from "react";
import { BLOGS_ENDPOINT } from "../constants/api";
import toast from "react-hot-toast";
export default function useFetchBlog() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState([]);
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(BLOGS_ENDPOINT, {
        method: "GET",
      });
      const data = await res.json();
      setBlogs(data.blogs);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return { loading, pagination, blogs, fetchBlogs };
}
