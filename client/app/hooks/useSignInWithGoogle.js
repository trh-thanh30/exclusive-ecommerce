"use client";
import { signinFailure, signinSuccess } from "@/redux/features/user-slice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function useSignInWithGoogle() {
  const dispatch = useDispatch();
  const signinWithGoogle = async () => {
    window.open('http://localhost:8000/auth/google/callback', "_self");
  };
  return { signinWithGoogle };
}
