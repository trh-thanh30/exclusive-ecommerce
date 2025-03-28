import React, { useState } from "react";

export default function useCreateProduct() {
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: Number,
    color: [],
    size: [],
    category: "",
    quantity: Number,
    brand: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangesFiles = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagesArray.push(event.target.result);
        if (imagesArray.length === files.length) {
          setPreviewImages((prev) => [...prev, ...imagesArray]);
          setFormData((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...files],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleChangesColor = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        color: [...prev.color, e.target.value.trim()],
      }));
    }
  };
  return {
    previewImages,
    setPreviewImages,
    formData,
    setFormData,
    loading,
    setLoading,
    handleChanges,
    handleChangesFiles,
    handleChangesColor,
  };
}
