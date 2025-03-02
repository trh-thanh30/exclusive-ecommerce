import FormAccount from "../../_components/FormAccount";
import AccountHeader from "@/app/_components/AccountHeader";
export const metadata = {
  title: "Account",
  description: "Manage your account and more",
};

export default function Page() {
  return (
    <>
      {/* Header */}
      <AccountHeader />
      {/* FORM */}
      <FormAccount />
    </>
  );
}
