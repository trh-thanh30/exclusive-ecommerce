"use client";
import { signinFailure, signinSuccess } from "@/redux/features/user-slice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function useGetUserWithGoogle() {
  const dispatch = useDispatch();
  const [userGoogle, setUserGoogle] = useState(null);
  const user = async () => {
    try {
      const res = await fetch("http://localhost:8000/google/user", {
        credentials: "include", // Đảm bảo gửi cookie/session
      });
      // Trích xuất dữ liệu JSON từ response
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch user data");
        return;
      }

      // Lưu thông tin user vào Redux và state
      dispatch(signinSuccess(data));
      setUserGoogle(data); // Chỉ lưu dữ liệu JSON vào state
      toast.success("Fetched user data successfully");
    } catch (error) {
      dispatch(signinFailure(error.message));
      toast.error(error.message || "Something went wrong");
    }
  };
  useEffect(() => {
    user();
  }, []);

  return { user, userGoogle };
}
