import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Input from "../../Input";
import toast from "react-hot-toast";
import { CREATE_BLOG_ENDPOINT, GET_BLOG_ENDPOINT } from "@/app/constants/api";
import SpinnerMini from "../../SpinnerMini";
import useCreatedBlog from "@/app/hooks/useCreatedBlog";
export default function ModalNewBlog({ onClose, fetchBlogs, modModal, data }) {
  const styleLabel = "text-sm font-medium text-primary-900 mb-1";
  const [blogItem, setblogItem] = useState([]);
  const {
    formData,
    handleChangeFiles,
    handleChanges,
    loading,
    previewImages,
    setFormData,
    setLoading,
  } = useCreatedBlog();
  const handleSubmitCreated = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("category", formData.category);
    formData.images?.forEach((image, index) => {
      form.append(`images`, image);
    });
    setLoading(true);
    try {
      const res = await fetch(CREATE_BLOG_ENDPOINT, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
      } else {
        toast.success(data.message);
        setLoading(false);
        setFormData({
          title: "",
          description: "",
          category: "",
          images: [],
        });
        onClose();
        await fetchBlogs();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  data.map((item) => {
    useEffect(() => {
      setblogItem(item);
    }, []);
  });

  const handleSubmitUpdate = async (e) => {};
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-900">
      <div className="w-2/3 max-h-screen p-6 overflow-y-scroll bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium">
            {modModal === "created" ? "New Blog Item" : "Update Blog Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-700"
          >
            <MdClose size={20} />
          </button>
        </div>

        <form
          onSubmit={
            modModal === "created" ? handleSubmitCreated : handleSubmitUpdate
          }
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Title name product */}
            <div>
              <label htmlFor="title" className={`${styleLabel}`}>
                Blog Name
              </label>
              <Input
                type="text"
                name={"title"}
                defaultValue={modModal === "edit" ? blogItem.title : ""}
                onChange={handleChanges}
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
                defaultValue={modModal === "edit" ? blogItem.category : ""}
                onChange={handleChanges}
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
                onChange={handleChanges}
                defaultValue={modModal === "edit" ? blogItem.description : ""}
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
                id="images"
                accept="image/*"
                name="images"
                onChange={handleChangeFiles}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 my-2">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                className="h-24 p-1 border rounded-lg w-26 border-primary-300"
              />
            ))}
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
              {loading ? (
                <SpinnerMini />
              ) : modModal === "created" ? (
                "Created Blog"
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
