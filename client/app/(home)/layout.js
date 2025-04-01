"use client";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import { CartProvider } from "../context/CardContext";
import { WishlistProvider } from "../context/WishlistContext";
import useCheckAuth from "../hooks/useCheckAuth";

export default function HomeLayOut({ children }) {
  useCheckAuth(); // check user have token or not i need i will fix this in the future
  return (
    <>
      <CartProvider>
        <WishlistProvider>
          <Header />
          <div className="flex-1 px-3 py-3 mt-4 mb-8 md:px-12 md:py-12">
            <>{children}</>
          </div>
          <Footer />
        </WishlistProvider>
      </CartProvider>
    </>
  );
}
