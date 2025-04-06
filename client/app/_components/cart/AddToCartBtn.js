import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";

export default function AddToCartBtn({
  product,
  colorGet,
  quantity,
  addToCart,
  color,
}) {
  const [status, setStatus] = useState("idle");
  const [drop, setDrop] = useState(false);
  const [cartPos, setCartPos] = useState("start");
  const handleClick = () => {
    setStatus("moving");
    setCartPos("center");
    addToCart(product, colorGet, quantity);
    setTimeout(() => {
      setDrop(true);
    }, 500);

    setTimeout(() => {
      setCartPos("end");
      setDrop(false);
    }, 1000);

    setTimeout(() => {
      setStatus("added");
    }, 1500);
  };

  useEffect(() => {
    if (status === "added") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setCartPos("start");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="relative inline-block text-nowrap">
      <button
        type="button"
        disabled={status === "added" || status === "moving"}
        onClick={handleClick}
        className="relative flex items-center justify-center gap-2 px-4 py-3 overflow-hidden text-xs transition-all duration-300 rounded-md shadow-lg md:py-3 md:text-sm md:px-7 bg-primary-900 text-primary-50 hover:opacity-90 shadow-primary-500"
      >
        {status === "added" && color ? null : (
          <FiShoppingCart
            className={`w-4 h-4 transition-transform duration-500 ${
              cartPos === "start"
                ? "translate-x-0"
                : cartPos === "center" && color
                ? "xl:translate-x-[42px] translate-x-9"
                : cartPos === "end" && color && "translate-x-20"
            }`}
          />
        )}

        <span
          className={`transition-all duration-300 ${
            status === "moving" && color
              ? "scale-0 opacity-0"
              : "scale-100 opacity-100"
          }`}
        >
          {status === "added" && color ? (
            <div className="flex items-center gap-1 text-xs md:text-sm">
              <TiTickOutline className="w-4 h-4" />
              <span>Added</span>
            </div>
          ) : (
            "Add to Cart"
          )}
        </span>
      </button>

      {drop && color && (
        <MdOutlineShoppingBag className="absolute top-0 w-4 h-4 transform -translate-x-1/2 text-primary-50 left-1/2 animate-fall" />
      )}
    </div>
  );
}
