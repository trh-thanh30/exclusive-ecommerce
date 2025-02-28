import React from "react";
import Breadcrumb from "../../_components/Breadcrumb";
export const metadata = {
  title: "Blog",
  description: "To read and inform about us",
};
const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/blog",
  },
];
export default function Page() {
  return (
    <>
      <Breadcrumb items={breadcrumb} />
    </>
  );
}
