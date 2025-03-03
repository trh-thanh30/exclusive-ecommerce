"use client";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import Link from "next/link";
import Logo from "../../_components/Logo";
import Input from "../../_components/Input";
import ButtonIcon from "../../_components/ButtonIcon";
import Separate from "../../_components/Separate";
import SpinnerMini from "../../_components/SpinnerMini";
import useSignup from "../../hooks/useSignup";
import useEyePassword from "../../hooks/useEyePassword";
import ImageLeftForm from "../../_components/ImageLeftForm";
import useSignInWithGoogle from "../../hooks/useSignInWithGoogle";
import { useState } from "react";
import { iconGooogle, sizeIconPrimary } from "@/app/constants/icons";

export default function Page() {
  const [keyPressed, setKeyPressed] = useState({
    username: false,
    email: false,
    password: false,
  });
  const { isLoading, signup, error } = useSignup();
  const { password, setPassword, openPassword, eyePassword } = useEyePassword();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Chuyển đổi FormData thành Object
    const result = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await signup(result);
  };
  const errors = {
    username: error === "Please enter your username",
    email: error === "Please enter your email",
    password: error === "Please enter your password",
  };
  const keyDown = (e, filed) => {
    setKeyPressed((prev) => ({ ...prev, [filed]: true }));
  };
  const getInputClassName = (field) =>
    errors[field] && !keyPressed[field]
      ? `bg-error-50 border border-error-500 placeholder:text-error-500 text-error-400 focus-within:border-error-500`
      : ``;

  const getIconClassName = (field) =>
    errors[field] && !keyPressed[field] ? `text-error-500` : ``;
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center w-full gap-12">
        {/* Left Side */}
        <ImageLeftForm />
        {/* Right Side */}
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-2 p-4 bg-white md:gap-4 md:w-1/2">
          <Logo logoDefault={true} classname={"md:mt-4 mt-2 mb-4 md:mb-6"} />
          <h1 className="text-2xl font-medium md:text-3xl">Sign Up</h1>
          <p className="text-xs font-medium text-center md:text-sm text-primary-400">
            Let’s create your account and Shop like a pro and save money.
          </p>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 mt-4 md:mt-6 xl:gap-6"
          >
            <Input
              id={"username"}
              name={"username"}
              iconClassName={getIconClassName("username")}
              className={getInputClassName("username")}
              onKeyDown={(e) => keyDown(e, "username")}
              type={"text"}
              placeholder={"Please enter your user name"}
              disabled={isLoading}
              icon={<CiUser size={sizeIconPrimary} />}
            />
            <Input
              id={"email"}
              name={"email"}
              type={"email"}
              className={getInputClassName("email")}
              onKeyDown={(e) => keyDown(e, "email")}
              iconClassName={getIconClassName("email")}
              disabled={isLoading}
              placeholder={"Please enter your email"}
              icon={<CiMail size={sizeIconPrimary} />}
            />
            <Input
              id={"password"}
              name={"password"}
              disabled={isLoading}
              className={getInputClassName("password")}
              onKeyDown={(e) => keyDown(e, "password")}
              iconClassName={getIconClassName("password")}
              onChange={(e) => setPassword(e.target.value)}
              type={openPassword ? "text" : "password"}
              placeholder={"Please enter your password"}
              icon={
                <div className="flex items-center gap-3">
                  {password ? eyePassword : null}
                  <CiLock size={sizeIconPrimary} />
                </div>
              }
            />

            <div className="mt-4 md:mt-6">
              <ButtonIcon
                disabled={isLoading}
                type={"submit"}
                text={isLoading ? <SpinnerMini /> : "Sign Up"}
                className={` text-primary-800 border-primary-400 hover:bg-primary-800 hover:border-primary-800 hover:text-white`}
              />
              <Separate />
              <ButtonIcon
                // onClick={signinWithGoogle}
                type={"button"}
                text={"Sign Up with Google"}
                className={"border-primary-400"}
                icon={iconGooogle}
              />
            </div>
          </form>

          <div className="flex items-center gap-1 mt-1 text-xs md:text-sm md:mt-2 ">
            <p className=" text-primary-400">Already have an account?</p>
            <Link className="text-primary-800 hover:underline" href={"/signin"}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
