"use client";
import { useCallback, useEffect, useState } from "react";
import ModalNewProducts from "../modal/ModalNewProducts";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import useAlertDelete from "@/app/hooks/useAlertDelete";
import { DELETE_PRODUCT_ENDPOINT, ORDER_ENDPOINT } from "@/app/constants/api";
import toast from "react-hot-toast";
import TableOrderUi from "../table/TableOrderUi";
const tableHeader = [
  {
    name: "Customer Name",
  },
  {
    name: "Order Date",
  },
  {
    name: "Order Type",
  },
  {
    name: "Tracking ID",
  },
  {
    name: "Order Total",
  },
  {
    name: "Action",
  },
  {
    name: "Status",
  },
  {
    name: "",
  },
];
export default function OrderDash() {
  const [openModal, setOpenModal] = useState();
  const [orders, serOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState([]);
  const [query, setQuery] = useState({
    limit: 10,
    page: 1,
    search: "",
  });
  const { limit, page, search } = query;
  const handleOpenModal = () => {
    setOpenModal((open) => !open);
  };
  const handleFetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${ORDER_ENDPOINT}/getAllOrdersAdmin?limit=${limit}&page=${page}&search=${search}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        console.log("Have error");
      } else if (res.ok) {
        setLoading(false);
        serOrders(data.orders);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [page, limit, search]);

  useEffect(() => {
    handleFetchOrders();
  }, [page, limit, search]);
  return (
    <>
      <div className="p-6">
        <h1 className="text-base font-medium">Orders Summary</h1>

        <div className="flex flex-col w-full min-h-screen mt-6 bg-white rounded-lg shadow-md bg-clip-border">
          <TableOrderUi
            openModal={handleOpenModal}
            tableHeader={tableHeader}
            loading={loading}
            fetchOrders={handleFetchOrders}
            data={orders}
            pagination={pagination}
            setQuery={setQuery}
            query={query}
          />
        </div>
      </div>
      {openModal ? <ModalNewProducts onClose={handleOpenModal} /> : ""}
    </>
  );
}
