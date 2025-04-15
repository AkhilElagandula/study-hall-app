// lib/otp/verifyOtp.ts
import Otp from "@/models/Otp";

export async function verifyOtpInternal(mobile: string, enteredOtp: string, ip: string = "") {
    const otpRecord = await Otp.findOne({ mobile });

    if (!otpRecord) {
        return {
            status: false,
            message: 'No OTP was found for the provided mobile number. Please request a new one.',
            code: 404,
        };
    }

    const now = new Date();
    if (now > otpRecord.expiresAt) {
        return {
            status: false,
            message: 'Your OTP has expired. Please request a new OTP to continue.',
            code: 410,
        };
    }

    if (otpRecord.attempts >= 5) {
        return {
            status: false,
            message: "Too many incorrect attempts. Request a new OTP.",
            attempts: otpRecord.attempts,
            code: 429,
        };
    }

    if (otpRecord.otp !== enteredOtp) {
        otpRecord.attempts += 1;
        await otpRecord.save();
        return {
            status: false,
            message: 'The OTP you entered is incorrect. Please try again.',
            attempts: otpRecord.attempts,
            remainingAttempts: 5 - otpRecord.attempts,
            code: 401,
        };
    }

    otpRecord.verified = true;
    otpRecord.lastVerifiedAt = now;
    otpRecord.verifiedByIp = ip;
    await otpRecord.save();

    return {
        status: true,
        message: "OTP verified successfully.",
        code: 200,
        data: {
            verifiedAt: otpRecord.lastVerifiedAt,
        },
    };
}