"use client";

import { HiPhone } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const isUserLoggedIn = false;
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleClickProfile = () => setMenuOpen((prev) => !prev);
  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <div className="fixed top-0 md:h-14 left-0 w-full z-50 bg-[#15549A] text-white text-sm">
      <div className="p-3 flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-y-0">
        {/* Left: Phone and Email */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <HiPhone className="text-white text-sm" />
            <span>+91 98498 62696</span>
          </div>
          <div className="flex items-center space-x-1">
            <MdEmail className="text-white text-base" />
            <span className="break-all text-center sm:text-left">
              MahadevStudySpaces@gmail.com
            </span>
          </div>
        </div>

        {/* Right: Login/New User OR Profile */}
        {!isUserLoggedIn ? (
          <div className="flex items-center space-x-2">
            <FiLogIn className="text-[#FBD962] text-base" />
            <Link
              href="/login"
              className="text-[#FBD962] hover:underline cursor-pointer"
            >
              Login
            </Link>
            <span className="text-white">|</span>
            <Link href="/register" className="text-white hover:underline">
              New User?
            </Link>
          </div>
        ) : (
          <div
            className="relative flex items-center"
            ref={profileMenuRef}
          >
            <button
              onClick={handleClickProfile}
              className="flex flex-row items-center space-x-3 focus:outline-none"
            >
              <span className="text-[#fff] font-semibold text-base">
                {"Akhil"}
              </span>
              <span className="text-3xl pb-1">|</span>
              <div className="pb-0.5 flex flex-row cursor-pointer items-center">
                <Image
                  src="/images/avatar.svg"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-[#fff] text-xl ml-2 relative flex justify-center">
                  <Image
                    src={
                      menuOpen
                        ? "/images/profile_up_arrow.svg"
                        : "/images/profile_down_arrow.svg"
                    }
                    alt="Profile Toggle Arrow"
                    width={15}
                    height={15}
                  />
                </span>
              </div>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mr-3 w-56 mt-32 bg-white shadow-lg border border-gray-300 z-50"
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.16)",
                }}
              >
                <button className="flex items-center py-3 px-5 text-sm hover:bg-[#15549A] border-b border-gray-300 w-full cursor-pointer">
                  <span className="font-medium text-[#FBD962]">
                    Change Password
                  </span>
                </button>
                <button
                  className="flex items-center py-3 px-5 text-base hover:bg-[#15549A] w-full text-left cursor-pointer"
                  onClick={handleLogout}
                >
                  <Image
                    src="/images/logout.svg"
                    alt="Logout"
                    className="mr-3 text-lg"
                    width={20}
                    height={20}
                  />
                  <span className="text-[#FBD962]">Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}