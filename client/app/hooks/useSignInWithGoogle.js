"use client";

import toast from "react-hot-toast";

export default function useSignInWithGoogle() {
  const signinWithGoogle = async () => {
    try {
      window.open("http://localhost:8000/auth/google/callback", "_self");
      toast.success("Sign in sucessfully");
    } catch (error) {
      toast.error("Failed to sign in with Google");
    }
  };
  return { signinWithGoogle };
}
