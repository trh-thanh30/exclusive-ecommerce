"use client";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import useCheckAuth from "../hooks/useCheckAuth";

export default function HomeLayOut({ children }) {
  useCheckAuth();
  return (
    <>
      <Header />
      <div className="flex-1 px-8 py-8">
        <main className="w-full mx-auto max-w-7xl">{children}</main>
      </div>
      <Footer />
    </>
  );
}
