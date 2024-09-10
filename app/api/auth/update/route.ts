import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import prisma from '@/prisma/prisma';

export const PATCH = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.redirect('/signin');
    }

    const body = await req.json();

    try {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                ...body,
            },
        });

        return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating profile' }, { status: 500 });
    }
};
