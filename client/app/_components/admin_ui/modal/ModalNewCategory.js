import React from "react";
import { MdClose } from "react-icons/md";
import Input from "../../Input";

export default function ModalNewCategory({ onClose }) {
  const styleLabel = "text-sm font-medium text-primary-900 mb-1";
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

        <form>
          <div>
            {/* Title name product */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className={`${styleLabel}`}>
                Blog Name
              </label>
              <Input
                type="text"
                name={"title"}
                id={"title"}
                fullWidth={true}
                placeholder="Enter product name"
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
              Save Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
