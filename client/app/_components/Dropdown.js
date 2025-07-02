import Link from "next/link";
import {
  CiLogout,
  CiShoppingCart,
  CiHeart,
  CiUser,
  CiDark,
  CiLight,
} from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";

import useSignOut from "../hooks/useSignOut";
import SpinnerMini from "./SpinnerMini";
import { useState } from "react";

const list = [
  {
    name: "My Account",
    icon: <CiUser size={22} />,
    link: "/account",
  },
  {
    name: "My Cart",
    icon: <CiShoppingCart size={22} />,
    link: "/cart",
  },
  {
    name: "My Favorites List",
    icon: <CiHeart size={22} />,
    link: "/wishlist",
  },
];
export default function Dropdown({ user }) {
  const { avatar, email, username, role_name } = user;
  const { loading, signout } = useSignOut();
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <img className="rounded-full w-14 h-14" src={avatar} alt={username} />
        <span className="text-xs font-medium text-slate-600">{username}</span>
        <span className="text-sm text-slate-400">{email}</span>
      </div>
      <span className="flex items-center w-full my-2 border border-primary-200"></span>
      <div className="flex flex-col gap-1">
        {list.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="flex items-center gap-3 px-2 py-1 transition-colors rounded-sm text-primary-800 hover:bg-primary-900 hover:text-primary-50 opacity-90">
            <span>{item.icon}</span>
            <span className="text-sm text-inherit text-nowrap">
              {item.name}
            </span>
          </Link>
        ))}
        {role_name === "admin" ? (
          <Link
            className="flex items-center gap-3 px-2 py-1 transition-colors rounded-sm text-primary-800 hover:bg-primary-900 hover:text-primary-50 opacity-90"
            href={"/dashboard"}>
            <span>
              <CiBoxList size={22} />
            </span>
            <span className="text-sm text-inherit text-nowrap">Dashboard</span>
          </Link>
        ) : (
          ""
        )}

        <hr className="w-full mx-auto my-1 border-primary-300" />
        <button
          onClick={handleDarkMode}
          className="flex items-center gap-3 px-2 py-1 text-sm transition-all duration-300 ease-in-out rounded-md shadow-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 hover:shadow-md dark:hover:shadow-slate-700">
          <span
            className={`transition-transform duration-300 ${
              darkMode ? "rotate-180" : "rotate-0"
            }`}>
            {!darkMode ? <CiDark size={22} /> : <CiLight size={22} />}
          </span>
          <span className="transition-all duration-300">
            {!darkMode ? "Dark Mode" : "Light Mode"}
          </span>
        </button>
        <span
          onClick={signout}
          className="flex items-center gap-3 px-2 py-1 mt-1 transition-colors rounded-sm cursor-pointer hover:text-red-500 hover:bg-red-50">
          <span>
            <CiLogout size={22} />
          </span>
          <span className="text-sm text-inherit ">
            {loading ? <SpinnerMini /> : "Sign Out"}
          </span>
        </span>
      </div>
    </>
  );
}
