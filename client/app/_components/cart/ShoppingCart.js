import Image from "next/image";
import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
export default function ShoppingCart({
  carts,
  handleRemoveItem,
  handleChangeQuantity,
  totalPriceCarts,
}) {
  return (
    <>
      <div className="md:mt-20 mt-10 md:gap-8 gap-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.2fr_0.6fr]">
        {/* Table left */}
        <table className="h-fit">
          <thead className="text-base text-primary-900">
            <tr className="text-left border-b border-b-gray-400">
              <th className="font-medium">Product</th>
              <th className="hidden font-medium sm:table-cell">Quantity</th>
              <th className="font-medium">Price</th>
              <th className="font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-300">
                {/* Products Line */}
                <td className="flex items-center gap-3 py-2 sm:gap-2">
                  <Image
                    width={500}
                    height={500}
                    loading="lazy"
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                  <div className="flex flex-col gap-2 text-xs md:text-sm sm:gap-1">
                    <h2 className="font-medium text-primary-900 ">
                      {item.product.title}
                    </h2>
                    <p className="text-xs text-gray-400">Color: {item.color}</p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="flex items-center gap-1 text-sm transition-colors text-primary-600 hover:text-error-500"
                    >
                      <HiOutlineTrash />
                      Remove
                    </button>
                    <div className="flex items-center justify-between w-20 p-2 text-sm border rounded-md sm:p-2 sm:w-24 text-primary-900 border-primary-400 sm:hidden">
                      <button
                        disabled={item.quantity === 1}
                        onClick={() =>
                          handleChangeQuantity(index, "decrement", item._id)
                        }
                        className="flex items-center justify-center w-4 h-4 transition-colors rounded-full hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50 disabled:cursor-not-allowed hover:disabled:bg-primary-200"
                      >
                        <FiMinus size={20} />
                      </button>

                      <span className="text-xs">{item.quantity}</span>
                      <button
                        disabled={item.quantity === item.product.quantity}
                        onClick={() =>
                          handleChangeQuantity(index, "increment", item._id)
                        }
                        className="flex items-center justify-center w-4 h-4 transition-colors rounded-full hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50 disabled:cursor-not-allowed hover:disabled:bg-primary-200"
                      >
                        <FiPlus size={20} />
                      </button>
                    </div>
                  </div>
                </td>
                {/* Quantity Line */}
                <td className="hidden sm:table-cell">
                  <div className="flex items-center justify-between w-24 px-2 py-3 text-sm border rounded-md text-primary-900 border-primary-400">
                    <button
                      disabled={item.quantity === 1}
                      onClick={() =>
                        handleChangeQuantity(index, "decrement", item._id)
                      }
                      className="flex items-center justify-center w-4 h-4 transition-colors rounded-full hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50 disabled:cursor-not-allowed hover:disabled:bg-primary-200"
                    >
                      <FiMinus size={20} />
                    </button>

                    <span className="text-xs">{item.quantity}</span>
                    <button
                      disabled={item.quantity === item.product.quantity}
                      onClick={() =>
                        handleChangeQuantity(index, "increment", item._id)
                      }
                      className="flex items-center justify-center w-4 h-4 transition-colors rounded-full hover:cursor-pointer hover:bg-primary-900 hover:text-primary-50 disabled:cursor-not-allowed hover:disabled:bg-primary-200"
                    >
                      <FiPlus size={20} />
                    </button>
                  </div>
                </td>
                {/* Price Line */}
                <td className="text-xs md:text-sm text-primary-900 ">
                  ${item.price.toFixed(2)}
                </td>
                {/* Subtotal Line */}
                <td className="text-xs font-semibold md:text-sm">
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
                <input type="radio" name="shipping" />
                <span>Free shipping</span>
              </div>
              <span className="font-medium">$0.00</span>
            </label>

            {/* Experss Sipping */}
            <label
              className={`flex items-center justify-between p-3 text-xs border rounded-lg cursor-pointer md:text-sm border-primary-200
              ${true ? "bg-gray-200 opacity-50 pointer-events-none" : ""} `}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  disabled
                  className="disabled:opacity-90 disabled:cursor-not-allowed"
                />
                <span className="disabled:text-primary-400">
                  Express shipping
                </span>
              </div>
              <span className="font-medium">+$15.00</span>
            </label>

            <div className="flex items-center justify-between pb-2 mt-3 font-medium border-b text-primary-900 border-b-primary-300">
              <h3 className="text-base">Subtotal</h3>
              <span className="text-sm">${totalPriceCarts.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between font-medium text-primary-900">
              <h2 className="text-base">Total</h2>
              <span className="text-sm">${totalPriceCarts.toFixed(2)}</span>
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
