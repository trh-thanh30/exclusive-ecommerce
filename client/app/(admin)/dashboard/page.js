"use client";
import CategoriesDash from "@/app/_components/admin_ui/CategoriesDash";
import ConversatiDash from "@/app/_components/admin_ui/ConversatiDash";
import CustomersDash from "@/app/_components/admin_ui/CustomersDash";
import Dash from "@/app/_components/admin_ui/Dash";
import HeaderDash from "@/app/_components/admin_ui/HeaderDash";
import OrdersDash from "@/app/_components/admin_ui/OrdersDash";
import ProductsDash from "@/app/_components/admin_ui/ProductsDash";
import SidebarDashboard from "@/app/_components/admin_ui/SidebarDashboard";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const loaction = useSearchParams();
  const tab = loaction.get("tab");
  return (
    <div className="flex min-h-screen">
      <div className="">
        <SidebarDashboard />
      </div>
      <div className="flex-1">
        <HeaderDash page={tab} />
        {tab === "dash" && <Dash />}
        {tab === "products" && <ProductsDash />}
        {tab === "categories" && <CategoriesDash />}
        {tab === "orders" && <OrdersDash />}
        {tab === "customers" && <CustomersDash />}
        {tab === "conversations" && <ConversatiDash />}
      </div>
    </div>
  );
}
