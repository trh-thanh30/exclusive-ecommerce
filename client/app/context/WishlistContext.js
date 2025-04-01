import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { WISLIST_ENDPOINT } from "../constants/api";
import {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlist-slice";

// Tạo Context
const WishlistContext = createContext();

// Provider cho Wishlist
export function WishlistProvider({ children }) {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  // Hàm gọi API để lấy danh sách wishlist
  const fetchWishlist = async () => {
    try {
      const res = await fetch(WISLIST_ENDPOINT, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!data || !data.products) {
        return;
      }
      dispatch(setWishlist(data.products));
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Gọi API một lần duy nhất khi ứng dụng chạy
  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishList = async (product) => {
    const isProductInWishlist = wishlist.some(
      (item) => item._id === product._id
    );

    try {
      const res = await fetch(WISLIST_ENDPOINT, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await res.json();
      if (!isProductInWishlist) {
        dispatch(addToWishlist(product));
        toast.success(data.message || "Added to wishlist", { icon: "💓" });
      } else {
        dispatch(removeFromWishlist(product._id));
        toast.success(data.message || "Removed from wishlist", { icon: "💔" });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const removeAllWishlist = () => {
    dispatch(setWishlist([]));
    toast.success("All wishlist items removed successfully", { icon: "���️" });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishList, removeAllWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Custom Hook để dùng Wishlist
export function useWishlist() {
  return useContext(WishlistContext);
}
