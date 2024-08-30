import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { deleteWaterEntry } from '../../services';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    try {
        const waterEntry = await deleteWaterEntry(id, user._id);
        if (!waterEntry) {
            return NextResponse.json({ message: 'Entry not found or forbidden' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Entry deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
