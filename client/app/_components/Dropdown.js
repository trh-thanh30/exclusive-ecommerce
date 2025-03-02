import Link from "next/link";
import {
  CiLogout,
  CiShoppingCart,
  CiStar,
  CiNoWaitingSign,
  CiUser,
} from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import useSignOut from "../hooks/useSignOut";
import SpinnerMini from "./SpinnerMini";
import OnlyAdminPrivateRoute from "./OnlyAdminPrivateRoute";
const list = [
  {
    name: "My Account",
    icon: <CiUser size={22} />,
    link: "/account",
  },
  {
    name: "My Order",
    icon: <CiShoppingCart size={22} />,
    link: "#",
  },
  {
    name: "My Cancellations",
    icon: <CiNoWaitingSign size={22} />,
    link: "#",
  },
  {
    name: "My Reviews",
    icon: <CiStar size={22} />,
    link: "#",
  },
];
export default function Dropdown({ user }) {
  const { avatar, email, username, role_name } = user;
  const { loading, signout } = useSignOut();
  return (
    <section className="z-50 p-4 border rounded-md shadow-md bg-slate-50 border-slate-50">
      <div className="">
        <div className="flex flex-col items-center gap-1">
          <img className="rounded-full w-14 h-14" src={avatar} alt={username} />
          <span className="text-xs text-slate-600">{username}</span>
          <span className="text-sm text-slate-700">{email}</span>
        </div>
        <span className="flex items-center w-full my-2 border border-primary-200"></span>
        <div className="flex flex-col gap-1">
          {list.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="flex items-center gap-3 px-2 py-1 transition-colors rounded-sm hover:bg-slate-950 hover:text-slate-50"
            >
              <span>{item.icon}</span>
              <span className="text-sm text-inherit text-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
          {role_name === "admin" ? (
            <Link
              className="flex items-center gap-3 px-2 py-1 transition-colors rounded-sm hover:bg-slate-950 hover:text-slate-50"
              href={"/dashboard"}
            >
              <span>
                <RxDashboard size={22} />
              </span>
              <span className="text-sm text-inherit text-nowrap">
                Dashboard
              </span>
            </Link>
          ) : (
            ""
          )}
          <span
            href={"/#"}
            onClick={signout}
            className="flex items-center gap-3 px-2 py-1 transition-colors rounded-sm cursor-pointer hover:text-red-500 hover:bg-red-50"
          >
            <span>
              <CiLogout size={22} />
            </span>
            <span className="text-sm text-inherit ">
              {loading ? <SpinnerMini /> : "Sign Out"}
            </span>
          </span>
        </div>
      </div>
      {/* <OnlyAdminPrivateRoute /> */}
    </section>
  );
}
