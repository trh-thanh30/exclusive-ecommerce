"use client"
import  { useEffect, useState } from "react";
import { CUSTOMERS_ENDPOINT } from "../constants/api";

export default function useFetchCustomer() {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState([]);
  const [pagination, setPagination] = useState([]);
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await fetch(CUSTOMERS_ENDPOINT, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setCustomer(data.data.users);
        setPagination(data.data.pagination);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);
  return { loading, pagination, customer };
}
