import { createContext, useContext, useEffect, useState } from "react";
import { CART_ENDPOINT } from "../constants/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CartContext = createContext();
export function CartProvider({ children }) {
  const router = useRouter();
  const [carts, setCarts] = useState([]);
  const [totalPriceCarts, setTotalPriceCarts] = useState(0);
  const [loading, setLoading] = useState(false);
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
        return;
      }
      if (!res.ok) {
        console.log(data.message);
      } else if (res.ok) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFetchCarts = async () => {
    setLoading(true);

    try {
      const res = await fetch(CART_ENDPOINT, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setLoading(false);
      setCarts(data.cart.products);
    } catch (error) {
      console.error("Fetch Cart Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchCarts();
  }, []);
  const handleChangeQuantity = async (index, type, cartId) => {
    setCarts((prevCarts) => {
      return prevCarts.map((cart, i) =>
        i === index
          ? {
              ...cart,
              quantity:
                type === "increment" ? cart.quantity + 1 : cart.quantity - 1,
            }
          : cart
      );
    });

    try {
      const res = await fetch(`${CART_ENDPOINT}/update-quantity`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          quantity: carts[index].quantity + (type === "increment" ? 1 : -1),
        }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");
    } catch (error) {
      console.error(error.message);
      // Rollback nếu có lỗi
      setCarts((prevCarts) => [...prevCarts]);
    }
  };
  useEffect(() => {
    const totalPrice = carts.reduce(
      (acc, cart) => acc + cart.quantity * cart.product.price,
      0
    );
    setTotalPriceCarts(totalPrice);
  }, [carts]);
  const handleRemoveItem = async (cartId) => {
    try {
      const res = await fetch(`${CART_ENDPOINT}/remove-cart`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });
      if (!res.ok) {
        console.log("Have error");
        return;
      }
      const data = await res.json();
      toast.success(data.message);
      handleFetchCarts();
    } catch (error) {
      console.log(error.message);
    }
  };
  const cartLength = carts.reduce((a, b) => a + b.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        carts,
        handleChangeQuantity,
        handleRemoveItem,
        totalPriceCarts,
        cartLength,
        loading,
        handleFetchCarts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
