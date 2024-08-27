import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import { createWaterEntry } from '../services';

export const POST = async (req: NextRequest) => {
    await connectMongoDB();

    const userHeader = req.headers.get('X-User');
    if (!userHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userHeader);

    const { date, volume } = await req.json();

    if (!date || volume === undefined) {
        return NextResponse.json(
            { message: 'Bad Request: Missing required fields' },
            { status: 400 }
        );
    }

    try {
        const waterEntry = await createWaterEntry(user.id, new Date(date), volume);
        return NextResponse.json(waterEntry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
