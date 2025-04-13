// File: src/app/api/auth/reset-password/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
  }

  const existingToken = await prisma.verificationToken.findUnique({ where: { token } });

  if (!existingToken || existingToken.expires < new Date()) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: existingToken.identifier } });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.update({
    where: { email: user.email },
    data: { password: hashedPassword },
  });

  await prisma.verificationToken.delete({ where: { token } });

  return NextResponse.json({ message: 'Password reset successful. You can now log in.' });
}
