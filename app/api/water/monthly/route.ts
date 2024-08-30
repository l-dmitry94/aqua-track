import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { getMonthlyWaterEntries } from '../services';

export const GET = async (req: NextRequest) => {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const entries = await getMonthlyWaterEntries(user._id);
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
};
