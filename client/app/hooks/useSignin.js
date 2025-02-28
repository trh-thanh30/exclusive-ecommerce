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

export default function useSignin() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = async (userData) => {
    dispatch(signinStart());
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
        throw new Error(data.message);
      }
      if (res.ok) {
        dispatch(signinSuccess(data));
        toast.success("Sign in successfully");
        router.push("/");
      }
    } catch (error) {
      dispatch(signinFailure(error.message));
      toast.error(error.message);
    }
  };
  return { loading, error, signin };
}
