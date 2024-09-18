import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export const POST = async (req: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { date, volume }: { date: string; volume: number } = await req.json();

    if (!date || volume === undefined) {
        return NextResponse.json(
            { message: 'Bad Request: Missing required fields' },
            { status: 400 }
        );
    }

    try {
        const waterEntry = await prisma.water.create({
            data: {
                userId: session.user.id,
                date: new Date(date),
                volume,
            },
        });

        return NextResponse.json(waterEntry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
