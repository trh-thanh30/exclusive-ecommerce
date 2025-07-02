import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import AddressSelect from "./AddressSelect";
import { ADDRESS_ENDPOINT } from "../constants/api";
import toast from "react-hot-toast";
import { CiPen } from "react-icons/ci";

export default function AddressAccount() {
  const [openModal, setOpenModal] = useState(false);
  const [getId, setGetId] = useState(null);
  const [mode, setMode] = useState(null);
  const [address, setAddress] = useState([]);
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    commune: "",
    detailAddress: "",
    isDefault: false,
  });
  const handleChangeAddress = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const handleFetchAddress = async () => {
    try {
      const res = await fetch(ADDRESS_ENDPOINT, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      setAddress(data.address);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleFetchAddress();
  }, []);

  const handleCreateAddress = async () => {
    try {
      const res = await fetch(ADDRESS_ENDPOINT, {
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
      } else if (res.ok) {
        toast.success(data.message);
        setOpenModal(false);
        setFormData({
          province: "",
          district: "",
          commune: "",
          detailAddress: "",
          isDefault: false,
        });
        handleFetchAddress();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFetchAddressDetails = async (id) => {
    try {
      const res = await fetch(`${ADDRESS_ENDPOINT}/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      setFormData(data.address);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpdateAddress = async (id) => {
    try {
      const res = await fetch(`${ADDRESS_ENDPOINT}/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else if (res.ok) {
        toast.success(data.message);
        setOpenModal(false);
        handleFetchAddress();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteAddress = async (id) => {
    try {
      const res = await fetch(`${ADDRESS_ENDPOINT}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else if (res.ok) {
        toast.success(data.message);
        handleFetchAddress();
        setOpenModal(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Address</h2>
          <button
            onClick={() => {
              setOpenModal(true);
              setMode("create");
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs transition-colors border rounded-full border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-primary-50">
            <span>Add New Address</span>
            <AiOutlinePlus size={16} />
          </button>
        </div>
        {address.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 mt-8 md:gap-4 md:grid-cols-3">
            {address.map((item) => (
              <section
                key={item._id}
                className="p-2 transition-colors border rounded-md shadow-lg md:p-4 border-primary-200 hover:bg-primary-100 hover:cursor-auto shadow-primary-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium md:text-base text-primary-900">
                    {item.isDefault === true
                      ? "Shipping Address"
                      : "More Address"}
                  </h2>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setMode("edit");
                      handleFetchAddressDetails(item._id);
                      setGetId(item._id);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-primary-400 hover:text-primary-900 hover:underline">
                    <span>Edit</span>
                    <CiPen size={14} />
                  </button>
                </div>
                <div className="flex flex-col gap-1 mt-2 text-xs font-medium text-primary-600">
                  <span>{item.province}</span>
                  <span>{item.district}</span>
                  <span>{item.commune}</span>
                  <span>{item.detailAddress}</span>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center mt-20">
            <h2 className="text-sm font-medium md:text-lg text-primary-900">
              You don't have any address
            </h2>
          </div>
        )}
      </div>
      <AnimatePresence>
        {openModal && (
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
              <div className="mt-5">
                <AddressSelect
                  handleChangeAddressCustom={handleChangeAddress}
                  formData={formData}
                  mode={mode}
                />
                <div className="flex items-center justify-between mt-1 md:mt-3">
                  <div className="flex items-center gap-1">
                    <input
                      onChange={(e) =>
                        handleChangeAddress("isDefault", e.target.checked)
                      }
                      name="isDefault"
                      id="useAsBilling"
                      type="checkbox"
                      checked={formData.isDefault}
                    />
                    <label
                      htmlFor="useAsBilling"
                      className="text-xs font-medium md:text-sm text-primary-500">
                      Use as Shipping Address
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    {mode === "edit" && (
                      <button
                        onClick={() => handleDeleteAddress(getId)}
                        className="px-4 py-2 text-xs font-medium rounded-md md:px-6 md:text-sm bg-error-50 text-error-400 hover:opacity-90">
                        Delete Address
                      </button>
                    )}
                    <button
                      className="px-4 py-2 text-xs font-medium rounded-md md:px-6 md:text-sm bg-primary-900 text-primary-50 hover:opacity-90"
                      type="button"
                      onClick={
                        mode === "create"
                          ? handleCreateAddress
                          : () => handleUpdateAddress(getId)
                      }>
                      {mode === "create" ? "Add Address" : "Update Address"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
