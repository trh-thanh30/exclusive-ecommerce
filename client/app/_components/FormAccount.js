"use client";
import { useRef } from "react";
import SpinnerMini from "./SpinnerMini";
import Spinner from "./Spinner";
import useUpdateAccount from "../hooks/accountHooks/useUpdateAccount";
import useDeleteAccount from "../hooks/accountHooks/useDeleteAccount";
import useChangePassword from "../hooks/accountHooks/useChangePassword";

const warp_content = "flex flex-col gap-1";
const label_style = "md:text-sm text-xs uppercase text-primary-500 font-medium";
const input_style =
  "p-2 border rounded-md md:text-sm text-xs focus-within:border-primary-800  outline-none focus-within:shadow-lg focus-within:shadow-primary-200  text-sm text-primary-600 placeholder:text-primary-400";
export default function FormAccount() {
  const { alertDeleteAccount } = useDeleteAccount();
  const {
    user,
    handleChange,
    handleChangeAvatar,
    handleUpdateUser,
    loading,
    previewAvatar,
  } = useUpdateAccount();
  const { handleChangePassword, onChangePassword } = useChangePassword();
  const imageRef = useRef();
  const handleClickFile = () => imageRef.current.click();

  if (!user?.user) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleUpdateUser}>
        <h2 className="mb-2 text-base font-medium md:text-xl">
          Account Details
        </h2>
        <input
          name="avatar"
          onChange={handleChangeAvatar}
          type="file"
          accept="image/*"
          ref={imageRef}
          hidden
        />
        <div className="flex justify-center">
          <img
            onClick={handleClickFile}
            className="w-32 h-32 rounded-full cursor-pointer md:w-40 md:h-40"
            src={previewAvatar}
            alt="Profile"
          />
        </div>
        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 md:mt-6">
          <div className={warp_content}>
            <label className={label_style}>First Name</label>
            <input
              name="firstname"
              placeholder="Update your first name"
              defaultValue={user?.user?.firstname}
              onChange={handleChange}
              className={input_style}
              disabled={loading}
              type="text"
            />
          </div>
          <div className={warp_content}>
            <label className={label_style}>Last Name</label>
            <input
              name="lastname"
              placeholder="Update your last name"
              defaultValue={user?.user?.lastname}
              disabled={loading}
              onChange={handleChange}
              className={input_style}
              type="text"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 md:mt-6">
          <div className={warp_content}>
            <label className={label_style}>Email</label>
            <input
              name="email"
              disabled={loading}
              placeholder="Update your email"
              defaultValue={user?.user?.email}
              onChange={handleChange}
              className={input_style}
              type="email"
            />
          </div>
          <div className={warp_content}>
            <label className={label_style}>User Name</label>
            <input
              name="username"
              disabled={loading}
              placeholder="Update your username"
              defaultValue={user?.user?.username}
              onChange={handleChange}
              className={input_style}
              type="text"
            />
          </div>
        </div>
        <div className="flex items-end justify-end w-full mt-6">
          <button
            disabled={loading}
            type="submit"
            className="p-2 text-xs text-white rounded-md md:p-3 md:text-sm bg-primary-900 disabled:opacity-95">
            {loading ? <SpinnerMini /> : "Update Profile"}
          </button>
        </div>
        <h2 className="mt-10 text-base font-medium md:text-xl">Password</h2>
        {/* Passwords */}
      </form>
      <div className="mt-2 md:mt-4">
        <div className="flex flex-col gap-4">
          <label className={label_style}>Old password</label>
          <input
            name="oldPassword"
            className={input_style}
            type="password"
            placeholder="Current Password"
            onChange={onChangePassword}
          />
          <label className={label_style}>new password</label>
          <input
            name="newPassword"
            className={input_style}
            type="password"
            placeholder="New Password"
            onChange={onChangePassword}
          />
          <label className={label_style}>REPEAT NEW PASSWORD</label>
          <input
            name="confirmPassword"
            className={input_style}
            type="password"
            placeholder="Confirm New Password"
            onChange={onChangePassword}
          />
        </div>
        {/* Buttons */}
        <div className="flex flex-row justify-end gap-4 mt-6">
          <button
            disabled={loading}
            type="button"
            onClick={alertDeleteAccount}
            className="p-2 text-xs rounded-md md:p-3 md:text-sm text-error-500 bg-red-50">
            Delete Account
          </button>
          <button
            type="button"
            onClick={handleChangePassword}
            className="p-2 text-xs text-white rounded-md md:p-3 md:text-sm bg-primary-900 disabled:opacity-95">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
