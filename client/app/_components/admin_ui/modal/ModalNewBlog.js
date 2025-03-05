import React from "react";
import { MdClose } from "react-icons/md";
import Input from "../../Input";
export default function ModalNewBlog({ onClose }) {
  const styleLabel = "text-sm font-medium text-primary-900 mb-1";
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-900">
      <div className="w-2/3 max-h-screen p-6 overflow-y-scroll bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium">New Blog Item</h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-700"
          >
            <MdClose size={20} />
          </button>
        </div>

        <form>
          <div className="grid grid-cols-2 gap-4">
            {/* Title name product */}
            <div>
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
            {/* Category */}
            <div>
              <label htmlFor="category" className={`${styleLabel}`}>
                Category
              </label>
              <Input
                type="text"
                name="category"
                id={"category"}
                fullWidth={true}
                placeholder="Enter category"
              />
            </div>
            {/* Desc */}
            <div className="col-span-2">
              <label htmlFor="description" className={styleLabel}>
                Description
              </label>
              <Input
                type="text"
                isTextArea={true}
                fullWidth={true}
                name="description"
                id="description"
                placeholder="Enter product description"
              />
            </div>

            {/* Ảnh sản phẩm */}
            <div className="col-span-2">
              <label className={`${styleLabel}`}>Blog Images</label>
              <input
                type="file"
                multiple
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 my-2">
            <img
              src="https://halomobile.vn/wp-content/uploads/2023/06/iphone-15-pro-max-xanh-halo-mobile.png"
              alt=""
              className="h-24 p-1 border rounded-lg w-26 border-primary-300"
            />
            <img
              src="https://halomobile.vn/wp-content/uploads/2023/06/iphone-15-pro-max-xanh-halo-mobile.png"
              className="h-24 p-1 border rounded-lg w-26 border-primary-300"
              alt=""
            />
            <img
              src="https://halomobile.vn/wp-content/uploads/2023/06/iphone-15-pro-max-xanh-halo-mobile.png"
              className="h-24 p-1 border rounded-lg w-26 border-primary-300"
              alt=""
            />
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
