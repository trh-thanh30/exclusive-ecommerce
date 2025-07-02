import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ADDRESS_ENDPOINT, ORDER_ENDPOINT } from "@/app/constants/api";

import Input from "../Input";
import Image from "next/image";
import toast from "react-hot-toast";
import SpinnerMini from "../SpinnerMini";
import AddressSelect from "../AddressSelect";
import iconShipCod from "../../../public/icship-cod.png";
import iconMomo from "../../../public/icmomo.png";
export default function Checkout({ carts, totalPriceCarts }) {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [addressDefault, setAddressDefault] = useState([]);
  const [formData, setFormData] = useState({
    userInformation: {
      lastName: user?.user?.lastname,
      firstName: user?.user?.firstname,
      email: user?.user?.email,
      phoneNumber: "",
    },
    shippingAddress: {
      province: addressDefault?.province,
      district: addressDefault?.district,
      commune: addressDefault?.commune,
      detailAddress: addressDefault?.detailAddress,
    },
    paymentMethod: "",
  });
  const [errorForm, setErrorForm] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const handleChangeUser = (e) => {
    setFormData({
      ...formData,
      userInformation: {
        ...formData.userInformation,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleChangePayment = (e) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };
  const handleOrder = async (e) => {
    e.preventDefault();
    setLoadingOrder(true);
    try {
      const res = await fetch(ORDER_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setErrorForm(data);
        setLoadingOrder(false);
        return;
      }
      toast.success(data.message);
      setLoadingOrder(false);
      router.push(`/cart?cart=order-complete/${data.order._id}`);
    } catch (error) {
      setLoadingOrder(false);
      console.log(error.message);
    }
  };
  const handleChangeAddressCustom = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [fieldName]: value,
      },
    }));
  };
  useEffect(() => {
    const fetchAddressDefault = async () => {
      const res = await fetch(`${ADDRESS_ENDPOINT}/address-default`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Have error");
      }
      setAddressDefault(data.address);
      try {
      } catch (error) {
        console.log(object);
      }
    };
    fetchAddressDefault();
  }, []);
  return (
    <div className="md:mt-20 mt-10 md:gap-8 gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.2fr_0.9fr]">
      {/* LEFT */}
      <div className="flex flex-col gap-6">
        {/* Contact information */}
        <div
          className={`px-3 py-5 border rounded-md lg:px-6 xl:px-10 md:py-6 ${
            errorForm?.failInfo
              ? "bg-error-50 border border-error-500"
              : "border-primary-400"
          }`}>
          <h2 className="text-xl font-medium">Contact Information</h2>
          <div className="flex flex-col w-full gap-3 mt-6 xl:flex-row">
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                First Name
              </label>
              <Input
                fullWidth={true}
                className={"!text-xs"}
                name={"firstName"}
                onChange={handleChangeUser}
                type="text"
                defaultValue={user?.user?.firstname}
                placeholder={"First Name"}
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Last Name
              </label>
              <Input
                onChange={handleChangeUser}
                type="text"
                name={"lastName"}
                fullWidth={true}
                defaultValue={user?.user?.lastname}
                className={"!text-xs "}
                placeholder={"Last Name"}
              />
            </div>
          </div>
          <label className="block mt-4 mb-1 text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <Input
            fullWidth={true}
            name={"phoneNumber"}
            onChange={handleChangeUser}
            type="text"
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
            defaultValue={user?.user?.email}
            type="email"
            name={"email"}
            onChange={handleChangeUser}
          />
        </div>
        {/*  Shipping Address */}
        <AddressSelect
          haveBorder={true}
          formData={formData}
          setFormData={setFormData}
          errorForm={errorForm}
          handleChangeAddressCustom={handleChangeAddressCustom}
        />

        {/*  Payment method */}
        <div className="px-3 py-5 border rounded-md lg:px-6 xl:px-10 md:py-6 border-primary-400">
          <h2 className="mb-6 text-xl font-medium">Payment method</h2>
          <label className="text-xs cursor-pointer md:text-sm">
            <div className="flex items-center justify-between p-3 border rounded-lg border-primary-200">
              <div className="flex items-center w-full gap-2">
                <input
                  value={"Cash On Delivery"}
                  onChange={handleChangePayment}
                  type="radio"
                  name="paymentMethod"
                />
                <div className="flex items-center justify-between w-full font-medium ">
                  <span>Cash on Delivery (COD)</span>
                  <Image
                    src={iconShipCod}
                    width={24}
                    height={24}
                    loading="lazy"
                    alt="iccod"
                  />
                </div>
              </div>
            </div>
          </label>

          <label className="text-xs cursor-pointer md:text-sm">
            <div className="flex items-center justify-between p-3 mt-6 border rounded-lg border-primary-200">
              <div className="flex items-center w-full gap-2">
                <input
                  value={"Momo"}
                  onChange={handleChangePayment}
                  type="radio"
                  name="paymentMethod"
                />
                <div className="flex items-center justify-between w-full font-medium ">
                  <span>Pay with Momo</span>
                  <Image
                    src={iconMomo}
                    loading="lazy"
                    width={24}
                    height={24}
                    alt="icmomo"
                  />
                </div>
              </div>
            </div>
          </label>
        </div>
        <button
          onClick={handleOrder}
          type="submit"
          disabled={loadingOrder}
          className="hidden w-full py-3 text-base rounded-md bg-primary-900 text-primary-50 md:block hover:opacity-80 disabled:opacity-70">
          {loadingOrder ? <SpinnerMini /> : "Place Order"}
        </button>
      </div>

      {/* RIGHT */}
      <div className="px-3 py-4 border rounded-md md:px-6 border-primary-400 h-fit">
        <h2 className="mb-6 text-2xl font-medium">Order summary</h2>
        <div className="flex flex-col gap-2 overflow-y-scroll max-h-[300px] md:max-h-[480px]">
          {carts.map((cart) => (
            <div
              key={cart._id}
              className="flex justify-between pb-3 border-b border-gray-300">
              <div className="flex items-center gap-2">
                <Image
                  src={cart.product.images[0]}
                  alt={cart.product.title}
                  className="w-20 h-20 rounded-sm"
                  loading="lazy"
                  width={500}
                  height={500}
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium text-primary-900">
                    {cart.product.title}
                  </h4>
                  <p className="text-xs text-gray-600">Color: {cart.color}</p>
                  <span className="text-xs font-medium text-primary-800">
                    Quantity: {cart.quantity}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-primary-900">
                ${cart.price * cart.quantity}
              </h4>
            </div>
          ))}
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
            <span className="font-medium text-primary-900">
              ${totalPriceCarts.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2 font-medium text-primary-900">
            <span>Total</span>
            <h2 className="">${totalPriceCarts.toFixed(2)}</h2>
          </div>
        </div>
      </div>
      <button
        onClick={handleOrder}
        type="submit"
        disabled={loadingOrder}
        className="block w-full py-3 text-sm rounded-md md:hidden bg-primary-900 text-primary-50 hover:opacity-80 disabled:opacity-70">
        {loadingOrder ? <SpinnerMini /> : "Place Order"}
      </button>
    </div>
  );
}
