"use client";
import { sizeIconSecondary } from "@/app/constants/icons";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import ModalNewProducts from "../modal/ModalNewProducts";
import TableUi from "../table/TableUi";
const tableHeader = [
  {
    name: "Img",
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
  }
];
export default function ProductsDash() {
  const [openModal, setOpenModal] = useState();
  const handleOpenModal = () => {
    setOpenModal((open) => !open);
  };
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
        <div className="relative flex flex-col w-full h-full mt-5 overflow-scroll text-gray-700 bg-white rounded-lg shadow-md bg-clip-border">
          <TableUi tableHeader={tableHeader}  />
        </div>
      </div>
      {openModal ? <ModalNewProducts onClose={handleOpenModal} /> : ""}
    </>
  );
}
