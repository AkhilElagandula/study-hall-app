// File: src/services/authService.ts

import { prisma } from '@/lib/db';
import { hash } from 'bcryptjs';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { success: false, message: 'Email already in use' };
    }

    const hashedPassword = await hash(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return { success: true, message: 'Registration successful' };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { success: false, message: 'Something went wrong' };
  }
}
