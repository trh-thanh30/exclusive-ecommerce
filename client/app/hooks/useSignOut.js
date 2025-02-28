"use client";
import {
  signinFailure,
  signoutStart,
  signoutSuccess,
} from "@/redux/features/user-slice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SIGNOUT_ENDPOINT } from "../constants/api";
import { useRouter } from "next/navigation";

export default function useSignOut() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const signout = async () => {
    dispatch(signoutStart());
    try {
      const res = await fetch(SIGNOUT_ENDPOINT, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signinFailure(data));
        toast.error(data.message || "Failed to sign out");
      } else {
        dispatch(signoutSuccess(data));
        toast.success("Sign out successfully");
        router.push("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { loading, error, signout };
}
