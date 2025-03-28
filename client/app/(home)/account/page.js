"use client";
import { useRouter, useSearchParams } from "next/navigation";
import FormAccount from "../../_components/FormAccount";
import AccountHeader from "@/app/_components/AccountHeader";
import { useEffect, useState } from "react";
import SidebarAccount from "@/app/_components/SidebarAccount";
import TableOrderAccount from "@/app/_components/TableOrderAccount";
import WishListAccount from "@/app/_components/WishListAccount";
import { AiOutlinePlus } from "react-icons/ai";

export default function Page() {
  const location = useSearchParams();
  const manage = location.get("manage");
  const router = useRouter();

  const handleChangeOptions = (e) => {
    const value = e.target.value;
    router.push(`/account?manage=${value}`);
  };
  useEffect(() => {
    if (!manage) {
      router.push("/account?manage=account");
    }
  }, [manage]);

  return (
    <>
      {/* Header */}
      <AccountHeader />
      <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr] md:gap-8 gap-4 md:mt-14 mt-8 ">
        {/* Sidebar */}
        <SidebarAccount
          handleChangeOptions={handleChangeOptions}
          manage={manage}
        />
        {/* FORM ACCOUNT */}
        {manage === "account" && <FormAccount />}
        {/* FORM ADDRESS */}
        {manage === "address" && (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-xl font-medium">Address</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-xs transition-colors border rounded-full border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-50">
                <span>Add New Address</span>
                <AiOutlinePlus size={16} />
              </button>
            </div>
          </div>
        )}
        {/* FORM ORDERS */}
        {manage === "orders" && <TableOrderAccount />}
        {/* FORM WISHLIST */}
        {manage === "wishlist" && <WishListAccount />}
      </div>
    </>
  );
}
