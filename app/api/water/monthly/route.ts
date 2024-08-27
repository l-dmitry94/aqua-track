import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import { getMonthlyWaterEntries } from '../services';

export const GET = async (req: NextRequest) => {
    await connectMongoDB();

    try {
        const userHeader = req.headers.get('X-User');

        if (!userHeader) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const user = JSON.parse(userHeader);
        const userId = user.id;

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const entries = await getMonthlyWaterEntries(userId);
        return NextResponse.json(entries);
    } catch (error) {
        console.error('Error fetching monthly water entries:', error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
};
