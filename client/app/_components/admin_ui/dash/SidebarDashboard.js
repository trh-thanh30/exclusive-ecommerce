"use client";
import {
  FaShoppingBag,
  FaUsers,
  FaClipboardList,
  FaComments,
  FaThLarge,
} from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import useSignOut from "@/app/hooks/useSignOut";
import Logo from "../../Logo";
import SpinnerMini from "../../SpinnerMini";

export default function SidebarDashboard() {
  const styleLink =
    "flex items-center rounded-lg font-medium gap-4 text-sm p-3 hover:bg-neutral-900 hover:text-neutral-50 transition-colors";
  const location = useSearchParams();
  const tab = location.get("tab");
  const { loading, signout } = useSignOut();
  return (
    <div className="flex flex-col bg-white shadow-md min-w-64 p-7 ">
      <Logo logoDefault={true} />
      <nav className="flex flex-col flex-grow gap-4 mt-8">
        {/* DASHBOARD HOME */}
        <Link
          href={"/dashboard?tab=dash"}
          className={`${styleLink} ${
            tab === "dash" ? "bg-neutral-900 text-neutral-50" : ""
          }`}
        >
          <FaThLarge />
          <span>Dashboard</span>
        </Link>

        {/* PRODUCTS */}
        <Link
          href={"/dashboard?tab=products"}
          className={`${styleLink} ${
            tab === "products" ? "bg-neutral-900 text-neutral-50" : ""
          }`}
        >
          <FaClipboardList />
          <span>Products</span>
        </Link>

        {/* CATEGORIES */}
        <Link
          href={"/dashboard?tab=categories"}
          className={`${styleLink} ${
            tab === "categories" ? "bg-neutral-900 text-neutral-50" : ""
          }`}
        >
          <BiSolidCategoryAlt />
          <span>Categories</span>
        </Link>

        {/* ORDERS */}
        <Link
          href={"/dashboard?tab=orders"}
          className={`relative ${styleLink} ${
            tab === "orders" ? "bg-neutral-900 text-neutral-50" : ""
          }`}
        >
          <FaShoppingBag />
          <span>Orders</span>
          {/* <span className="absolute right-3 bg-neutral-50 text-xs px-2 py-0.5 rounded-full">
            3
          </span> */}
        </Link>

        {/* CUSTOMERS */}
        <Link
          href={"/dashboard?tab=customers"}
          className={`${styleLink} ${
            tab === "customers" ? "bg-neutral-900 text-neutral-50" : ""
          }`}
        >
          <FaUsers />
          <span>Customers</span>
        </Link>

        {/* CONVERSATIONS */}
        <Link
          href={"/dashboard?tab=blog"}
          className={`relative ${styleLink} ${
            tab === "blog" ? "bg-neutral-900 text-neutral-50" : ""
          }`}
        >
          <FaComments />
          <span>BLog</span>
          {/* <span className="absolute right-3 bg-orange-300 text-xs px-2 py-0.5 rounded-full">
            16
          </span> */}
        </Link>

        {/* Sign Out */}
        <hr className="w-full mx-auto my-2 md:my-3 border-primary-400" />
        <button
          onClick={signout}
          className="flex items-center w-full gap-4 p-3 text-sm rounded-md bg-error-50 text-error-500"
        >
          <MdOutlineLogout />
          <span>{loading ? <SpinnerMini /> : "Sign Out"}</span>
        </button>
      </nav>
    </div>
  );
}
