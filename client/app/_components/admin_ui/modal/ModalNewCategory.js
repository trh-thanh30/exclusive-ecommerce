import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Input from "../../Input";
import toast from "react-hot-toast";
import { CREATE_CATEGORY_ENDPOINT } from "@/app/constants/api";

export default function ModalNewCategory({ onClose, fetchCategories }) {
  const styleLabel = "text-sm font-medium text-primary-900 mb-1";
  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCreatedCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(CREATE_CATEGORY_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        onClose();
        setTitle("");
        await fetchCategories();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-900">
      <div className="w-2/3 max-h-screen p-6 overflow-y-scroll bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium">New Category Item</h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-700"
          >
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleCreatedCategory}>
          <div>
            {/* Title name product */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className={`${styleLabel}`}>
                Category Title
              </label>
              <Input
                type="text"
                name={"title"}
                id={"title"}
                onChange={onChangeTitle}
                fullWidth={true}
                placeholder="Enter category title"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg text-primary-700 bg-primary-200 hover:opacity-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg text-primary-50 bg-primary-900 hover:opacity-95"
            >
              Created Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
