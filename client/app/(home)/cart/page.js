import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
const cartItems = [
  {
    id: 1,
    name: "Tray Table",
    color: "Black",
    price: 19.0,
    quantity: 2,
    image:
      "https://trh-thanh30.github.io/demo-category/assets/img/product/product-1.png", // Thay bằng ảnh thật
  },
  {
    id: 2,
    name: "Tray Table",
    color: "Red",
    price: 19.0,
    quantity: 2,
    image:
      "https://trh-thanh30.github.io/demo-category/assets/img/product/product-2.png",
  },
  {
    id: 3,
    name: "Table lamp",
    color: "Gold",
    price: 39.0,
    quantity: 1,
    image:
      "https://trh-thanh30.github.io/demo-category/assets/img/product/product-3.png",
  },
];
export default function Page() {
  
  return (
    <>
      {/* Header */}
      <h1 className="mt-1 text-3xl font-medium text-center md:mt-3 md:text-4xl text-primary-900">
        Cart
      </h1>
      <div className="flex items-center justify-center gap-3 mt-6 sm:gap-10 md:gap-28 md:mt-11 text-nowrap">
        {/* 1 */}
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
          <span className="flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm bg-primary-900 text-primary-50 ">
            1
          </span>
          <span className="text-xs font-medium md:text-base text-primary-900">
            Shopping cart
          </span>
        </div>
        {/* 2 */}
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
          <span className="flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm bg-primary-900 text-primary-50 ">
            2
          </span>
          <span className="text-xs font-medium md:text-base text-primary-900">
            Checkout details
          </span>
        </div>
        {/* 3 */}
        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
          <span className="flex items-center justify-center w-8 h-8 text-xs rounded-full md:text-sm bg-primary-900 text-primary-50">
            3
          </span>
          <span className="text-xs font-medium md:text-base text-primary-900">
            Order complete
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="md:mt-20 mt-10 md:gap-8 gap-6 grid grid-cols-1 md:grid-cols-[1.2fr_0.6fr]">
        {/* Table left */}
        <table>
          <thead className="text-base text-primary-900">
            <tr className="text-left border-b border-b-gray-400">
              <th className="font-medium">Product</th>
              <th className="hidden font-medium sm:table-cell">Quantity</th>
              <th className="font-medium">Price</th>
              <th className="font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-300 ">
                {/* Products Line */}
                <td className="flex items-center gap-1 py-2 sm:gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                  <div className="flex flex-col gap-2 text-sm sm:gap-1">
                    <h2 className="font-medium text-primary-900">
                      {item.name}
                    </h2>
                    <p className="text-xs text-gray-400">Color: {item.color}</p>
                    <button className="flex items-center gap-1 text-sm transition-colors text-primary-500 hover:text-error-500">
                      <HiOutlineTrash /> Remove
                    </button>
                    <div className="flex items-center justify-between w-20 p-1 text-sm border rounded-md sm:p-2 sm:w-24 text-primary-900 border-primary-400 sm:hidden">
                      <FiPlus className="w-4 h-4 transition-colors rounded-full hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50" />
                      <span className="">{item.quantity}</span>
                      <FiMinus className="w-4 h-4 transition-colors rounded-full hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50" />
                    </div>
                  </div>
                </td>
                {/* Quantity Line */}
                <td className="hidden sm:table-cell">
                  <div className="flex items-center justify-between w-24 p-2 text-sm border rounded-md text-primary-900 border-primary-400">
                    <FiPlus className="w-4 h-4 transition-colors rounded-full hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50" />
                    <span className="">{item.quantity}</span>
                    <FiMinus className="w-4 h-4 transition-colors rounded-full hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50" />
                  </div>
                </td>
                {/* Price Line */}
                <td className="text-sm text-primary-900">
                  ${item.price.toFixed(2)}
                </td>
                {/* Subtotal Line */}
                <td className="text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Table right */}
        <section className="p-6 border rounded-md border-primary-400">
          <h1 className="font-medium text-balance">Cart summary</h1>
          <div className="flex flex-col gap-3 mt-4">
            {/* Free Shipping */}
            <label className="flex items-center justify-between p-3 text-xs border rounded-lg cursor-pointer md:text-sm border-primary-200">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  // checked={shipping === 0}
                  // onChange={() => setShipping(0)}
                />
                <span>Free shipping</span>
              </div>
              <span className="font-medium">$0.00</span>
            </label>

            {/* Experss Sipping */}
            <label className="flex items-center justify-between p-3 text-xs border rounded-lg cursor-pointer md:text-sm border-primary-200">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  // checked={shipping === 0}
                  // onChange={() => setShipping(0)}
                />
                <span>Express shipping</span>
              </div>
              <span className="font-medium">+$15.00</span>
            </label>

            <div className="flex items-center justify-between pb-2 mt-3 font-medium border-b text-primary-900 border-b-primary-300">
              <h3 className="text-base">Subtotal</h3>
              <span className="text-sm">$00.00</span>
            </div>
            <div className="flex items-center justify-between font-medium text-primary-900">
              <h2 className="text-base">Total</h2>
              <span className="text-sm">$1345.00</span>
            </div>
          </div>
          <button className="w-full px-6 py-2 mt-4 text-sm transition-colors border rounded-full border-primary-900 hover:bg-primary-900 hover:text-primary-50">
            Checkout
          </button>
        </section>
      </div>

      {/* Coupon Input */}
      <h5 className="mt-10 text-xl font-medium md:mt-20">Have a coupon?</h5>
      <p className="mt-2 text-xs text-primary-400">
        Add your code for an instant cart discount
      </p>
      <div className="flex items-center gap-2 mt-4">
        <input
          placeholder="🎁 Coupon Code"
          type="text"
          className="py-2 pl-3 pr-6 text-sm border rounded-md outline-none placeholder:text-sm placeholder:text-primary-400 text-primary-700 border-primary-400 focus:bg-primary-100"
        />
        <button className="p-2 text-sm rounded-md text-primary-50 bg-primary-900">
          Apply
        </button>
      </div>
    </>
  );
}
