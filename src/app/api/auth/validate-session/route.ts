import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
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

    let decoded: string | JwtPayload;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err: unknown) {
      if (err instanceof jwt.TokenExpiredError) {
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

    // Ensure decoded is a JwtPayload
    if (typeof decoded === 'string' || !('uId' in decoded)) {
      return NextResponse.json<ApiResponse>({
        status: false,
        message: 'Invalid token payload.',
        data: null,
      }, { status: 403 });
    }

    const { uId, exp } = decoded as JwtPayload & { uId: string };

    // Check user still exists
    const user = await UserModel.findById(uId);
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
        tokenExpiresAt: new Date((exp ?? 0) * 1000),
      },
    }, { status: 200 });

  } catch (error) {
    console.error('POST /api/auth/validate-session error:', error);
    return NextResponse.json<ApiResponse>({
      status: false,
      message: 'Internal server error',
      data: error instanceof Error ? error.message : 'Unexpected error',
    }, { status: 500 });
  }
}
