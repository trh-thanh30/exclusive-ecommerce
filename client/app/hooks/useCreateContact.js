"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CREATE_CONTACT_ENDPOINT } from "../constants/api";

export default function useCreateContact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    note: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(CREATE_CONTACT_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
      }
      toast.success(data.message);
      setLoading(false);
      setFormData({
        username: "",
        email: "",
        note: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return {
    formData,
    handleChange,
    handleSubmitContact,
    loading,
  };
}
