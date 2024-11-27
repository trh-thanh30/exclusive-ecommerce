import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiSend,
} from "react-icons/fi";
import ButtonIcon from "./ButtonIcon";
import Input from "./Input";

export default function Footer() {
  return (
    <footer className="py-10 mt-12 text-white bg-black">
      <div className="container grid grid-cols-5 gap-8 px-5 mx-auto">
        <div className="flex flex-col">
          <h2 className="mb-3 text-lg font-semibold">Exclusive</h2>
          <p className="mb-3 text-sm">Subscribe</p>
          <p className="mb-5 text-sm">Get 10% off your first order</p>
          <div className="flex items-center overflow-hidden border border-gray-500 rounded-lg">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 text-sm bg-transparent outline-none text-primary-50"
              icon={<FiSend className="text-white" />}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-3 text-lg font-semibold">Support</h2>
          <p className="mb-3 text-sm">
            111 Nam Du, Hoang Mai, Ha Noi, Viet Nam.
          </p>
          <p className="mb-1 text-sm">exclusive@gmail.com</p>
          <p className="text-sm">+84015-88888-9999</p>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-3 text-lg font-semibold">Account</h2>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-3 text-lg font-semibold">Quick Link</h2>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-3 text-lg font-semibold">Download App</h2>
          <p className="mb-3 text-xs text-primary-400">
            Save $3 with App New User Only
          </p>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://via.placeholder.com/100x100"
              alt="Google Play"
              className="w-20"
            />
            <img
              src="https://via.placeholder.com/100x100"
              alt="App Store"
              className="w-20"
            />
          </div>
          <div className="flex gap-4">
            <FiFacebook className="text-lg cursor-pointer hover:text-gray-400" />
            <FiTwitter className="text-lg cursor-pointer hover:text-gray-400" />
            <FiInstagram className="text-lg cursor-pointer hover:text-gray-400" />
            <FiLinkedin className="text-lg cursor-pointer hover:text-gray-400" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-5 mt-10 text-sm text-center border-t border-gray-500 text-primary-400">
        &copy; Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
}
