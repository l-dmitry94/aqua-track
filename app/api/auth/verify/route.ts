import { NextRequest, NextResponse } from 'next/server';

import { getVerificationTokenByToken } from '@/helpers/verificationTokens';
import prisma from '@/prisma/prisma';

export const POST = async (req: NextRequest) => {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.json({ message: 'Invalid or missing token' }, { status: 400 });
    }

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return NextResponse.json({ message: 'Token has expired' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: existingToken.identifier,
        },
    });

    if (!existingUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingUser.email,
        },
    });

    await prisma.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return NextResponse.json(updatedUser, { status: 200 });
};
