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
  const [isFormChanged, setIsFormChanged] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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
  const [previewAvatar, setPreviewAvatar] = useState(formData.avatar);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Kiểm tra nếu dữ liệu có thay đổi so với ban đầu
      const hasChanged = Object.keys(updatedForm).some(
        (key) => updatedForm[key] !== (user?.user?.[key] || "")
      );
      setIsFormChanged(hasChanged);
      return updatedForm;
    });
  };
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
      if (formData.oldpassword)
        body.append("oldpassword", formData.oldpassword);
      if (formData.newpassword)
        body.append("newpassword", formData.newpassword);
      if (formData.confirmPassword)
        body.append("confirmPassword", formData.confirmPassword);
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
      dispatch(updateFailure(error.message));
      toast.error(error.message);
    }
  };
  return {
    formData,
    handleChange,
    handleChangeAvatar,
    handleUpdateUser,
    loading,
    previewAvatar,
    user,
    isFormChanged,
  };
}
