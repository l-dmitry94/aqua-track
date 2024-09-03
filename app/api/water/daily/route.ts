import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { getDailyWaterEntries } from '../services';

export const POST = async (req: NextRequest) => {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { date } = await req.json();
        const entries = await getDailyWaterEntries(user._id, date);
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
};
