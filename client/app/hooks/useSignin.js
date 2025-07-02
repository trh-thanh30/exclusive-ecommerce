"use client";
import {
  signinFailure,
  signinStart,
  signinSuccess,
} from "@/redux/features/user-slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SIGNIN_ENDPOINT } from "../constants/api";
import { useState } from "react";

export default function useSignin() {
  const { loading } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = async (userData) => {
    dispatch(signinStart());
    setError(null);
    try {
      const res = await fetch(SIGNIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signinFailure(data.message));
        toast.error(data.message);
        setError(data.message);
      } else {
        console.log(data);
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("role", data.user.role_name);
        dispatch(signinSuccess(data));
        toast.success("Sign in successfully");
        router.push("/");
        setError(null);
      }
    } catch (error) {
      dispatch(signinFailure(error.message));
      toast.error(error.message);
      setError(error.message);
    }
  };
  return { loading, error, signin };
}
