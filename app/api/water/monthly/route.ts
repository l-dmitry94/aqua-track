import { endOfMonth, startOfMonth } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/prisma';

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');
    const parsedDate = new Date(date!);

    const startDate = startOfMonth(parsedDate);
    const endDate = endOfMonth(parsedDate);

    const getDailyWater = await prisma.water.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    return NextResponse.json(getDailyWater);
};
