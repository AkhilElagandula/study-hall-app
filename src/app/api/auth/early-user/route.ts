// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { User } from '@/types/auth.types';
import { ApiResponse } from '@/types/types';
import EarlyUser from '@/models/EarlyUser';
import { appendToGoogleSheet } from '@/util/addToSheet';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body: User = await req.json();
        const { name, mobile, gender } = body;

        if (!name || !mobile || !gender) {
            const response: ApiResponse = {
                status: false,
                message: 'All fields are required.',
                data: null,
            };
            return NextResponse.json(response, { status: 400 });
        }

        const contact = new EarlyUser({ name, mobile, gender });
        const savedContact = await contact.save();
        // Then add to Google Sheet
        await appendToGoogleSheet({
            name: body.name ?? "",
            gender: body.gender ?? "",
            mobile: body.mobile ?? "",
        });

        const response: ApiResponse<typeof savedContact> = {
            status: true,
            message: 'Contact saved successfully',
            data: savedContact,
        };
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('POST /api/contact error:', error);
        const response: ApiResponse = {
            status: false,
            message: 'Internal Server Error',
            data: error,
        };
        return NextResponse.json(response, { status: 500 });
    }
}