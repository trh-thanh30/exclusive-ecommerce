import { CHANGE_PASSWORD } from "@/app/constants/api";
import { changePasswordSuccess } from "@/redux/features/user-slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function useChangePassword() {
  const [formDataPassword, setFormDataPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const onChangePassword = (e) => {
    setFormDataPassword({
      ...formDataPassword,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchChangePassword = async () => {
    try {
      const res = await fetch(CHANGE_PASSWORD, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataPassword),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else if (res.ok) {
        toast.success(data.message);
        dispatch(changePasswordSuccess());
        router.push("/signin");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleChangePassword = () => {
    Swal.fire({
      title: "Do you want to change your password?",
      icon: "question",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
      html: `<p style="font-size: 14px; color: #111827; ">
                If you change your password, you will be logged out.
              </p>`,
      confirmButtonColor: "#111827",
      cancelButtonColor: "#D1D5DB",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchChangePassword();
      }
    });
  };
  return {
    formDataPassword,
    onChangePassword,
    handleChangePassword,
  };
}
