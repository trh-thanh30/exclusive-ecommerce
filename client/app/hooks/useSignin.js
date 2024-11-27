"use client";
import {
  signinFailure,
  signinStart,
  signinSuccess,
} from "@/redux/features/user-slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function useSignin() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const signin = async (userData) => {
    dispatch(signinStart());
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
        dispatch(signinFailure(data.message));
      } else {
        dispatch(signinSuccess(data.user));
        // router.push("/");
        toast.success(data.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };
  return { loading, error, signin };
}
