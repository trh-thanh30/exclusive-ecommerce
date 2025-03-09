import { DELETE_USER_ENDPOINT } from "@/app/constants/api";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "@/redux/features/user-slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function useDeleteAccount() {
  const dispatch = useDispatch();
  const router = useRouter();
  const alertDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34D399",
      cancelButtonColor: "#F56565",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        // Delete user
        const handleDeleteUser = async () => {
          dispatch(deleteUserStart());
          try {
            const res = await fetch(DELETE_USER_ENDPOINT, {
              method: "DELETE",
              credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) {
              toast.error(data.message);
              dispatch(deleteUserFailure(data.message));
            }
            if (res.ok) {
              toast.success("Delete user successfully");
              dispatch(deleteUserSuccess());
              router.push("/signin");
            }
          } catch (err) {
            toast.error(err.message);
          }
        };
        handleDeleteUser();
      }
    });
  };
  return { alertDeleteAccount };
}
