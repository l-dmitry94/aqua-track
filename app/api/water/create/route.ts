import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export const POST = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();

        const newWater = await prisma.water.create({
            data: {
                userId: session.user.id,
                ...body,
            },
        });

        return NextResponse.json(newWater, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
