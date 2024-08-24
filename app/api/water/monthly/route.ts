import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { getMonthlyWaterEntries } from '../services';

export const GET = async (req: NextRequest) => {
    await connectMongoDB();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const entries = await getMonthlyWaterEntries(userId);

    return NextResponse.json(entries);
};
