"use client";
import { useState } from "react";

export default function useCreatedBlog() {
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeFiles = (e) => {
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
  
  return {
    previewImages,
    setPreviewImages,
    formData,
    setFormData,
    loading,
    setLoading,
    handleChanges,
    handleChangeFiles,
  };
}
