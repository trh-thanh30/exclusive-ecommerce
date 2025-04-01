import { createContext, useContext, useEffect, useState } from "react";
import { CART_ENDPOINT } from "../constants/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CardContext = createContext();
export function CartProvider({ children }) {
  const router = useRouter();
  const addToCart = async (product, color, quantity) => {
    if (!color) {
      toast.error("Please select a color");
      return;
    }
    try {
      const res = await fetch(CART_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: [
            {
              _id: product._id,
              color: color,
              quantity: parseInt(quantity),
            },
          ],
        }),
      });
      const data = await res.json();
      if (data === "Not authenticated") {
        toast.error("Please sign in or sign up to add to cart");
        router.push("/signup");
      }
      console.log(data);
      if (!res.ok) {
        console.log(data.message);
      } else if (res.ok) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <CardContext.Provider value={{ addToCart }}>
      {children}
    </CardContext.Provider>
  );
}
export const useCart = () => useContext(CardContext);
