"use client";
import {
  FaShoppingBag,
  FaUsers,
  FaClipboardList,
  FaComments,
  FaGift,
  FaSignOutAlt,
  FaThLarge,
} from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import Logo from "../Logo";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SidebarDashboard() {
  const styleLink =
    "flex items-center rounded-lg font-medium gap-4 text-neutral-900 text-sm p-3 hover:bg-neutral-900 hover:text-neutral-50 transition-colors";
  const location = useSearchParams();
  const tab = location.get("tab");
  return (
    <div className="flex flex-col w-64 min-h-screen bg-white shadow-md p-7 ">
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
          href={"/dashboard?tab=conversations"}
          className={`relative ${styleLink} ${
            tab === "conversations" ? "bg-neutral-900 text-neutral-50" : ""
          }`}
        >
          <FaComments />
          <span>Conversations</span>
          {/* <span className="absolute right-3 bg-orange-300 text-xs px-2 py-0.5 rounded-full">
            16
          </span> */}
        </Link>
      </nav>
    </div>
  );
}
