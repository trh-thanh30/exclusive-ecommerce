"use client";

import ConversatiDash from "@/app/_components/admin_ui/dash/BlogDash";
import CategoriesDash from "@/app/_components/admin_ui/dash/CategoriesDash";
import CustomersDash from "@/app/_components/admin_ui/dash/CustomersDash";
import Dash from "@/app/_components/admin_ui/dash/Dash";
import HeaderDash from "@/app/_components/admin_ui/dash/HeaderDash";
import OrdersDash from "@/app/_components/admin_ui/dash/OrdersDash";
import ProductsDash from "@/app/_components/admin_ui/dash/ProductsDash";
import SidebarDashboard from "@/app/_components/admin_ui/dash/SidebarDashboard";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const loaction = useSearchParams();
  const tab = loaction.get("tab");
  return (
    <div className="flex min-h-screen">
      <SidebarDashboard />

      <div className="flex-1 overflow-hidden bg-primary-50">
        <HeaderDash page={tab} />
        {tab === "dash" && <Dash />}
        {tab === "products" && <ProductsDash />}
        {tab === "categories" && <CategoriesDash />}
        {tab === "orders" && <OrdersDash />}
        {tab === "customers" && <CustomersDash />}
        {tab === "blog" && <ConversatiDash />}
      </div>
    </div>
  );
}
