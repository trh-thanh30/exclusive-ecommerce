"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        console.log(error);
      } else {
        toast.success(data.message);
        router.push("/signin");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, signup };
}
