"use client";
import { useState } from "react";
import CategoriesTableUi from "../table/TableCategories";
import { CiCirclePlus } from "react-icons/ci";
import { sizeIconSecondary } from "@/app/constants/icons";
import ModalNewCategory from "../modal/ModalNewCategory";
import useFetchCategories from "@/app/hooks/useFetchCategories";
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
  const { loading, categories, pagination } = useFetchCategories();
  const handleOpenModal = () => {
    setOpenModal((open) => !open);
  };
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
            data={categories}
            tableHeader={tableHeader}
            paginations={pagination}
          />
        </div>
      </div>
      {openModal ? <ModalNewCategory onClose={handleOpenModal} /> : ""}
    </>
  );
}
