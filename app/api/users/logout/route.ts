import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import { updateUser } from '../services';

export const POST = async (req: NextRequest) => {
    await connectMongoDB();

    const userHeader = req.headers.get('X-User');

    if (!userHeader) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { id } = JSON.parse(userHeader);

    const token = null;

    await updateUser({ _id: id }, { token });

    return new NextResponse(null, { status: 204 });
};
