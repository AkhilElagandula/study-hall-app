"use client";
import { useState } from "react";
import Image from "next/image";
import { RegisterUser } from "@/types/auth.types";
import { useLoader } from "@/hooks/useLoader";
import Input from "../ui/Input";
import Button from "../ui/Button";

const Register: React.FC = () => {
  const { loading, showLoader, hideLoader } = useLoader();
  const [info, setInfo] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState<number>(0);
  const [user, setUser] = useState<RegisterUser>({
    name: "",
    email: "",
    mobile: "",
    otp: "",
  });

  return (
    <div
      key={resetKey}
      className="flex flex-col items-center justify-center bg-white px-4 py-8 min-h-screen"
    >
      <div className="text-center mb-4">
        <Image
          src="/images/mahadev_studyspaces_logo.svg"
          alt="Mahadev Logo"
          width={200}
          height={60}
          className="transparent"
        />
      </div>

      <div className="mt-3 bg-[#19548D] text-white w-full max-w-[700px] mx-auto rounded-2xl p-4 sm:p-8 relative shadow-md">
        {/* Info Tooltip Box */}
        {info && (
          <div className="absolute right-8 top-[-20px] z-10">
            <div className="relative w-fit bg-yellow-300 text-white font-medium text-sm rounded-lg px-4 py-3 shadow-md">
              <ul className="list-disc list-inside leading-relaxed">
                <li>Enter Full Name</li>
                <li>As per Aadhaar/PAN Card</li>
                <li>Booking is Non-Transferable</li>
                <li>No special characters allowed</li>
              </ul>

              {/* Triangle Pointer */}
              <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-yellow-300" />
            </div>
          </div>
        )}

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Sign Up & Login
        </h2>

        <form className="max-w-[400px] mx-auto px-0 sm:px-12 space-y-5">
          {/* USERNAME with Info */}
          <div className="relative flex flex-row gap-2">
            <Input
              label="USER NAME"
              type="text"
              placeHolder="Username"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              onBlur={(e) => setUser({ ...user, name: e.target.value })}
              maxLength={25}
              required
            />
            <div className="absolute right-[-30px] top-[40px]">
              <Image
                src="/images/info.svg"
                alt="Info Logo"
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={() => setInfo(!info)}
              />
            </div>
          </div>

          {/* EMAIL */}
          <Input
            label="EMAIL"
            type="text"
            placeHolder="Optional"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            onBlur={(e) => setUser({ ...user, email: e.target.value })}
            maxLength={50}
            required
          />

          {/* MOBILE with Send OTP */}
          <div className="relative">
            <Input
              label="MOBILE NUMBER"
              type="text"
              mode="numeric"
              placeHolder="Enter 10 Digit Phone Number"
              minLength={10}
              maxLength={10}
              value={user.mobile}
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              onBlur={(e) => setUser({ ...user, mobile: e.target.value })}
              required
            />
            <div className="absolute right-[-150px] top-3">
              <Button
                type="button"
                variant="rounded"
                label="Send Otp"
                loading={loading}
              />
            </div>
          </div>

          {/* OTP */}
          <Input
            label="OTP"
            type="text"
            mode="numeric"
            placeHolder="Enter OTP"
            minLength={6}
            maxLength={6}
            value={user.otp}
            onChange={(e) => setUser({ ...user, otp: e.target.value })}
            onBlur={(e) => setUser({ ...user, otp: e.target.value })}
            required
          />

          {/* SUBMIT BUTTON */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="rectangle"
              label="Verify OTP & Sign Up"
              loading={loading}
            />
          </div>
        </form>

        <p className="mt-4 text-[#F0F1F7] text-center text-sm">
          Already have an account?{" "}
          <span className="text-yellow-400 font-semibold cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
