import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Otp, { OtpDocument } from '@/models/Otp';
import { generateOtp } from '@/util/RandomNumber';
import { ApiResponse } from '@/types/types';

export async function POST(req: Request) {
  try {
    console.log('getting request');
    await dbConnect();
    const { mobile, channel = 'sms', debug = false } = await req.json();

    if (!mobile) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: "Mobile number is required to generate OTP.",
        data: null,
      }, { status: 400 });
    }

    const otpCode = (await generateOtp(6)).toString();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // OTP valid for 5 minutes

    const existingOtp: OtpDocument | null = await Otp.findOne({ mobile });

    if (existingOtp) {
      existingOtp.otp = otpCode;
      existingOtp.expiresAt = expiresAt;
      existingOtp.lastGeneratedAt = now;
      existingOtp.verified = false;
      existingOtp.attempts = 0;
      existingOtp.channel = channel;

      await existingOtp.save();
    } else {
      await Otp.create({
        mobile,
        otp: otpCode,
        expiresAt,
        lastGeneratedAt: now,
        attempts: 0,
        channel,
      });
    }

    const response: ApiResponse = {
      status: true,
      message: "An OTP has been sent to your mobile number.",
      data: {
        mobile,
        ...(debug && { otp: otpCode }), // Only include OTP in debug/testing mode
        expiresAt,
      },
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    console.error("POST /api/otp error:", error);
    const response: ApiResponse = {
      status: false,
      message: "Something went wrong while generating OTP. Please try again shortly.",
      data: {
        errorMessage: error.message || "Unexpected error",
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
