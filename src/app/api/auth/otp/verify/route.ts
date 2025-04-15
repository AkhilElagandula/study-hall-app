import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ApiResponse } from '@/types/types';
import { verifyOtpInternal } from '@/lib/otp/verifyOtp';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { mobile, otp, ip = "" } = await req.json();

    if (!mobile || !otp) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'Mobile number and OTP are required fields. Please check and try again.',
        data: null,
      }, { status: 400 });
    }

    const result = await verifyOtpInternal(mobile, otp, ip);
    return NextResponse.json<ApiResponse>({
      status: result.status,
      message: result.message,
      data: result.data ?? { attempts: result.attempts, remaining: result.remainingAttempts },
    }, { status: result.code });

  } catch (error) {
    console.error("POST /api/otp/verify error:", error);
    return NextResponse.json<ApiResponse>({
      status: false,
      message: "Oops! Something went wrong while verifying the OTP. Please try again later.",
      data: {
        errorMessage: (error as Error).message || "Unknown error",
      },
    }, { status: 500 });
  }
}