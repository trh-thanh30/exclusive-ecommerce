import React from "react";
const orders = [
  {
    id: "#3456_768",
    date: "October 17, 2023",
    status: "Delivered",
    price: "$1234.00",
  },
  {
    id: "#3456_980",
    date: "October 11, 2023",
    status: "Delivered",
    price: "$345.00",
  },
  {
    id: "#3456_120",
    date: "August 24, 2023",
    status: "Delivered",
    price: "$2345.00",
  },
  {
    id: "#3456_030",
    date: "August 12, 2023",
    status: "Delivered",
    price: "$845.00",
  },
];
export default function TableOrderAccount({ callbackFunc }) {
  const handleClick = (orderId) => {
    callbackFunc(orderId);
  };
  return (
    <div>
      <h2 className="mb-4 text-xl font-medium">Orders History</h2>

      {/* Table for PC */}
      <div className="hidden mt-10 md:block">
        <table className="w-full">
          <thead className="">
            <tr className="text-sm font-normal text-left text-primary-500">
              <th className="pb-2 border-b border-b-primary-200">Number ID</th>
              <th className="pb-2 border-b border-b-primary-200">Dates</th>
              <th className="pb-2 border-b border-b-primary-200">Status</th>
              <th className="pb-2 border-b border-b-primary-200">Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="text-sm border-b hover:bg-gray-50">
                <td onClick={() => handleClick(order.id)} className="py-4">
                  {order.id}
                </td>
                <td className="py-4">{order.date}</td>
                <td className="py-4">{order.status}</td>
                <td className="py-4">{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile */}
      <div className="flex flex-col gap-3 mt-7 md:hidden">
        {orders.map((order, index) => (
          <div key={index} className="p-4 bg-white rounded-md shadow-sm">
            <p className="font-medium">
              Number ID:{" "}
              <span className="text-sm text-primary-500">{order.id}</span>
            </p>
            <p className="font-medium">
              Dates:{" "}
              <span className="text-sm text-primary-500">{order.date}</span>
            </p>
            <p className="font-medium">
              Status:{" "}
              <span className="text-sm text-primary-500">{order.status}</span>
            </p>
            <p className="font-medium">
              Price:{" "}
              <span className="text-sm text-primary-500">{order.price}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
