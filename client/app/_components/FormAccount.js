"use client"
import { useRef } from "react";

export default function FormAccount() {
  const imageRef = useRef();
  const handleClickFile = () => imageRef.current.click();
  const warp_content  = "flex flex-col gap-1";
  const label_style = "md:text-sm text-xs";
  const input_style = "p-2 border rounded-md md:text-sm text-xs focus-within:border-primary-800 outline-none focus-within:shadow-lg focus-within:shadow-primary-200";
  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr] md:gap-6 gap-4 md:mt-8 mt-4 md:px-8">
      {/* Sidebar */}
      <div>
        <p className="md:text-base text-sm font-medium">Manage My Account</p>
        <ul className="flex flex-col gap-1 md:mt-3 mt-2 md:text-sm text-xs text-primary-600">
          <li>My Profile</li>
          <li>Address Book</li>
          <li>My Payment Options</li>
        </ul>
        <p className="md:mt-6 mt-4 md:text-base text-sm font-medium">My Orders</p>
        <ul className="flex flex-col gap-2 md:mt-3 mt-2 md:text-sm text-xs text-primary-600">
          <li>My Returns</li>
          <li>My Cancellations</li>
        </ul>
      </div>
      {/* Form */}
      <div className="p-4 md:p-9 bg-slate-50 rounded-md shadow-sm">
        <h2 className="md:text-xl text-base font-medium">Edit Your Profile</h2>
        <form className="md:mt-4 mt-2">
          <input type="file" accept="image/*" ref={imageRef} hidden />
          <div className="flex justify-center">
            <img
              onClick={handleClickFile}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="Profile"
            />
          </div>
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-6 mt-4">
            <div className={warp_content}>
              <label className={label_style}>First Name</label>
              <input className={input_style} type="text" />
            </div>
            <div className={warp_content}>
              <label className={label_style}>Last Name</label>
              <input className={input_style}type="text" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-6 mt-4">
            <div className={warp_content}>
              <label className={label_style}>Email</label>
              <input className={input_style} type="email" />
            </div>
            <div className={warp_content}>
              <label className={label_style}>Address</label>
              <input className={input_style} type="text" />
            </div>
          </div>
          {/* Passwords */}
          <div className="flex flex-col md:mt-6 mt-4 gap-4 ">
            <label className={label_style}>Password Changes</label>
            <input className={input_style} type="password" placeholder="Current Password" />
            <input className={input_style} type="password" placeholder="New Password" />
            <input className={input_style} type="password" placeholder="Confirm New Password" />
          </div>
          {/* Buttons */}
          <div className="flex flex-row justify-end gap-4 mt-6">
            <button className="md:p-3 p-2 text-xs md:text-sm text-error-500 bg-red-50 rounded-md">Delete Account</button>
            <button className="md:p-3 p-2 text-xs md:text-sm bg-primary-900 text-white rounded-md">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
