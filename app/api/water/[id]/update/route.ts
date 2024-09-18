import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect('/signin');
    }

    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    const { volume }: { volume: number } = await req.json();

    if (!volume) {
        return NextResponse.json({ message: 'Volume is required' }, { status: 400 });
    }

    try {
        const updatedEntry = await prisma.water.update({
            where: {
                id,
                userId: session.user.id,
            },
            data: {
                volume,
            },
        });

        return NextResponse.json(updatedEntry, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
