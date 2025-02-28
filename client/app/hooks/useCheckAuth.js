import { useEffect, useState } from "react";
import { CHECHAUTH_ENDPOINT } from "../constants/api";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "@/redux/features/user-slice";
import { persistor } from "@/redux/store";

export default function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(CHECHAUTH_ENDPOINT, {
          credentials: "include",
          method: "GET",
        });
        const data = await res.json();
        if (!data.authenticated) {
          dispatch(signoutSuccess());
          await persistor.purge(); // Xoa localStorage cua redux persit
        }
      } catch (error) {
        dispatch(signoutSuccess());
        await persistor.purge(); 
      }
    };
    checkAuth();
  }, [dispatch]);
  return null;
}
