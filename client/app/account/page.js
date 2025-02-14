import React from "react";
import Breadcrumb from "../_components/Breadcrumb";
import ButtonIcon from "../_components/ButtonIcon";
export const metadata = {
  title: "Account",
  description: "Manage your account and more",
};
const breadcrumb = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Account",
    href: "/account",
  },
];
export default function Page() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <Breadcrumb items={breadcrumb} />
        <div className="flex items-center gap-1 text-sm text-slate-500">
          <span>Welcome! </span>{" "}
          <span className="text-slate-800">Md Rimel</span>
        </div>
      </div>
      {/* Content */}
      <div className="grid grid-cols-[0.5fr_2fr] mt-16">
        {/* left content */}
        <div>
          <p className="text-base font-medium">Manage My Account</p>
          <ul className="flex flex-col gap-1 mt-3 ml-4 text-sm text-slate-600">
            <li>My Profile</li>
            <li>Address Book</li>
            <li>My Payment Options</li>
          </ul>
          <p className="mt-6 text-base font-medium">My Orders</p>
          <ul className="flex flex-col gap-2 mt-3 ml-4 text-sm text-slate-600">
            <li>My Returns</li>
            <li>My Cancellations</li>
          </ul>
        </div>
        {/* right content */}
        <div className="rounded-md shadow-sm p-9 bg-slate-50">
          <h2 className="text-xl font-medium">Edit Your Profile</h2>
          <form action="" className="mt-4">
            {/* NAME */}
            <div className="flex items-center gap-12">
              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm" htmlFor="First Name">
                  First Name
                </label>
                <input
                  className="w-full p-2 text-sm border rounded-md outline-none focus-within:border-slate-900 text-slate-500"
                  type="text"
                  name="First Name"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm" htmlFor="Last Name">
                  Last Name
                </label>
                <input
                  className="w-full p-2 text-sm border rounded-md outline-none focus-within:border-slate-900 text-slate-500"
                  type="text"
                  name="Last Name"
                />
              </div>
            </div>
            {/* EMAIL AND ADDRESS */}
            <div className="flex items-center gap-12 mt-6">
              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm" htmlFor="First Name">
                  Email
                </label>
                <input
                  className="w-full p-2 text-sm border rounded-md outline-none focus-within:border-slate-900 text-slate-500"
                  type="text"
                  name="First Name"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="mb-2 text-sm" htmlFor="Last Name">
                  Address
                </label>
                <input
                  className="w-full p-2 text-sm border rounded-md outline-none focus-within:border-slate-900 text-slate-500"
                  type="text"
                  name="Last Name"
                />
              </div>
            </div>
            {/* PASSWORD OLD AND NEW */}
            <div className="flex flex-col mt-6">
              <label className="mb-2 text-sm" htmlFor="Password Changes">
                Password Changes
              </label>
              <div className="flex flex-col gap-4">
                <input
                  className="w-full p-2 text-sm border rounded-md outline-none focus-within:border-slate-900 text-slate-500"
                  type="password"
                  placeholder="Current Passwod"
                  name=""
                />
                <input
                  className="w-full p-2 text-sm border rounded-md outline-none focus-within:border-slate-900 text-slate-500"
                  type="password"
                  placeholder="New Passwod"
                  name=""
                />
                <input
                  className="w-full p-2 text-sm border rounded-md outline-none focus-within:border-slate-900 text-slate-500"
                  type="password"
                  name=""
                  placeholder="Confirm New Passwod"
                />
              </div>
            </div>
            {/* BUTTON */}
            <div className="flex items-center justify-end mt-6">
              <button className="p-3 text-sm rounded-md bg-slate-900 text-slate-50 hover:opacity-95">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
