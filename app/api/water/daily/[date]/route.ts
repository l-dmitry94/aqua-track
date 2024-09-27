import { endOfDay, startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export const GET = async (req: NextRequest, { params }: { params: { date: string } }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { date } = params;

    const startDay = startOfDay(new Date(date!)).toISOString();
    const endDay = endOfDay(new Date(date!)).toISOString();

    try {
        const getDailyWater = await prisma.water.findMany({
            where: {
                userId: session.user.id,
                date: {
                    gte: startDay,
                    lte: endDay,
                },
            },
        });

        return NextResponse.json(getDailyWater);
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
