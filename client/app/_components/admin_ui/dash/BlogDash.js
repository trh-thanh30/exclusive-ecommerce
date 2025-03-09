"use client";
import React, {  useState } from "react";
import { sizeIconSecondary } from "@/app/constants/icons";
import { CiCirclePlus } from "react-icons/ci";
import TableBlogUi from "../table/TableBlogUi";
import ModalNewBlog from "../modal/ModalNewBlog";
import useFetchBlog from "@/app/hooks/useFetchBlog";
const tableHeader = [
  {
    name: "Image",
  },
  {
    name: "Title",
  },
  {
    name: "Category",
  },
  {
    name: "Views",
  },
  {
    name: "Num Likes",
  },
  {
    name: "Num dislikes",
  },
  {
    name: "Author",
  },
  {
    name: "Created at",
  },
  {
    name: "Actions",
  },
];
export default function ConversatiDash() {
  const { loading, blogs, pagination } = useFetchBlog();
  const [openModal, setOpenModal] = useState();
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
            <span>Add a New Blog</span>
            <CiCirclePlus size={sizeIconSecondary} />
          </button>
        </div>
        <div className="flex flex-col w-full min-h-screen mt-6 bg-white rounded-lg shadow-md bg-clip-border">
          <TableBlogUi
            openModal={handleOpenModal}
            loading={loading}
            data={blogs}
            tableHeader={tableHeader}
            paginations={pagination}
          />
        </div>
      </div>
      {openModal ? <ModalNewBlog onClose={handleOpenModal} /> : ""}
    </>
  );
}
