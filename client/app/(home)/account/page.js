"use client";
import { useRouter, useSearchParams } from "next/navigation";
import FormAccount from "../../_components/FormAccount";
import AccountHeader from "@/app/_components/AccountHeader";
import { useEffect } from "react";
import SidebarAccount from "@/app/_components/SidebarAccount";
import TableOrderAccount from "@/app/_components/TableOrderAccount";
import WishListAccount from "@/app/_components/WishListAccount";
import AddressAccount from "@/app/_components/AddressAccount";
import { checkAuthOrRedirect } from "@/app/hooks/useCheckAuth";

export default function Page() {
  const location = useSearchParams();
  const manage = location.get("manage");
  const router = useRouter();

  const handleChangeOptions = (e) => {
    const value = e.target.value;
    router.push(`/account?manage=${value}`);
  };
  useEffect(() => {
    checkAuthOrRedirect(); // Chỉ cần đăng nhập
  }, []);
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
        {manage === "address" && <AddressAccount />}
        {/* FORM ORDERS */}
        {manage === "orders" && <TableOrderAccount />}
        {/* FORM WISHLIST */}
        {manage === "wishlist" && <WishListAccount />}
      </div>
    </>
  );
}
