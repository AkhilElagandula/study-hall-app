"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-[95px] md:top-[45px] w-full z-40 bg-white shadow">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/mahadev_studyspaces_logo.svg"
            alt="Mahadev Logo"
            width={120}
            height={40}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-blue-800 font-medium">
          <Link href="/" className="text-[#19548D] hover:underline">Home</Link>
          <Link href="/#" className="text-[#19548D] hover:underline">Book My Cabin</Link>
          <Link href="/#" className="text-[#19548D] hover:underline">StudySpace Locator</Link>
          <Link href="/#" className="text-[#19548D] hover:underline">Contact Us</Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#19548D] text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-sm text-blue-800 font-medium">
          <Link href="/" className="block text-[#19548D] hover:underline">Home</Link>
          <Link href="/#" className="block text-[#19548D] hover:underline">Book My Cabin</Link>
          <Link href="/#" className="block text-[#19548D] hover:underline">StudySpace Locator</Link>
          <Link href="/#" className="block text-[#19548D] hover:underline">Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
