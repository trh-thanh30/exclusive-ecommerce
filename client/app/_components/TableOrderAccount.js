import React, { useEffect, useState } from "react";
import { ORDER_ENDPOINT } from "../constants/api";
import { truncateText } from "../constants/truncateText";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { format } from "date-fns";

import truckIcon from "../IconSvg/truck.svg";
import SpinnerDoot from "./SpinnerDoot";
import Image from "next/image";
import { CiDeliveryTruck } from "react-icons/ci";
import toast from "react-hot-toast";
import OrderProgress from "./OrderProgress";

export default function TableOrderAccount() {
  const dateRandom = Math.floor(Math.random() * 10) + 1; // gen random date 1 to 10
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [orderDetails, setOderDetails] = useState();
  const handleFetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${ORDER_ENDPOINT}/`, {
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
      setOrders(data.orders);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleFetchOrders();
  }, []);
  const handleFetchOrderDetails = async (orderId) => {
    try {
      const res = await fetch(`${ORDER_ENDPOINT}/${orderId}`, {
        credentials: "include",
        method: "GET",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Have error");
        return;
      }
      setOderDetails(data.orderDetails);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await fetch(`${ORDER_ENDPOINT}/cancel`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      if (!res.ok) {
        console.log("Have error");
      }
      const data = await res.json();
      toast.success(data.message);
      setOpenModal(false);
      handleFetchOrders();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div>
        <h2 className="mb-4 text-xl font-medium">Orders History</h2>

        {/* Table for PC */}
        {loading ? (
          <SpinnerDoot />
        ) : (
          <>
            <div className="hidden mt-10 md:block">
              <table className="w-full">
                <thead className="">
                  <tr className="text-sm font-normal text-left text-primary-500">
                    <th className="pb-2 border-b border-b-primary-200">
                      Number ID
                    </th>
                    <th className="pb-2 border-b border-b-primary-200">
                      Description
                    </th>
                    <th className="pb-2 border-b border-b-primary-200">
                      Payment Method
                    </th>
                    <th className="pb-2 border-b border-b-primary-200">
                      Status
                    </th>
                    <th className="pb-2 border-b border-b-primary-200">
                      Price
                    </th>
                    <th className="pb-2 border-b border-b-primary-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="text-xs border-b hover:bg-gray-50">
                      <td className="py-4 font-medium text-primary-900">
                        #{truncateText(order._id, 10)}
                      </td>
                      <td className="py-4 font-medium">
                        {order.products.map((product, idx) => (
                          <div key={idx}>
                            {product.product.title} - Qty: {product.count}
                          </div>
                        ))}
                      </td>
                      <td className="py-4">{order.paymentMethod}</td>
                      <td
                        className={`py-4 font-medium ${
                          order.orderStatus === "Cancelled"
                            ? "text-error-500 "
                            : "text-blue-400"
                        }`}>
                        {order.orderStatus}
                      </td>
                      <td className="py-4 text-green-400">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td
                        onClick={() => {
                          handleFetchOrderDetails(order._id);
                          setOpenModal(true);
                        }}
                        className="py-4 text-primary-400 hover:text-primary-900 hover:underline hover:cursor-pointer">
                        View Order
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Card Layout for Mobile */}
            <div className="flex flex-col gap-3 mt-7 md:hidden">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="p-4 text-sm transition-colors bg-white rounded-md shadow-sm shadow-primary-300 hover:opacity-85">
                  <p className="font-medium">
                    Number ID:{" "}
                    <span className="text-xs text-primary-500">
                      #{order._id}
                    </span>
                  </p>
                  <p className="flex flex-wrap items-center gap-1 font-medium">
                    Description:
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className={`text-xs ${
                          order.products.length > 1 &&
                          (index === 0 || index === order.products.length - 2)
                            ? "border-r border-r-primary-400 pr-2"
                            : ""
                        }`}>
                        {product.product.title} - Qty: {product.count}
                      </div>
                    ))}
                  </p>
                  <p className="font-medium">
                    Payment Method:{" "}
                    <span className="text-xs text-primary-500">
                      {order.paymentMethod}
                    </span>
                  </p>
                  <p className="font-medium">
                    Status:{" "}
                    <span
                      className={`text-xs ${
                        order.orderStatus === "Cancelled"
                          ? "text-error-500"
                          : "text-blue-400"
                      }`}>
                      {order.orderStatus}
                    </span>
                  </p>
                  <p className="font-medium">
                    Price:{" "}
                    <span className="text-xs text-success-400">
                      ${order.totalAmount}
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      handleFetchOrderDetails(order._id);
                      setOpenModal(true);
                    }}
                    className="py-2 mt-1 text-sm font-medium text-blue-500">
                    View Order
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <AnimatePresence>
        {openModal && orderDetails && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
              className="relative w-full max-w-xl max-h-screen p-3 overflow-y-scroll bg-white rounded-md shadow-lg sm:p-6 md:max-w-2xl"
              initial={{ y: "-30px", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-30px", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <button
                className="absolute text-gray-500 right-3 top-3 hover:text-black"
                onClick={() => setOpenModal(false)}>
                <AiOutlineClose size={18} />
              </button>
              <div className="mt-10">
                <div className="flex flex-col items-center justify-between sm:flex-row">
                  <h3 className="text-base font-medium sm:text-xl text-primary-900">
                    OrderId: #{orderDetails._id}
                  </h3>
                  <span className="text-xs text-primary-500">
                    Order: {orderDetails.products.length}
                  </span>
                </div>
                <div className="flex flex-col items-center mt-2 sm:flex-row">
                  <div className="pr-3 text-xs border-r border-r-primary-400 w-fit">
                    <span className="text-primary-500">Order date: </span>
                    <span className="font-medium text-primary-900">
                      {format(orderDetails.createdAt, "MMM dd, yyyy")}
                    </span>
                  </div>
                  {orderDetails.orderStatus === "Cancelled" ? <span className="pl-3 text-xs text-error-500">
                    Order has been canceled
                  </span> : (
                    <div className="flex items-center gap-1 pl-3 text-xs text-success-400">
                      <CiDeliveryTruck size={20} />
                      <span>
                        Estimated delivery:{" "}
                        {format(
                          new Date(
                            new Date(orderDetails.createdAt).getTime() +
                              dateRandom * 24 * 60 * 60 * 1000
                          ),
                          "MMM dd, yyyy"
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <hr className="border border-primary-200 my-7" />
                {orderDetails.orderStatus === "Cancelled" ? null : (
                  <OrderProgress
                    orderDetails={orderDetails}
                    random={dateRandom}
                  />
                )}
                <div className="mt-7">
                  {orderDetails.products.map((product) => (
                    <div className="flex items-center justify-between mt-7">
                      <div className="flex items-center gap-2 sm:gap-6">
                        <Image
                          src={product.product.images[0]}
                          width={200}
                          height={200}
                          loading="lazy"
                          alt={product.product.title}
                          className="w-24 h-24 rounded-sm"
                        />
                        <div className="flex flex-col gap-3">
                          <span className="text-xs font-medium sm:text-lg text-primary-900">
                            {product.product.title}
                          </span>
                          <div className="flex flex-col sm:flex-row">
                            <span className="pr-0 text-xs border-r-0 sm:pr-2 sm:border-r text-primary-500 border-r-primary-400">
                              Quantity: {product.count}
                            </span>
                            <span className="pr-0 text-xs sm:pl-2 text-primary-500">
                              Color: {product.color}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium sm:text-sm text-primary-900">
                          ${product.product.price.toFixed(2)}/each
                        </span>
                        <span className="text-xs text-primary-400">
                          Oty: {product.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="border border-primary-200 my-7" />
                <div className="flex justify-between">
                  <div className="font-medium">
                    <h5 className="text-sm sm:text-base text-primary-900">
                      Payment
                    </h5>
                    <span className="text-xs sm:text-sm text-primary-500">
                      {orderDetails.paymentMethod}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 font-medium">
                    <h5 className="text-sm sm:text-base text-primary-900">
                      Delivery
                    </h5>
                    <span className="text-xs text-primary-400">Address</span>
                    <span className="text-xs md:text-sm text-primary-800">
                      {orderDetails.shippingAddress.province}
                    </span>
                    <span className="text-xs md:text-sm text-primary-800">
                      {orderDetails.shippingAddress.district}
                    </span>
                    <span className="text-xs md:text-sm text-primary-800">
                      {orderDetails.shippingAddress.commune}
                    </span>
                    <span className="text-xs md:text-sm text-primary-800">
                      {orderDetails.shippingAddress.detailAddress}
                    </span>
                  </div>
                </div>
                <hr className="border border-primary-200 my-7" />
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h5 className="text-sm font-medium sm:text-base text-primary-900">
                    Order Summary
                  </h5>

                  <span className="text-xs sm:text-sm text-primary-400">
                    Subtotal:{" "}
                  </span>
                  <span className="text-sm font-medium text-primary-900">
                    ${orderDetails.totalAmount.toFixed(2)}
                  </span>

                  <span className="text-xs md:text-sm text-primary-400">
                    Delivery:{" "}
                  </span>
                  <span className="text-sm font-medium text-primary-900">
                    $0.00
                  </span>

                  <span className="text-xs md:text-sm text-primary-400">
                    Total:{" "}
                  </span>
                  <span className="text-sm font-medium text-primary-900">
                    ${orderDetails.totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end w-full mb-4">
                  {orderDetails.orderStatus === "Cash On Delivery" ? (
                    <button
                      onClick={() => handleCancelOrder(orderDetails._id)}
                      className="px-10 py-4 text-xs rounded-full md:text-sm bg-primary-900 text-primary-50 hover:opacity-90">
                      Canceled Order
                    </button>
                  ) : null}
                  {orderDetails.orderStatus === "Cancelled" && (
                    <span className="text-xs font-medium md:text-sm text-error-400">
                      Order has been canceled
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
