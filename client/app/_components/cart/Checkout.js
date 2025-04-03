import React from "react";
import Input from "../Input";

export default function Checkout() {
  return (
    <div className="md:mt-20 mt-10 md:gap-8 gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr]">
      {/* LEFT */}
      <div className="flex flex-col gap-6">
        {/* Contact information */}
        <div className="px-3 py-5 border rounded-md md:px-10 md:py-6 border-primary-400">
          <h2 className="text-xl font-medium">Contact Information</h2>
          <div className="flex flex-col gap-3 mt-6 xl:flex-row">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                First Name
              </label>
              <Input
                fullWidth={true}
                className={"!text-xs !w-[340px]"}
                placeholder={"First Name"}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Last Name
              </label>
              <Input
                fullWidth={true}
                className={"!text-xs  !w-[340px]"}
                placeholder={"Last Name"}
              />
            </div>
          </div>
          <label className="block mt-4 mb-1 text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <Input
            fullWidth={true}
            className={"!text-xs "}
            placeholder={"Phone number"}
          />
          <label className="block mt-4 mb-1 text-sm font-medium text-gray-600">
            Email address
          </label>
          <Input
            fullWidth={true}
            className={"!text-xs "}
            placeholder={"Your Email"}
          />
        </div>
        {/*  Shipping Address */}
        <div className="px-3 py-5 border rounded-md md:px-10 md:py-6 border-primary-400">
          <h2 className="text-xl font-medium">Shipping Address</h2>

          <div className="flex gap-3">
            <div className="w-full">
              <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
                Region *
              </label>
              <select
                className="w-full px-3 py-2 text-xs border rounded-md outline-none text-primary-900 border-primary-200"
                name="country"
              >
                <option value="title">----Region----</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block mt-6 mb-2 text-sm font-medium text-gray-600">
                District *
              </label>
              <select
                className="w-full px-3 py-2 text-xs border rounded-md outline-none text-primary-900 border-primary-200"
                name="district"
              >
                <option value="title">----District----</option>
              </select>
            </div>
          </div>
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-600">
            Street Address *
          </label>
          <select
            className="w-full px-3 py-2 text-xs border rounded-md outline-none text-primary-900 border-primary-200"
            name="street"
          >
            <option value="title">----Street Address----</option>
          </select>

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-600">
            Full address
          </label>
          <Input
            fullWidth={true}
            isTextArea={true}
            placeholder={"Please provide your full address for delivery"}
            className={"!text-xs "}
          />
        </div>

        {/*  Payment method */}
        <div className="px-3 py-5 border rounded-md md:px-10 md:py-6 border-primary-400">
          <h2 className="text-xl font-medium">Payment method</h2>
          <label className="flex items-center justify-between p-3 mt-6 text-xs border rounded-lg cursor-pointer md:text-sm border-primary-200">
            <div className="flex items-center gap-2">
              <input type="radio" name="shipping" />
              <span>Cash on Delivery (COD)</span>
            </div>
          </label>

          <label className="flex items-center justify-between p-3 mt-4 text-xs border rounded-lg cursor-pointer md:text-sm border-primary-200">
            <div className="flex items-center gap-2">
              <input type="radio" name="shipping" />
              <span>Pay by MomoPay</span>
            </div>
          </label>
        </div>
        <button className="hidden w-full py-3 text-base rounded-md bg-primary-900 text-primary-50 md:block">
          Place Order
        </button>
      </div>

      {/* RIGHT */}
      <div className="px-3 py-4 border rounded-md md:px-6 border-primary-400 h-fit">
        <h2 className="mb-6 text-2xl font-medium">Order summary</h2>
        <div className="flex flex-col gap-2 overflow-y-scroll max-h-[300px] md:max-h-[480px]">
          <div className="flex justify-between pb-3 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <img
                src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
                alt=""
                className="w-20 h-20"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-primary-900">
                  Tray Table
                </h4>
                <p className="text-xs text-gray-600">Color: Red</p>
                <span className="text-xs text-primary-800">Quantity: 2</span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-primary-900">$500</h4>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <img
                src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
                alt=""
                className="w-20 h-20"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-primary-900">
                  Tray Table
                </h4>
                <p className="text-xs text-gray-600">Color: Red</p>
                <span className="text-xs text-primary-800">Quantity: 2</span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-primary-900">$500</h4>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <img
                src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
                alt=""
                className="w-20 h-20"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-primary-900">
                  Tray Table
                </h4>
                <p className="text-xs text-gray-600">Color: Red</p>
                <span className="text-xs text-primary-800">Quantity: 2</span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-primary-900">$500</h4>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <img
                src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
                alt=""
                className="w-20 h-20"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-primary-900">
                  Tray Table
                </h4>
                <p className="text-xs text-gray-600">Color: Red</p>
                <span className="text-xs text-primary-800">Quantity: 2</span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-primary-900">$500</h4>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <img
                src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
                alt=""
                className="w-20 h-20"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-primary-900">
                  Tray Table
                </h4>
                <p className="text-xs text-gray-600">Color: Red</p>
                <span className="text-xs text-primary-800">Quantity: 2</span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-primary-900">$500</h4>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <img
                src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
                alt=""
                className="w-20 h-20"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-primary-900">
                  Tray Table
                </h4>
                <p className="text-xs text-gray-600">Color: Red</p>
                <span className="text-xs text-primary-800">Quantity: 2</span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-primary-900">$500</h4>
          </div>
          <div className="flex justify-between pb-3 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <img
                src="https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png"
                alt=""
                className="w-20 h-20"
              />
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-primary-900">
                  Tray Table
                </h4>
                <p className="text-xs text-gray-600">Color: Red</p>
                <span className="text-xs text-primary-800">Quantity: 2</span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-primary-900">$500</h4>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center w-full gap-2 mb-4">
            <input
              placeholder="🎁 Coupon Code"
              type="text"
              className="w-full py-2 pl-3 pr-6 text-sm border rounded-md outline-none placeholder:text-sm placeholder:text-primary-400 text-primary-700 border-primary-400 focus:bg-primary-100"
            />
            <button className="p-2 text-sm rounded-md text-primary-50 bg-primary-900">
              Apply
            </button>
          </div>
          <div className="flex items-center justify-between py-2 text-sm border-y border-y-primary-300">
            <span className="text-primary-600">Shipping</span>
            <span className="font-medium text-primary-900">Free</span>
          </div>
          <div className="flex items-center justify-between py-2 text-sm border-b border-b-primary-300">
            <span className="text-primary-500">Subtotal</span>
            <span className="font-medium text-primary-900">$99.00</span>
          </div>
          <div className="flex items-center justify-between mt-2 font-medium text-primary-900">
            <span>Total</span>
            <h2 className="">$99.00</h2>
          </div>
        </div>
      </div>
      <button className="block w-full py-3 text-sm rounded-md md:hidden bg-primary-900 text-primary-50">
        Place Order
      </button>
    </div>
  );
}
