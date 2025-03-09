"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/features/user-slice";
import { UPDATE_USER_ENDPOINT } from "../constants/api";
import SpinnerMini from "./SpinnerMini";

const warp_content = "flex flex-col gap-1";
const label_style = "md:text-sm text-xs";
const input_style =
  "p-2 border rounded-md md:text-sm text-xs focus-within:border-primary-800 outline-none focus-within:shadow-lg focus-within:shadow-primary-200 text-sm text-primary-800 placeholder:text-primary-400";
export default function FormAccount() {
  const imageRef = useRef();
  const handleClickFile = () => imageRef.current.click();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  console.log(user);
  const [formData, setFormData] = useState({
    firstname: user?.user?.firstname || "",
    lastname: user?.user?.lastname || "",
    email: user?.user?.email || "",
    username: user?.user?.username || "",
    oldpassword: "",
    newpassword: "",
    confirmPassword: "",
    avatar: user?.user?.avatar || "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [previewAvatar, setPreviewAvatar] = useState(formData.avatar);
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewAvatar(reader.result);
        setFormData({ ...formData, avatar: file });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      if (formData.firstname) body.append("firstname", formData.firstname);
      if (formData.lastname) body.append("lastname", formData.lastname);
      if (formData.email) body.append("email", formData.email);
      if (formData.username) body.append("username", formData.username);
      if (formData.oldpassword)
        body.append("oldpassword", formData.oldpassword);
      if (formData.newpassword)
        body.append("newpassword", formData.newpassword);
      if (formData.confirmPassword)
        body.append("confirmPassword", formData.confirmPassword);
      if (formData.confirmPassword) body.append("avatar", formData.avatar);
      dispatch(updateStart());
      const res = await fetch(UPDATE_USER_ENDPOINT, {
        method: "PUT",
        credentials: "include",
        body: body,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        dispatch(updateFailure(data.message));
      } else {
        toast.success("Update user successfully");
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error(error.message);
    }
  };
  if (!user.user) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr] md:gap-6 gap-4 md:mt-8 mt-4 md:px-8 ">
      {/* Sidebar */}
      <div>
        <p className="text-sm font-medium md:text-base">Manage My Account</p>
        <ul className="flex flex-col gap-1 mt-2 text-xs md:mt-3 md:text-sm text-primary-600">
          <li>My Profile</li>
          <li>Address Book</li>
          <li>My Payment Options</li>
        </ul>
        <p className="mt-4 text-sm font-medium md:mt-6 md:text-base">
          My Orders
        </p>
        <ul className="flex flex-col gap-2 mt-2 text-xs md:mt-3 md:text-sm text-primary-600">
          <li>My Returns</li>
          <li>My Cancellations</li>
        </ul>
      </div>
      {/* Form */}
      <div className="p-4 rounded-md shadow-sm md:p-9 bg-slate-50">
        <h2 className="text-base font-medium md:text-xl">Edit Your Profile</h2>
        <form onSubmit={handleUpdateUser} className="mt-2 md:mt-4">
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
                type="text"
              />
            </div>
            <div className={warp_content}>
              <label className={label_style}>Last Name</label>
              <input
                name="lastname"
                placeholder="Update your last name"
                defaultValue={user?.user?.lastname}
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
                placeholder="Update your username"
                defaultValue={user?.user?.username}
                onChange={handleChange}
                className={input_style}
                type="text"
              />
            </div>
          </div>
          {/* Passwords */}
          <div className="flex flex-col gap-4 mt-4 md:mt-6 ">
            <label className={label_style}>Password Changes</label>
            <input
              name="oldpassword"
              onChange={handleChange}
              className={input_style}
              type="password"
              placeholder="Current Password"
            />
            <input
              name="newpassword"
              onChange={handleChange}
              className={input_style}
              type="password"
              placeholder="New Password"
            />
            <input
              name="confirmPassword"
              onChange={handleChange}
              className={input_style}
              type="password"
              placeholder="Confirm New Password"
            />
          </div>
          {/* Buttons */}
          <div className="flex flex-row justify-end gap-4 mt-6">
            <button
              type="button"
              className="p-2 text-xs rounded-md md:p-3 md:text-sm text-error-500 bg-red-50"
            >
              Delete Account
            </button>
            <button
              type="submit"
              className="p-2 text-xs text-white rounded-md md:p-3 md:text-sm bg-primary-900"
            >
              {loading ? <SpinnerMini /> : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
