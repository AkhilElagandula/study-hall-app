"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth.types";
import { useLoader } from "@/hooks/useLoader";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import AuthLayout from "./AuthLayout";
import { SignUp, VerifyOtp } from "@/services/authService";
import { toast } from "react-toastify";
import { useSendOtp } from "@/hooks/useSendOtp";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { loading } = useLoader();
  const [info, setInfo] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    mobile: "",
    otp: "",
  });
  const { sendOtp, isOtpSent, setIsOtpSent } = useSendOtp();

  const handleSubmit = async () => {
    if (!user.name || !user.mobile || !user.otp) {
      toast.error("Please enter all required fields");
      return;
    }
    const verifyOtpReq = {
      mobile: user.mobile,
      otp: user.otp,
    };
    const verifyOtpRes = await VerifyOtp(verifyOtpReq);
    if (verifyOtpRes.status) {
      toast.success(verifyOtpRes.message);
      const signUpReq = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      };
      const response = await SignUp(signUpReq);
      if (response.status) {
        toast.success(response.message);
        router.push("/login");
      } else {
        toast.error(response.message);
      }
    } else {
      toast.error(verifyOtpRes.message);
    }
  };

  return (
    <AuthLayout>
      {info && (
        <div className="absolute right-0 lg:right-8 top-[-15px] z-10">
          <div className="relative w-fit bg-[#FBD962] text-[#ffffff] font-semibold text-sm rounded-lg px-4 py-3 shadow-xl z-50">
            <ul className="list-disc list-inside leading-relaxed">
              <li>Enter Full Name</li>
              <li>As per Aadhaar/PAN Card</li>
              <li>Booking is Non-Transferable</li>
              <li>No special characters allowed</li>
            </ul>

            {/* Triangle Pointer */}
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#FBD962]" />
          </div>
        </div>
      )}

      <h2 className="text-xl sm:text-xl font-bold text-center mb-4">
        Sign Up & Login
      </h2>

      <form className="max-w-[600px] mx-auto flex flex-col gap-2 sm:px-12">
        {/* USERNAME with Info */}
        <div className="relative m-1.5">
          <Input
            id="username"
            label="USER NAME"
            type="text"
            placeHolder="Username"
            value={user?.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            onBlur={(e) => setUser({ ...user, name: e.target.value })}
            maxLength={25}
            required
          />
          <div className="absolute bg-white right-0 top-[40px] px-2">
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
        <div className="m-1.5">
          <Input
            id="email"
            label="EMAIL"
            type="text"
            placeHolder="Optional"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            onBlur={(e) => setUser({ ...user, email: e.target.value })}
            maxLength={50}
          />
        </div>

        {/* MOBILE with Send OTP */}
        <div className="flex flex-col m-1.5">
          <Input
            id="mobile"
            label="MOBILE NUMBER"
            type="text"
            mode="numeric"
            placeHolder="Enter 10 Digit Phone Number"
            minLength={10}
            maxLength={10}
            value={user.mobile}
            onChange={(e) => {
              setUser({ ...user, mobile: e.target.value, otp: "" });
              setIsOtpSent(false);
            }}
            onBlur={(e) => setUser({ ...user, mobile: e.target.value })}
            required
          />
        </div>

        {/* OTP */}
        {isOtpSent && (
          <div className="m-1.5">
            <Input
              id="otp"
              label="OTP"
              type="text"
              mode="numeric"
              placeHolder="Enter OTP sent via SMS"
              minLength={6}
              maxLength={6}
              value={user.otp}
              onChange={(e) => setUser({ ...user, otp: e.target.value })}
              onBlur={(e) => setUser({ ...user, otp: e.target.value })}
              required
            />
          </div>
        )}
      </form>
      {!isOtpSent && (
        <div className="flex justify-center py-3">
          <Button
            type="button"
            variant="rounded"
            label="Send Otp"
            loading={loading}
            disabled={!user.mobile}
            onClick={() => sendOtp(user.mobile ?? "", 'signup')}
          />
        </div>
      )}
      {/* SUBMIT BUTTON */}
      {isOtpSent && (
        <div className="py-4 flex w-[40%] mx-auto flex-col gap-2 justify-center">
          <Button
            type="button"
            variant="rectangle"
            label="Verify OTP & Sign Up"
            loading={loading}
            disabled={!user.name || !user.mobile || !user.otp}
            onClick={handleSubmit}
          />
          <p className="mt-4 text-[#B8BBC9] text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-yellow-400 font-semibold cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </AuthLayout>
  );
};

export default SignUpForm;
