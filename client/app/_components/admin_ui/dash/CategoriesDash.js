"use client";
import { useState } from "react";
import CategoriesTableUi from "../table/TableCategories";
import { CiCirclePlus } from "react-icons/ci";
import { sizeIconSecondary } from "@/app/constants/icons";
import ModalNewCategory from "../modal/ModalNewCategory";
import useFetchCategories from "@/app/hooks/useFetchCategories";
import toast from "react-hot-toast";
import { DELETE_CATEGORY_ENDPOINT } from "@/app/constants/api";
import useAlertDelete from "@/app/hooks/useAlertDelete";
const tableHeader = [
  {
    name: "id",
  },
  {
    name: "title",
  },
  {
    name: "created at",
  },
  {
    name: "action",
  },
];
export default function CategoriesDash() {
  const [openModal, setOpenModal] = useState();
  const { loading, categories, pagination, fetchCategories, query, setQuery } =
    useFetchCategories();
  const handleOpenModal = () => {
    setOpenModal((open) => !open);
  };
  const { alertDelete } = useAlertDelete({
    functionDelete: async (id) => {
      try {
        const res = await fetch(`${DELETE_CATEGORY_ENDPOINT}/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          fetchCategories();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    textDelete: "this category",
  });
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-medium">Blogs Summary</h1>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-4 p-2 text-xs transition-colors border border-primary-900 text-primary-900 rounded-xl hover:bg-primary-900 hover:text-primary-50"
          >
            <span>Add a New Category</span>
            <CiCirclePlus size={sizeIconSecondary} />
          </button>
        </div>
        <div className="flex flex-col w-full min-h-screen mt-6 bg-white rounded-lg shadow-md bg-clip-border">
          <CategoriesTableUi
            openModal={handleOpenModal}
            loading={loading}
            query={query}
            setQuery={setQuery}
            data={categories}
            handleDelete={alertDelete}
            tableHeader={tableHeader}
            paginations={pagination}
          />
        </div>
      </div>
      {openModal ? (
        <ModalNewCategory
          fetchCategories={fetchCategories}
          onClose={handleOpenModal}
        />
      ) : (
        ""
      )}
    </>
  );
}
