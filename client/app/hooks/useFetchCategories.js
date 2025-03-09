"use client";
import { useEffect, useState } from "react";
import { CATEGORIES_ENDPOINT } from "../constants/api";
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
        console.log(data);
        setCategories(data.categories);
        setPagination(data.pagination);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategories();
  }, []);
  return { loading, categories, pagination };
}
