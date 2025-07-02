"use client";
import React, { useState } from "react";
import { sizeIconSecondary } from "@/app/constants/icons";
import { CiCirclePlus } from "react-icons/ci";
import TableBlogUi from "../table/TableBlogUi";
import ModalNewBlog from "../modal/ModalNewBlog";
import useFetchBlog from "@/app/hooks/useFetchBlog";
import toast from "react-hot-toast";
import { DELETE_BLOG_ENDPOINT } from "@/app/constants/api";
import Swal from "sweetalert2";
import useAlertDelete from "@/app/hooks/useAlertDelete";
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
export default function BlogDash() {
  const { loading, blogs, pagination, fetchBlogs } = useFetchBlog();
  const [openModal, setOpenModal] = useState();
  const [modModal, setModModal] = useState("");

  const handleOpenModal = (mode) => {
    setOpenModal((open) => !open);
    setModModal(mode);
  };

  const { alertDelete } = useAlertDelete({
    functionDelete: async (id) => {
      try {
        const res = await fetch(`${DELETE_BLOG_ENDPOINT}/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
        } else {
          toast.success("Blog deleted successfully");
          fetchBlogs();
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    textDelete: "this blog",
  });
  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-medium">Blogs Summary</h1>
          <button
            onClick={() => handleOpenModal("created")}
            className="flex items-center gap-4 p-2 text-xs transition-colors border border-primary-900 text-primary-900 rounded-xl hover:bg-primary-900 hover:text-primary-50"
          >
            <span>Add a New Blog</span>
            <CiCirclePlus size={sizeIconSecondary} />
          </button>
        </div>
        <div className="flex flex-col w-full min-h-screen mt-6 bg-white rounded-lg shadow-md bg-clip-border">
          <TableBlogUi
            handleDelete={alertDelete}
            openModal={handleOpenModal}
            modModal={modModal}
            loading={loading}
            data={blogs}
            tableHeader={tableHeader}
            setOpenModal={setOpenModal}
            paginations={pagination}
          />
        </div>
      </div>
      {openModal ? (
        <ModalNewBlog
          data={blogs}
          modModal={modModal}
          fetchBlogs={fetchBlogs}
          onClose={handleOpenModal}
        />
      ) : (
        ""
      )}
    </>
  );
}
