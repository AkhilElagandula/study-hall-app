"use client";

import { SendOtp } from "@/services/authService";
import { useState } from "react";
import { toast } from "react-toastify";

export function useSendOtp() {
    const [isOtpSent, setIsOtpSent] = useState(false);

    const sendOtp = async (mobile: string, puspose: string) => {
        if (!mobile || mobile.length !== 10) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }
        try {
            const res = await SendOtp(mobile, puspose);
            if (res?.status) {
                setIsOtpSent(true);
                toast.success(res.message ?? "SMS Sent Successfully.");
            } else {
                toast.error(
                    res.message ?? "Something went wrong please try again later."
                );
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return {
        sendOtp,
        isOtpSent,
        setIsOtpSent,
    };
}
