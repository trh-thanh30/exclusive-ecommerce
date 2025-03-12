"use client";
import { useEffect, useState } from "react";
import { PRODUCTS_ENDPOINT } from "../constants/api";
import toast from "react-hot-toast";
export default function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [paginations, setPaginations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${PRODUCTS_ENDPOINT}`, {
          method: "GET",
        });
        const data = await res.json();
        setPaginations(data.pagination);
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProducts();
  }, []);
  return { loading, products, paginations };
}
