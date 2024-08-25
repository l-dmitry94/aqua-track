import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { getMonthlyWaterEntries } from '../services';

export const GET = async (req: NextRequest) => {
    await connectMongoDB();

    const userHeader = req.headers.get('X-User');
    if (!userHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userHeader);

    try {
        const entries = await getMonthlyWaterEntries(user._id);
        return NextResponse.json(entries);
    } catch (error) {
        console.error('Error fetching monthly water entries:', error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
};
