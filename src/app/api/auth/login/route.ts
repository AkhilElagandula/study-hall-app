// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ApiResponse } from '@/types/types';
import { User } from "@/types/auth.types";
import UserModel from "@/models/User";
import UserSession from '@/models/UserSession';
import { generateAccessToken } from '@/lib/jwt';
import { verifyOtpInternal } from '@/lib/otp/verifyOtp';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body: User = await req.json();
    const { mobile, otp } = body;

    if (!mobile || !otp) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'Mobile number and OTP are required.',
        data: null,
      }, { status: 400 });
    }

    const user = await UserModel.findOne({ mobile });
    if (!user) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'User not found. Please register before logging in.',
        data: null,
      }, { status: 404 });
    }

    // Internal OTP verification logic
    const otpVerification = await verifyOtpInternal(mobile, otp);
    if (!otpVerification.status) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: otpVerification.message,
        data: null,
      }, { status: 401 });
    }

    // Generate Access Token
    const tokenData = await generateAccessToken({
      uId: user._id.toString(),
      mobile: user.mobile,
      name: user.name,
    });

    const clientIP = req.headers.get('x-forwarded-for') ?? 'unknown';
    const userAgent = req.headers.get('user-agent') ?? 'unknown';

    // Store user session
    await UserSession.create({
      mobile,
      userId: user._id.toString(),
      token: tokenData.token,
      expiresAt: tokenData.expiry,
      userAgent,
      ipAddress: clientIP,
    });

    return NextResponse.json<ApiResponse>({
      status: true,
      message: 'User logged in successfully.',
      data: {
        token: tokenData.token,
        expiresAt: tokenData.expiry,
        user: {
          id: user._id,
          name: user.name,
          email: user.email ?? "",
          mobile: user.mobile,
        },
      },
    }, { status: 200 });

  } catch (error) {
    console.error('POST /api/login error:', error);
    return NextResponse.json<ApiResponse>({
      status: false,
      message: 'Something went wrong during login. Please try again later.',
      data: error instanceof Error ? error.message : error,
    }, { status: 500 });
  }
}