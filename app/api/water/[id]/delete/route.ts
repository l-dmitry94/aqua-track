import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { deleteWaterEntry } from '../../services';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    await connectMongoDB();

    const userHeader = req.headers.get('X-User');
    if (!userHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const user = JSON.parse(userHeader);

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    const waterEntry = await deleteWaterEntry(id, user.id);

    if (!waterEntry) {
        return NextResponse.json({ message: 'Entry not found or forbidden' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Entry deleted successfully' });
};
