import { endOfMonth, startOfMonth } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');

    const startMonth = startOfMonth(new Date(date!)).toISOString();
    const endMonth = endOfMonth(new Date(date!)).toISOString();

    try {
        const getMonthlyWater = await prisma.water.findMany({
            where: {
                date: {
                    gte: startMonth,
                    lte: endMonth,
                },
            },
        });

        return NextResponse.json(getMonthlyWater);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
