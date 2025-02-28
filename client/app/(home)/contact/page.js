import React from "react";
import Breadcrumb from "../../_components/Breadcrumb";
import { FiPhone, FiMail } from "react-icons/fi";
import Input from "../../_components/Input";
export const metadata = {
  title: "Contact",
  description: "Contact us for more information",
};
const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
export default function Page() {
  const iconStyle = `flex items-center justify-center p-2 transition-colors rounded-full bg-primary-900 text-primary-50`;
  const textStyle = `text-sm text-primary-900`;
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div className="mt-10 grid grid-cols-[1fr_2fr] gap-10">
        <section className="flex flex-col gap-5 p-6 border rounded-lg shadow-xl border-primary-100">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className={`${iconStyle}`}>{<FiPhone size={20} />}</span>
              <h2 className="text-base font-medium">Call To Us</h2>
            </div>
            <p className={`${textStyle}`}>
              We are available 24/7, 7 days a week.
            </p>
            <p className={`${textStyle} `}>Phone: +8801611112222</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className={`${iconStyle}`}>{<FiMail size={20} />}</span>
              <h2 className="text-base font-medium">Write To US</h2>
            </div>
            <p className={`${textStyle}`}>
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className={`${textStyle}`}>Emails: customer@exclusive.com</p>
            <p className={`${textStyle}`}>Emails: support@exclusive.com</p>
          </div>
        </section>
        <section className="flex flex-col gap-5 p-6 border rounded-lg shadow-xl border-primary-100">
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-3">
              <Input fullWidth placeholder={"First Name"} />
              <Input fullWidth placeholder={"Last Name"} />
              <Input fullWidth placeholder={"Phone number"} />
            </div>
            <div className="grid grid-cols-2 gap-3 gird">
              <Input fullWidth placeholder={"Email"} />
              <Input fullWidth  placeholder={"Subject"} />
            </div>
            <Input isTextArea={true} placeholder={"Your message"} />

            <div className="flex justify-end">
              <button className="p-3 text-sm rounded-md text-primary-50 bg-primary-900">Send Message</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
