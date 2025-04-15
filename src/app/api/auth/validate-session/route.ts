import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/User';
import { ApiResponse } from '@/types/types';

const JWT_SECRET = process.env.JWT_SECRET ?? 'MaHaDev#9878@12$';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'Authorization token not provided.',
        data: null,
      }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return NextResponse.json<ApiResponse>({
          status: false,
          message: `Token expired at ${err.expiredAt}`,
          data: null,
        }, { status: 401 });
      }

      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'Invalid token.',
        data: null,
      }, { status: 403 });
    }

    // Check user still exists
    const user = await UserModel.findById(decoded.uId);
    if (!user) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'User not found.',
        data: null,
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      status: true,
      message: 'Token is valid.',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        },
        tokenExpiresAt: new Date(decoded.exp * 1000),
      },
    }, { status: 200 });

  } catch (error) {
    console.error('POST /api/auth/validate-session error:', error);
    return NextResponse.json<ApiResponse>({
      status: false,
      message: 'Internal server error',
      data: error,
    }, { status: 500 });
  }
}