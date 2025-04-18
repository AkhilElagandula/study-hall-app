"use client";
import { useState } from "react";
import { User } from "@/types/auth.types";
import { useLoader } from "@/hooks/useLoader";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import AuthLayout from "./AuthLayout";
import { useSendOtp } from "@/hooks/useSendOtp";
import { toast } from "react-toastify";
import { LoginReq } from "@/services/authService";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const { loading } = useLoader();
  const [user, setUser] = useState<User>({
    mobile: "",
    otp: "",
  });
  const { sendOtp, isOtpSent, setIsOtpSent } = useSendOtp();

  const handleSubmit = async () => {
    if (!user.mobile || !user.otp) {
      toast.error("Please enter all required fields");
      return;
    }
    const req = {
      mobile: user.mobile,
      otp: user.otp,
    };
    const res = await LoginReq(req);
    if (res.status) {
      toast.success(res?.message);
      router.push("/home");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-xl sm:text-xl font-bold text-center mb-4">Login</h2>

      <form className="max-w-[600px] mx-auto px-0 sm:px-12 space-y-5">
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
            onClick={() => sendOtp(user.mobile ?? "", "login")}
          />
        </div>
      )}

      {/* SUBMIT BUTTON */}
      {isOtpSent && (
        <div className="py-4 flex w-[40%] mx-auto flex-col gap-2 justify-center">
          <Button
            type="button"
            variant="rectangle"
            label="Verify OTP & Login"
            loading={loading}
            disabled={!user.mobile || !user.otp}
            onClick={handleSubmit}
          />
          <p className="mt-4 text-[#B8BBC9] text-center text-sm">
            New User? Register Here{" "}
            <Link
              href="/login"
              className="text-yellow-400 font-semibold cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;
