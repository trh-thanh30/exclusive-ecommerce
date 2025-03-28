import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import Input from "../../Input";
import useCreateProduct from "@/app/hooks/useCreateProduct";
import SpinnerMini from "../../SpinnerMini";
import { CREATE_PRODUCT_ENDPOINT } from "@/app/constants/api";
import toast from "react-hot-toast";
import useFetchCategories from "@/app/hooks/useFetchCategories";
export default function ModalNewProducts({ onClose, fetchProducts }) {
  const styleLabel = "text-sm font-medium text-primary-900 mb-1";
  const [addNewInputColor, setNewInputColor] = useState([""]);
  const { categories } = useFetchCategories();
  const handleAddInputColor = () => {
    setNewInputColor([...addNewInputColor, ""]);
  };
  const {
    formData,
    handleChanges,
    loading,
    previewImages,
    setLoading,
    handleChangesFiles,
    setFormData,
    handleChangesColor,
  } = useCreateProduct();
  console.log(formData);
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("quantity", formData.quantity);
    form.append("category", formData.category);
    form.append("brand", formData.brand);
    formData.color.forEach((color, i) => {
      form.append(`color`, color);
    });
    formData.images.forEach((image, index) => {
      form.append(`images`, image);
    });
    setLoading(true);

    try {
      const res = await fetch(CREATE_PRODUCT_ENDPOINT, {
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
          price: "",
          quantity: "",
          category: "",
          brand: "",
          color: [],
          images: [],
        });
        onClose();
        await fetchProducts();
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-neutral-900">
      <div className="w-2/3 max-h-screen p-6 overflow-y-scroll bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-medium">New Product Item</h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-700"
          >
            <MdClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmitProduct}>
          <div className="grid grid-cols-2 gap-4">
            {/* Title name product */}
            <div>
              <label htmlFor="title" className={`${styleLabel}`}>
                Product Name
              </label>
              <Input
                type="text"
                name={"title"}
                onChange={handleChanges}
                id={"title"}
                fullWidth={true}
                placeholder="Enter product name"
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className={`${styleLabel}`}>
                Price ($)
              </label>
              <Input
                type="number"
                onChange={handleChanges}
                name="price"
                id={"price"}
                fullWidth={true}
                placeholder="Enter price"
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
                fullWidth={true}
                name="description"
                id="description"
                placeholder="Enter product description"
              />
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className={`${styleLabel}`}>
                Quantity
              </label>
              <Input
                fullWidth={true}
                type="number"
                name="quantity"
                onChange={handleChanges}
                id={"quantity"}
                placeholder="Enter quantity"
              />
            </div>

            {/* Colors */}
            <div className="relative group">
              <label htmlFor="color" className={`${styleLabel}   block`}>
                Color
              </label>
              <span
                onClick={handleAddInputColor}
                className="absolute right-0 flex items-center gap-1 p-1 text-xs transition-all rounded-full opacity-0 hover:cursor-pointer hover:opacity-90 -top-1 group-hover:opacity-100 bg-primary-900 text-primary-50"
              >
                Add new color
                <MdAdd />
              </span>
              {addNewInputColor.map((input, index) => (
                <Input
                  type="text"
                  className={"mb-2"}
                  key={index}
                  onKeyDown={handleChangesColor}
                  name={`color`}
                  id={`color`}
                  fullWidth={true}
                  placeholder="Enter color"
                />
              ))}
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className={`${styleLabel}`}>
                Category
              </label>
              <select
                className="p-2 text-sm border rounded-lg outline-none border-primary-400 text-primary-800"
                id="category"
                name="category"
                onChange={handleChanges}
              >
                <option className="text-xs text-primary-400">
                  -----Select a category-----
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label htmlFor="brand" className={`${styleLabel}`}>
                Brand
              </label>
              <Input
                type="text"
                onChange={handleChanges}
                name="brand"
                id={"brand"}
                fullWidth={true}
                placeholder="Enter brand"
              />
            </div>

            {/* Ảnh sản phẩm */}
            <div className="col-span-2">
              <label className={`${styleLabel}`}>Product Images</label>
              <input
                type="file"
                onChange={handleChangesFiles}
                id="images"
                accept="image/*"
                name="images"
                multiple
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
              {loading ? <SpinnerMini /> : "Created Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
