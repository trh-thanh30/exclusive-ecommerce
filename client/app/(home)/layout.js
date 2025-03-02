"use client";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import useCheckAuth from "../hooks/useCheckAuth";

export default function HomeLayOut({ children }) {
  useCheckAuth();
  return (
    <>
      <Header />
      <div className="flex-1 md:px-8 md:py-8 px-3 py-3 mt-4">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
