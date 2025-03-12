"use client"
import React from "react";
import Breadcrumb from "../../_components/Breadcrumb";
import { FiPhone, FiMail } from "react-icons/fi";
import Input from "../../_components/Input";
import Achivment from "@/app/_components/Achivment";
import useCreateContact from "@/app/hooks/useCreateContact";
import SpinnerMini from "@/app/_components/SpinnerMini";


const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function Page() {
  const iconStyle = `flex items-center justify-center p-2 transition-colors rounded-full bg-primary-900 text-primary-50 text-sm`;
  const textStyle = `xl:text-sm text-xs text-primary-900`;
  const { loading, formData, handleChange, handleSubmitContact } =
    useCreateContact();
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="md:mt-10 mt-4 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:px-0 mb-12">
        <section className="flex flex-col gap-5 p-4 border rounded-lg shadow-md md:p-6 border-primary-100">
          <div className="flex flex-col gap-1 xl:gap-3">
            <div className="flex items-center gap-3">
              <span className={iconStyle}>
                <FiPhone size={20} />
              </span>
              <h2 className="text-sm font-medium xl:text-base">Call To Us</h2>
            </div>
            <p className={textStyle}>We are available 24/7, 7 days a week.</p>
            <p className={textStyle}>Phone: +8801611112222</p>
          </div>
          <div className="flex flex-col gap-1 xl:gap-3">
            <div className="flex items-center gap-3">
              <span className={iconStyle}>
                <FiMail size={20} />
              </span>
              <h2 className="text-sm font-medium xl:text-base">Write To US</h2>
            </div>
            <p className={textStyle}>
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className={textStyle}>Emails: customer@exclusive.com</p>
            <p className={textStyle}>Emails: support@exclusive.com</p>
          </div>
        </section>
        <section className="flex flex-col gap-5 p-4 border rounded-lg shadow-md md:p-6 border-primary-100">
          <form onSubmit={handleSubmitContact} className="flex flex-col gap-3 md:gap-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              <Input
                name={"firstname"}
                id={"firstname"}
                onChange={handleChange}
                fullWidth
                placeholder="First Name"
              />
              <Input
                name={"lastname"}
                id={"lastname"}
                onChange={handleChange}
                fullWidth
                placeholder="Last Name"
              />
              <Input
                name={"phone_number"}
                id={"phone_number"}
                onChange={handleChange}
                fullWidth
                placeholder="Phone number"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                name={"email"}
                id={"email"}
                onChange={handleChange}
                fullWidth
                placeholder="Email"
              />
              <Input
                name={"subject_name"}
                id={"subject_name"}
                onChange={handleChange}
                fullWidth
                placeholder="Subject"
              />
            </div>
            <Input
              name={"note"}
              id={"note"}
              onChange={handleChange}
              fullWidth={true}
              isTextArea={true}
              placeholder="Your message"
            />
            <div className="flex justify-end">
              <button type="submit" className="p-2 text-xs rounded-md md:p-3 md:text-sm text-primary-50 bg-primary-900">
                {loading ? <SpinnerMini/> : "Send Message"}
              </button>
            </div>
          </form>
        </section>
      </div>
      <Achivment />
    </>
  );
}
