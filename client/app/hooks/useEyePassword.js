import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function useEyePassword() {
  const sizeIconPass = 18;
  const [password, setPassword] = useState("");

  const [openPassword, setOpenPassword] = useState(false);
  const handleToggleOpenPassword = () => {
    setOpenPassword((open) => !open);
  };
  const eyePassword = openPassword ? (
    <IoEyeOutline
      className="cursor-pointer"
      onClick={handleToggleOpenPassword}
      size={sizeIconPass}
    />
  ) : (
    <IoEyeOffOutline
      className="cursor-pointer"
      onClick={handleToggleOpenPassword}
      size={sizeIconPass}
    />
  );

  return { password, setPassword, openPassword, eyePassword };
}
