import { format } from "date-fns";
import React from "react";

export default function OrderProgress({ orderDetails, dateRandom }) {
  const steps = [
    {
      title: "Order Confirmed",
      date: format(new Date(orderDetails.createdAt), "MMM dd, yyyy"),
      status: "completed",
    },
    {
      title: "Cash On Delivery",
      date: format(new Date(orderDetails.createdAt), "MMM dd, yyyy"),
      status: "completed",
    },
    {
      title: "Delivered",
      date: "Not yet",
      status: "upcoming",
    },
    {
      title: "Completed",
      date: "Not yet",
      status: "upcoming",
    },
  ];

  return (
    <div className="w-full ">
      {/* Desktop View */}
      <div className="items-center justify-between hidden max-w-5xl mx-auto sm:flex">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center flex-1">
              {/* Line */}
              {!isLast && (
                <div className="absolute top-2 left-1/2 w-full h-0.5 bg-gray-300 -z-0">
                  <div
                    className={`h-full ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    } absolute left-0 w-full`}></div>
                </div>
              )}

              {/* Dot */}
              <div
                className={`w-4 h-4 rounded-full z-10 ${
                  isCompleted ? "bg-green-500" : "bg-gray-300"
                }`}></div>

              {/* Title */}
              <p
                className={`mt-2 text-sm font-medium text-center ${
                  isCompleted ? "text-green-600" : "text-gray-400"
                }`}>
                {step.title}
              </p>

              {/* Date */}
              <p className="text-xs text-gray-400">{step.date}</p>
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="flex flex-col max-w-md gap-2 mx-auto sm:hidden">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          return (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  isCompleted ? "bg-green-500" : "bg-gray-300"
                }`}></div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    isCompleted ? "text-green-600" : "text-gray-400"
                  }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
