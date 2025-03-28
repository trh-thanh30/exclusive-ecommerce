"use client";
import { useCallback, useEffect, useState } from "react";
import { CATEGORIES_ENDPOINT } from "../constants/api";
import toast from "react-hot-toast";
import { debounce } from "lodash";
export default function useFetchCategories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [query, setQuery] = useState({
    limit: 0,
    page: 1,
    sort: "title",
    search: "",
  });
  const { limit, page, sort, search } = query;
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${CATEGORIES_ENDPOINT}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setCategories(data.categories);
      setPagination(data.pagination);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  }, [query]);
  const debouncedFetch = useCallback(debounce(fetchCategories, 200), [
    fetchCategories,
  ]);
  useEffect(() => {
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);
  return { loading, categories, pagination, fetchCategories, query, setQuery };
}
