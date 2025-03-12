"use client";
import { useEffect, useState } from "react";
import { CATEGORIES_ENDPOINT } from "../constants/api";
import toast from "react-hot-toast";
export default function useFetchCategories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch(CATEGORIES_ENDPOINT, {
          method: "GET",
        });
        const data = await res.json();
        setCategories(data.categories);
        setPagination(data.pagination);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchCategories();
  }, []);
  return { loading, categories, pagination };
}
