"use client";
import { sizeIconSecondary } from "@/app/constants/icons";
import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import ModalNewProducts from "../modal/ModalNewProducts";
import { PRODUCTS_ENDPOINT } from "@/app/constants/api";
import TableProductUi from "../table/TableProductsUi";
const tableHeader = [
  {
    name: "Image",
  },
  {
    name: "Product Name",
  },
  {
    name: "Category",
  },
  {
    name: "Price",
  },
  {
    name: "Quantity",
  },
  {
    name: "Coupon",
  },
  {
    name: "Total rating",
  },
  {
    name: "Created At",
  },
  {
    name: "Action",
  },
];
export default function ProductsDash() {
  const [openModal, setOpenModal] = useState();
  const [products, setProducts] = useState([]);
  const [paginations, setPaginations] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleOpenModal = () => {
    setOpenModal((open) => !open);
  };
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
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-medium">Products Summary</h1>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-4 p-2 text-xs transition-colors border border-primary-900 text-primary-900 rounded-xl hover:bg-primary-900 hover:text-primary-50"
          >
            <span>Add a New Product</span>
            <CiCirclePlus size={sizeIconSecondary} />
          </button>
        </div>
        <div className="flex flex-col w-full min-h-screen mt-6 bg-white rounded-lg shadow-md bg-clip-border">
          <TableProductUi
            openModal={handleOpenModal}
            loading={loading}
            data={products}
            tableHeader={tableHeader}
            paginations={paginations}
          />
        </div>
      </div>
      {openModal ? <ModalNewProducts onClose={handleOpenModal} /> : ""}
    </>
  );
}
