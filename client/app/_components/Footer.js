import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Logo from "./Logo";

export default function Footer() {
  const iconStyle =
    "flex items-center justify-center md:w-10 md:h-10 w-8 h-8 transition border rounded-full border-primary-400 hover:bg-primary-50 hover:text-primary-900";
  return (
    <footer className="py-10 text-white md:py-12 bg-neutral-900">
      <div className="px-8 md:px-12">
        <p className="text-xs tracking-widest text-center uppercase md:text-sm text-primary-400">
          The best of luxury brand values, high quality products, and innovative
          services
        </p>

        <h2 className="mt-3 text-base font-bold text-center md:mt-5 md:text-3xl">
          Request More Information
        </h2>
        <p className="max-w-lg mx-auto mt-3 text-xs text-center md:mt-5 md:text-sm text-primary-400">
          Exclusive Media, Exclusive is an innovative ecommerce solutions
          company specializing in developing cutting-edge platforms and tools to
          enhance online shopping experiences
        </p>

        {/* Nút Contact */}
        <div className="my-8 text-center">
          <Link
            href={"/contact"}
            className="py-3 text-sm font-medium transition rounded-full px-7 hover:opacity-90 md:text-base text-primary-900 bg-primary-50">
            Contact Us
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center md:text-sm text-primary-400">
          © {new Date().getFullYear()} Exclusive Media, Inc
        </p>

        <hr className="w-full max-w-6xl mx-auto my-4 md:my-5 border-primary-600" />
        <div className="flex flex-col items-center justify-between w-full gap-6 mt-2 text-sm xl:flex-row">
          <Logo />

          {/* Social Media */}
          <div className="flex gap-4">
            <Link href="#" className={iconStyle}>
              <FaLinkedinIn />
            </Link>
            <Link href="#" className={iconStyle}>
              <FaFacebookF />
            </Link>
            <Link href="#" className={iconStyle}>
              <FaInstagram />
            </Link>
            <Link href="#" className={iconStyle}>
              <FaYoutube />
            </Link>
          </div>
        </div>
        <ul className="flex flex-col items-center justify-center gap-2 mx-auto mt-6 text-xs xl:mt-1 md:flex-row md:gap-11 md:text-sm">
          <li>
            <Link href="#" className="hover:underline">
              Team
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Terms Of Use
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Publications
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
