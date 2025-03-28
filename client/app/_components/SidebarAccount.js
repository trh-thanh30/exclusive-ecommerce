import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function SidebarAccount({ manage, handleChangeOptions }) {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="px-4 py-10 bg-white h-fit">
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          className="w-20 h-20 rounded-full cursor-pointer"
          src={user?.user?.avatar}
          alt="Profile"
        />
        <h2 className="text-sm font-medium">{user?.user?.username}</h2>
      </div>
      <div className="flex-col hidden gap-5 mt-10 text-xs font-medium transition-colors md:flex md:text-sm text-primary-400">
        <Link
          href="/account?manage=account"
          className={`${
            manage === "account" &&
            "text-primary-900 border-b border-b-primary-900"
          } hover:text-primary-900`}
        >
          Account
        </Link>
        <Link
          href="/account?manage=address"
          className={`${
            manage === "address" &&
            "text-primary-900 border-b border-b-primary-900"
          } hover:text-primary-900`}
        >
          Address
        </Link>
        <Link
          href="/account?manage=orders"
          className={`${
            manage === "orders" &&
            "text-primary-900 border-b border-b-primary-900"
          } hover:text-primary-900`}
        >
          Orders
        </Link>
        <Link
          href="/account?manage=wishlist"
          className={`${
            manage === "wishlist" &&
            "text-primary-900 border-b border-b-primary-900"
          } hover:text-primary-900`}
        >
          Wishlist
        </Link>
        <button className="p-2 rounded-md bg-error-50 text-error-500">
          Log Out
        </button>
      </div>
      <select
        className="py-[7px] px-2 text-xs border rounded-lg outline-none border-primary-300 text-primary-800 w-full md:w-fit sm:mt-0 mt-2 md:hidden block"
        id="manage"
        name="manage"
        value={manage || "account"}
        onChange={handleChangeOptions}
      >
        <option value="account">Account</option>
        <option value="address">Address</option>
        <option value="orders">Orders</option>
        <option value="wishlist">Wishlist</option>
      </select>
    </div>
  );
}
