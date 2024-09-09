import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { getMonthlyWaterEntries } from '../services';

export const GET = async (req: NextRequest) => {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const month = req.nextUrl.searchParams.get('month');
    const year = req.nextUrl.searchParams.get('year');

    if (!month || !year) {
        return NextResponse.json(
            { message: 'Month and year parameters are required' },
            { status: 400 }
        );
    }

    try {
        const entries = await getMonthlyWaterEntries(user._id, month, year);

        return NextResponse.json({
            selectedMonth: `${year}-${month}`,
            entries,
        });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
};
