import { endOfDay, isValid, parse, startOfDay } from 'date-fns';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export async function GET(request: Request, { params }: { params: { date: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect('/signin');
    }

    const { date } = params;

    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

    if (!isValid(parsedDate)) {
        return NextResponse.json(
            { message: 'Invalid date format. Expected yyyy-MM-dd.' },
            { status: 400 }
        );
    }

    try {
        const startDate = startOfDay(parsedDate);
        const endDate = endOfDay(parsedDate);

        const entries = await prisma.water.findMany({
            where: {
                userId: session.user.id,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        const totalWater = entries.reduce((sum, { volume = 0 }) => sum + volume, 0);

        return NextResponse.json({
            currentDate: date,
            entries,
            totalWater,
        });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
}
