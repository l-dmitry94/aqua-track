import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect('/signin');
    }

    const { id } = params;

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    try {
        const deletedEntry = await prisma.water.deleteMany({
            where: {
                id: id,
                userId: session.user.id,
            },
        });

        if (deletedEntry.count === 0) {
            return NextResponse.json(
                { message: 'Entry not found or you do not have permission to delete it' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Entry deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
