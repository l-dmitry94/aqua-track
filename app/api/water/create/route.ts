import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { createWaterEntry } from '../services';

export const POST = async (req: NextRequest) => {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { date, volume }: { date: string; volume: number } = await req.json();

    if (!date || volume === undefined) {
        return NextResponse.json(
            { message: 'Bad Request: Missing required fields' },
            { status: 400 }
        );
    }

    try {
        const waterEntry = await createWaterEntry(user._id, new Date(date), volume);
        return NextResponse.json(waterEntry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
