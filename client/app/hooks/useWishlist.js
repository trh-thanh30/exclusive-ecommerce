import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { WISLIST_ENDPOINT } from "../constants/api";

import { useEffect } from "react";
import {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
} from "@/redux/features/wishlist-slice";

export default function useWishlist() {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const fetchWishlist = async () => {
    try {
      const res = await fetch(WISLIST_ENDPOINT, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        return null;
      } else {
        if (data.products.length > 0 || wishlist.length > 0) {
          dispatch(setWishlist(data.products));
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await res.json();
      if (!res.ok) {
        return null;
      }
      if (!isProductInWishlist) {
        dispatch(addToWishlist(product));
        toast(data.message, {
          icon: '💓'
        });
      } else {
        dispatch(removeFromWishlist(product._id));
        toast(data.message, {
          icon: '💔'
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    wishlist,
    fetchWishlist,
    addToWishList,
  };
}
