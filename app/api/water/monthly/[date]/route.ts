import { eachDayOfInterval, endOfMonth, format, parse, startOfMonth } from 'date-fns';
import groupBy from 'lodash/groupBy';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export async function GET(request: Request, { params }: { params: { date: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { date } = params;
    const parsedDate = parse(date, 'yyyy-MM', new Date());
    const startDate = startOfMonth(parsedDate);
    const endDate = endOfMonth(parsedDate);

    try {
        const entries = await prisma.water.findMany({
            where: {
                userId: session.user.id,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        const groupedEntries = groupBy(entries, (entry) =>
            format(new Date(entry.date), 'yyyy-MM-dd')
        );
        const dailyWaterIntake = eachDayOfInterval({ start: startDate, end: endDate }).map(
            (day) => {
                const formattedDay = format(day, 'yyyy-MM-dd');
                const totalVolume = (groupedEntries[formattedDay] || []).reduce(
                    (sum, { volume = 0 }) => sum + volume,
                    0
                );

                return {
                    date: formattedDay,
                    totalWater: totalVolume,
                };
            }
        );

        return NextResponse.json(dailyWaterIntake);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
}
