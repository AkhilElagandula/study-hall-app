// // File: src/app/api/auth/forgot-password/route.ts

// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
// import { randomBytes } from 'crypto';
// import { addMinutes } from 'date-fns';

// export async function POST(req: Request) {
//   const { email } = await req.json();

//   if (!email) {
//     return NextResponse.json({ message: 'Email is required' }, { status: 400 });
//   }

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' });
//   }

//   const token = randomBytes(32).toString('hex');
//   const expires = addMinutes(new Date(), 30);

//   await prisma.verificationToken.create({
//     data: {
//       identifier: email,
//       token,
//       expires,
//     },
//   });

//   const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

//   // MOCK: Replace with real email logic (e.g., using Nodemailer)
//   console.log(`Reset password link for ${email}: ${resetLink}`);

//   return NextResponse.json({
//     message: 'Reset link sent to your email (if it exists).',
//   });
// }
