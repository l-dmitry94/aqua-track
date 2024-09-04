import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { getDailyWaterEntries } from '../services';

export const GET = async (req: NextRequest) => {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const date = req.nextUrl.searchParams.get('date');
    if (!date) {
        return NextResponse.json({ message: 'Date parameter is required' }, { status: 400 });
    }

    try {
        const entries = await getDailyWaterEntries(user._id, date);
        const totalWater = entries.reduce((sum, { volume = 0 }) => sum + volume, 0);

        return NextResponse.json({
            currentDate: date,
            entries,
            totalWater,
        });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
};
