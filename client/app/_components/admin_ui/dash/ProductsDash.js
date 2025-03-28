"use client";
import { sizeIconSecondary } from "@/app/constants/icons";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import ModalNewProducts from "../modal/ModalNewProducts";
import TableProductUi from "../table/TableProductsUi";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import useAlertDelete from "@/app/hooks/useAlertDelete";
import { DELETE_PRODUCT_ENDPOINT } from "@/app/constants/api";
import toast from "react-hot-toast";
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
  const { loading, products, paginations, fetchProducts, setQuery, query } =
    useFetchProducts();
  const handleOpenModal = () => {
    setOpenModal((open) => !open);
  };
  const { alertDelete } = useAlertDelete({
    functionDelete: async (id) => {
      try {
        const res = await fetch(`${DELETE_PRODUCT_ENDPOINT}/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
        } else {
          toast.success("Product deleted successfully");
          fetchProducts();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    textDelete: "this product",
  });
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
            query={query}
            setQuery={setQuery}
            handleDelete={alertDelete}
            paginations={paginations}
          />
        </div>
      </div>
      {openModal ? (
        <ModalNewProducts
          fetchProducts={fetchProducts}
          onClose={handleOpenModal}
        />
      ) : (
        ""
      )}
    </>
  );
}
