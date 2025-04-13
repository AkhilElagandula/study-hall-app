// File: src/app/api/bookings/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendBookingEmail } from '@/lib/mailer';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { hallId, date, time } = await req.json();

    if (!hallId || !date || !time) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const hall = await prisma.hall.findUnique({ where: { id: hallId } });
    if (!hall) {
      return NextResponse.json({ message: 'Hall not found' }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        hallId,
        date,
        time,
        user: {
          connect: { email: session.user.email },
        },
      },
    });

    await sendBookingEmail({
      to: session.user.email,
      hallName: hall.name,
      date,
      time,
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
