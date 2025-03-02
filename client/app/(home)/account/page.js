import { useSelector } from "react-redux";
import Breadcrumb from "../../_components/Breadcrumb";
import FormAccount from "../../_components/FormAccount";
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
  const { user } = useSelector((state) => state.user);
  console.log(user.user);
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
      {/* FORM */}
      <FormAccount />
    </>
  );
}
