import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { deleteWaterEntry } from '../../services';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectMongoDB();

    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    const waterEntry = await deleteWaterEntry(id);

    if (!waterEntry) {
        return NextResponse.json({ message: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Entry deleted successfully' });
};
