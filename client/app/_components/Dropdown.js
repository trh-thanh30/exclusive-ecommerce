import Link from "next/link";
import { CiLogout, CiShoppingCart, CiStar, CiNoWaitingSign  } from "react-icons/ci";
const list = [
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
  const { avatar, email, role_name, username } = user;
  return (
    <section className="p-4 border rounded-md shadow-md bg-slate-50 border-slate-50">
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
              href={item.link}
              className="flex items-center gap-3 px-2 py-1 transition-colors rounded-sm hover:bg-slate-950 hover:text-slate-50"
            >
              <span>{item.icon}</span>
              <span className="text-sm text-inherit text-nowrap">
                {item.name}
              </span>
            </Link>
          ))}
          <Link
            href={"/#"}
            className="flex items-center gap-3 px-2 py-1 transition-colors rounded-sm hover:bg-red-600 hover:text-slate-50"
          >
            <span>
              <CiLogout size={22} />
            </span>
            <span className="text-sm text-inherit ">Logout</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
