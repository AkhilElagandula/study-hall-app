"use client";
import Image from "next/image";
import ContactSection from "../ContactDetails";

interface AuthProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white pt-20 lg:pt-6 min-h-screen">
      <div className="text-center mb-4">
        <Image
          src="/images/mahadev_studyspaces_logo.svg"
          alt="Mahadev Logo"
          width={200}
          height={60}
          className="transparent"
        />
      </div>
      <div className="w-full px-2">
        <div className="mt-3 bg-[#19548D] text-white w-full lg:w-[50%] mx-auto rounded-2xl p-6 relative shadow-md">
          {children}
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default AuthLayout;
