"use client";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import Link from "next/link";
import Logo from "../_components/Logo";
import Input from "../_components/Input";
import ButtonIcon from "../_components/ButtonIcon";
import Separate from "../_components/Separate";
import SpinnerMini from "../_components/SpinnerMini";
import useSignup from "../hooks/useSignup";
import useEyePassword from "../hooks/useEyePassword";
import ImageLeftForm from "../_components/ImageLeftForm";

const iconGooogle = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_155_1565)">
      <path
        d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
        fill="#4285F4"
      />
      <path
        d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.2444 19.252C9.11376 19.252 6.45934 17.1399 5.50693 14.3003H1.51648V17.3912C3.55359 21.4434 7.70278 24.0008 12.24 24.0008Z"
        fill="#34A853"
      />
      <path
        d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
        fill="#FBBC04"
      />
      <path
        d="M12.24 4.74966C13.9508 4.7232 15.6043 5.36697 16.8433 6.54867L20.2694 3.12262C18.1 1.0855 15.2207 -0.034466 12.24 0.000808666C7.70277 0.000808666 3.55359 2.55822 1.51648 6.61481L5.50252 9.70575C6.45052 6.86173 9.10935 4.74966 12.24 4.74966Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0_155_1565">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function Page() {
  const sizeIcon = 22;
  const { isLoading, signup } = useSignup();
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
  
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex items-center w-full gap-12">
        {/* Left Side */}
        <ImageLeftForm />
        {/* Right Side */}
        <div className="flex flex-col items-center justify-center w-1/2 gap-4 p-4 mt-12 bg-white">
          <Logo classname={"my-8"} />
          <h1 className="text-3xl font-medium">Sign Up</h1>
          <p className="text-sm font-medium text-center text-primary-400">
            Let’s create your account and Shop like a pro and save money.
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-6 mt-6">
            <Input
              id={"username"}
              name={"username"}
              type={"text"}
              placeholder={"Please enter your user name"}
              disabled={isLoading}
              icon={<CiUser size={sizeIcon} />}
            />
            <Input
              id={"email"}
              name={"email"}
              type={"email"}
              disabled={isLoading}
              placeholder={"Please enter your email"}
              icon={<CiMail size={sizeIcon} />}
            />
            <Input
              id={"password"}
              name={"password"}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              type={openPassword ? "text" : "password"}
              placeholder={"Please enter your password"}
              icon={
                <div className="flex items-center gap-3">
                  {password ? eyePassword : null}
                  <CiLock size={sizeIcon} />
                </div>
              }
            />

            <div className="mt-6">
              <ButtonIcon
                disabled={isLoading}
                type={"submit"}
                text={isLoading ? <SpinnerMini /> : "Sign Up"}
                className={` text-primary-800 border-primary-400 hover:bg-primary-800 hover:border-primary-800 hover:text-white`}
              />
              <Separate />
              <ButtonIcon
                type={"button"}
                text={"Sign In with Google"}
                icon={iconGooogle}
              />
            </div>
          </form>

          <div className="flex items-center gap-1 mt-6">
            <p className="text-sm text-primary-400 ">
              Already have an account?
            </p>
            <Link className="text-primary-800 hover:underline" href={"/signin"}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
