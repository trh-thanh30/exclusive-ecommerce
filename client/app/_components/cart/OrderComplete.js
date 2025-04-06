import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ORDER_ENDPOINT } from "@/app/constants/api";
import { format } from "date-fns";
import Image from "next/image";
export default function OrderComplete({ orderId }) {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(order.products);
  const handleFetchOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ORDER_ENDPOINT}/${orderId}`, {
        credentials: "include",
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        console.log("Have error");
        return;
      }
      setLoading(false);
      setOrder(data.orderDetails);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleFetchOrderDetail();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col p-4 mt-10 bg-white shadow-sm md:mt-20 md:items-center md:justify-center md:p-10">
      <span className="text-base font-medium md:text-2xl text-primary-400">
        Thank you! 🎉
      </span>
      <h1 className="mt-3 text-3xl font-medium md:mt-4 md:text-4xl text-primary-900">
        Your order has been received
      </h1>
      {order && order.products && (
        <div className="flex flex-wrap items-center gap-2 mt-5 md:gap-4 md:mt-10">
          {order?.products?.map((product) => (
            <div className="relative">
              <Image
                width={500}
                height={500}
                key={product.product._id}
                src={product.product?.images[0]}
                className="w-20 h-24 md:w-32 md:h-36"
                alt={product.product.title}
              />
              <span className="absolute px-2 py-1 text-xs rounded-full -right-1 -top-2 text-primary-50 bg-primary-900">
                {product.count}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-5 mt-8 text-xs font-medium text-nowrap md:text-sm md:mt-10">
        <div className="flex gap-4">
          <span className="text-primary-500">Order code:</span>
          <span className="ml-auto text-primary-900">#{order?._id}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-primary-500">Date:</span>
          {order && order.createdAt && (
            <span className="ml-auto text-primary-900">
              {format(order?.createdAt, "MM/dd/yyyy")}
            </span>
          )}
        </div>
        <div className="flex gap-4">
          <span className="text-primary-500">Total:</span>
          {order && order.totalAmount && (
            <span className="ml-auto text-primary-900">
              ${order?.totalAmount.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex gap-4">
          <span className="text-primary-500">Payment method:</span>
          <span className="ml-auto text-primary-900">
            {order?.paymentMethod}
          </span>
        </div>
      </div>
      <Link
        href={"/account?manage=orders"}
        className="py-3 text-sm text-center rounded-full mt-7 md:mt-10 px-14 text-primary-50 bg-primary-900 hover:opacity-90">
        Purchase history
      </Link>
    </div>
  );
}
