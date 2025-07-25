"use client";
import { useCallback, useEffect, useState } from "react";
import { PRODUCTS_ENDPOINT } from "../constants/api";
import toast from "react-hot-toast";
import { debounce } from "lodash";
export default function useFetchProducts({ fetchOnEmptySearch = true } = {}) {
  const [products, setProducts] = useState([]);
  const [paginations, setPaginations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState({
    limit: 8,
    page: 1,
    sort: "title",
    search: "",
    category: "",
  });

  const { limit, page, sort, search, category } = query;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${PRODUCTS_ENDPOINT}?limit=${limit}&page=${page}&sort=${sort}&search=${search}&category=${category}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setPaginations(data.pagination);
      setProducts(data.products);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [limit, page, sort, search, category]);

  const debouncedFetch = useCallback(debounce(fetchProducts, 200), [
    fetchProducts,
  ]);

  useEffect(() => {
    // Nếu không muốn fetch khi search rỗng và search đang rỗng => không fetch
    if (!fetchOnEmptySearch && search.trim() === "") return;
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch, fetchOnEmptySearch, search]);

  return { loading, products, paginations, fetchProducts, setQuery, query };
}
