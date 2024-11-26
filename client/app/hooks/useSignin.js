import { useState } from "react";
import toast from "react-hot-toast";

export default function useSignin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signin = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        console.log(error);
      } else {
        window.location.href = "/";
        toast.success(data.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, signin };
}
