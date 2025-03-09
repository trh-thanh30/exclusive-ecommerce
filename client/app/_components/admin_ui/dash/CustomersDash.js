import { CUSTOMERS_ENDPOINT } from "@/app/constants/api";
import { sizeIconSecondary } from "@/app/constants/icons";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import TableCustomerUi from "../table/TableCustomerUi";
import useFetchCustomer from "@/app/hooks/useFetchCustomer";
const tableHeader = [
  {
    name: "avatar",
  },
  {
    name: "username",
  },
  {
    name: "email",
  },
  {
    name: "role name",
  },
  {
    name: "is blocked",
  },
  {
    name: "is active",
  },
  {
    name: "created at",
  },
  {
    name: "action",
  }
];
export default function CustomersDash() {
  const {loading, customer, pagination} = useFetchCustomer();
  return (
    <div className="p-6">
      <div className="flex items-center justify-between text-primary-800">
        <h1 className="text-base font-medium">Customer Summary</h1>
        <div className="flex items-center gap-1 text-sm ">
          <FaUsers size={sizeIconSecondary} />
          <span>
            All Customers:
            {customer?.length}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full min-h-screen mt-6 bg-white rounded-lg shadow-md bg-clip-border">
        <TableCustomerUi
          loading={loading}
          data={customer}
          tableHeader={tableHeader}
          paginations={pagination}
        />
      </div>
    </div>
  );
}
