import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ApiResponse } from '@/types/types';
import { User } from '@/types/auth.types';
import UserModel from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body: User = await req.json();
    const { name, mobile, email = "" } = body;

    // Basic validation
    if (!name || !mobile) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'Name and mobile number are required.',
        data: null,
      }, { status: 400 });
    }

    // Optional: basic mobile number format check
    const isValidMobile = /^[6-9]\d{9}$/.test(mobile); // For Indian numbers (example)
    if (!isValidMobile) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'Invalid mobile number format. Please enter a valid 10-digit mobile number.',
        data: null,
      }, { status: 422 });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ mobile });
    if (existingUser) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'A user with this mobile number is already registered.',
        data: {
          userId: existingUser._id,
          name: existingUser.name,
          mobile: existingUser.mobile,
        },
      }, { status: 409 });
    }

    // Create new user
    const newUser = new UserModel({ name, mobile, email });
    await newUser.save();

    return NextResponse.json<ApiResponse>({
      status: true,
      message: 'Registration successful! Welcome aboard.',
      data: {
        userId: newUser._id,
        name: newUser.name,
        mobile: newUser.mobile,
        email: newUser.email
      },
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Error during user registration:', error);
    return NextResponse.json<ApiResponse>({
      status: false,
      message: 'Something went wrong while registering. Please try again later.',
      data: {
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      },
    }, { status: 500 });
  }
}
