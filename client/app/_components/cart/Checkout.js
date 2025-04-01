import React from "react";
import Input from "../Input";

export default function Checkout() {
  return (
    <div className="md:mt-20 mt-10 md:gap-8 gap-6 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
      {/* LEFT */}
      <div className="flex flex-col gap-6">
        {/* Contact information */}
        <div className="px-10 py-6 border rounded-md border-primary-400">
          <h2 className="text-xl font-medium">Contact Information</h2>
          <div className="flex gap-3 mt-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Full Name
              </label>
              <Input className={"!text-xs "} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                lAST Name
              </label>
              <Input className={"!text-xs "} />
            </div>
          </div>
          <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <Input fullWidth={true} className={"!text-xs "} />
          <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
            Email address
          </label>
          <Input fullWidth={true} className={"!text-xs "} />
        </div>
        {/*  Shipping Address */}
        <div className="px-10 py-6 border rounded-md border-primary-400">
          <h2 className="text-xl font-medium">Contact Information</h2>
          <div className="flex gap-3 mt-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Full Name
              </label>
              <Input className={"!text-xs "} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                lAST Name
              </label>
              <Input className={"!text-xs "} />
            </div>
          </div>
          <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <Input fullWidth={true} className={"!text-xs "} />
          <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
            Email address
          </label>
          <Input fullWidth={true} className={"!text-xs "} />
        </div>
        {/*  Payment method */}
        <div className="px-10 py-6 border rounded-md border-primary-400">
          <h2 className="text-xl font-medium">Contact Information</h2>
          <div className="flex gap-3 mt-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Full Name
              </label>
              <Input className={"!text-xs "} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                lAST Name
              </label>
              <Input className={"!text-xs "} />
            </div>
          </div>
          <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <Input fullWidth={true} className={"!text-xs "} />
          <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
            Email address
          </label>
          <Input fullWidth={true} className={"!text-xs "} />
        </div>
        <button className="w-full py-3 text-base rounded-md bg-primary-900 text-primary-50">
          Place Order
        </button>
      </div>
      {/* RIGHT */}
      <div className="px-6 py-4 border rounded-md border-primary-400">
        <h2 className="text-2xl font-medium">Order summary</h2>
      </div>
    </div>
  );
}
