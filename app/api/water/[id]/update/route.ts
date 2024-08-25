import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { updateWaterEntry } from '../../services';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectMongoDB();

    const userHeader = req.headers.get('X-User');
    if (!userHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { date, volume } = await req.json();

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    if (!date || volume === undefined) {
        return NextResponse.json({ message: 'Date and volume are required' }, { status: 400 });
    }

    const updatedEntry = await updateWaterEntry(id, new Date(date), volume);

    if (!updatedEntry) {
        return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json(updatedEntry);
};
