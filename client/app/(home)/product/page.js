import Breadcrumb from "@/app/_components/Breadcrumb";
import React from "react";

export default function page() {
  const breadcrumb = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Product",
      href: "/product",
    },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumb} />
    </>
  );
}
