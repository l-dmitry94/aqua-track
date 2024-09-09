import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { updateWaterEntry } from '../../services';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const { date, volume }: { date: string; volume: number } = await req.json();

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    try {
        const updatedEntry = await updateWaterEntry(id, user._id, new Date(date), volume);
        if (!updatedEntry) {
            return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
        }
        return NextResponse.json(updatedEntry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
