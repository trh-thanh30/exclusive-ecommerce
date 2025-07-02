import { UPDATE_USER_ENDPOINT } from "@/app/constants/api";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/features/user-slice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function useUpdateAccount() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstname: user?.user?.firstname || "",
    lastname: user?.user?.lastname || "",
    email: user?.user?.email || "",
    username: user?.user?.username || "",
    avatar: user?.user?.avatar || "",
  });
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
    setLoading(true);
    try {
      const body = new FormData();
      if (formData.firstname) body.append("firstname", formData.firstname);
      if (formData.lastname) body.append("lastname", formData.lastname);
      if (formData.email) body.append("email", formData.email);
      if (formData.username) body.append("username", formData.username);
      if (formData.avatar) body.append("avatar", formData.avatar);
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
        setLoading(false);
      } else {
        toast.success("Update user successfully");
        dispatch(updateSuccess(data));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // dispatch(updateFailure(error.message));
      toast.error(error.message);
    }
  };
  return {
    formData,
    handleChangeAvatar,
    handleUpdateUser,
    loading,
    previewAvatar,
    user,
  };
}
