"use client";

import { HiPhone } from 'react-icons/hi2';
import { MdEmail } from 'react-icons/md';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#15549A] text-white text-sm">
      <div className="p-3 flex flex-col md:flex-row items-center justify-between gap-y-2 md:gap-y-0">
        {/* Left: Phone and Email */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <HiPhone className="text-white text-sm" />
            <span>+91 98498 62696</span>
          </div>
          <div className="flex items-center space-x-1">
            <MdEmail className="text-white text-base" />
            <span className="break-all text-center sm:text-left">MahadevStudySpaces@gmail.com</span>
          </div>
        </div>

        {/* Right: Login and New User */}
        <div className="flex items-center space-x-2">
          <FiLogIn className="text-yellow-300 text-base" />
          <Link href="/login" className="text-yellow-300 hover:underline cursor-pointer">Login</Link>
          <span className="text-white">|</span>
          <Link href="/register" className="text-white hover:underline">New User?</Link>
        </div>
      </div>
    </div>
  );
}