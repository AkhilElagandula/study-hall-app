// File: src/app/api/halls/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const halls = await prisma.hall.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(halls);
  } catch (error) {
    console.error('Error fetching halls:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
