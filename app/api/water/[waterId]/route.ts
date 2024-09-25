import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export const PUT = async (req: NextRequest, { params }: { params: { waterId: string } }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect('/signin');
    }

    try {
        const { waterId } = params;
        const body = await req.json();

        const updatedWater = await prisma.water.update({
            where: {
                id: waterId,
            },
            data: {
                ...body,
            },
        });

        return NextResponse.json(updatedWater, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { waterId: string } }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect('/signin');
    }

    try {
        const { waterId } = params;

        const deletedWater = await prisma.water.delete({
            where: {
                id: waterId,
            },
        });
        return NextResponse.json(deletedWater, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
