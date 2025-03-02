"use client";
import { CiLock, CiMail } from "react-icons/ci";
import React, { useState } from "react";
import Link from "next/link";
import Input from "../../_components/Input";
import ButtonIcon from "../../_components/ButtonIcon";
import Separate from "../../_components/Separate";
import ImageLeftForm from "../../_components/ImageLeftForm";
import useEyePassword from "../../hooks/useEyePassword";
import useSignin from "../../hooks/useSignin";
import SpinnerMini from "../../_components/SpinnerMini";
import Logo from "../../_components/Logo";
import { iconGooogle, sizeIconPrimary } from "@/app/constants/icons";
export default function Page() {
  const [keyPressed, setKeyPressed] = useState({
    email: false,
    password: false,
  });
  const { password, setPassword, openPassword, eyePassword } = useEyePassword();
  const { signin, loading, error } = useSignin();
  const errors = {
    email: error === "Please enter your email",
    password: error === "Please enter your password",
  };
  const keyDown = (e, filed) => {
    setKeyPressed((prev) => ({ ...prev, [filed]: true }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await signin(result);
  };
  const getInputClassName = (field) =>
    errors[field] && !keyPressed[field]
      ? `bg-red-50 border border-red-500 placeholder:text-red-500 text-red-400 focus-within:border-red-500`
      : ``;

  const getIconClassName = (field) =>
    errors[field] && !keyPressed[field] ? `text-red-500` : ``;
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center w-full gap-12">
        {/* Left Side */}
        <ImageLeftForm />
        {/* Right Side */}
        <div className="flex flex-col items-center justify-center w-full h-screen gap-2 p-4 bg-white md:gap-4 md:w-1/2">
          <Logo classname={"md:mt-4 mt-2 mb-4 md:mb-6"} />
          <h1 className="text-2xl font-medium md:text-3xl">Hello Again!</h1>
          <p className="text-xs font-medium text-center md:text-sm text-primary-400">
            Welcome back to sign in. As a returning customer, you have access to
            your previously saved all information.
          </p>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 mt-4 md:mt-6 xl:gap-6"
          >
            <Input
              name={"email"}
              disabled={loading}
              onKeyDown={(e) => keyDown(e, "email")}
              className={getInputClassName("email")}
              iconClassName={getIconClassName("email")}
              type={"email"}
              placeholder={"Please enter your email"}
              icon={<CiMail size={sizeIconPrimary} />}
            />

            <Input
              name={"password"}
              placeholder={"Please enter your password"}
              onKeyDown={(e) => keyDown(e, "password")}
              className={getInputClassName("password")}
              iconClassName={getIconClassName("password")}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              type={openPassword ? "text" : "password"}
              icon={
                <div className="flex items-center gap-3">
                  {password ? eyePassword : null}
                  <CiLock size={sizeIconPrimary} />
                </div>
              }
            />
            <div className="mt-4 md:mt-6">
              <ButtonIcon
                type={"submit"}
                disabled={loading}
                text={loading ? <SpinnerMini /> : "Sign In"}
                className={`text-primary-800 border-primary-400 hover:bg-primary-800 hover:border-primary-800 hover:text-white`}
              />

              <Separate />

              <ButtonIcon
                type={"button"}
                text={"Sign In with Google"}
                icon={iconGooogle}
                className={"border-primary-400"}
              />
            </div>
          </form>
          <div className="flex items-center gap-1 mt-6 text-sm">
            <p className=" text-primary-400">Dont't have an account yet?</p>
            <Link className="text-primary-800 hover:underline" href={"/signup"}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
