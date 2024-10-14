import { NextRequest, NextResponse } from 'next/server';

import { getVerificationTokenByToken } from '@/helpers/verificationTokens';
import prisma from '@/prisma/prisma';

export const POST = async (req: NextRequest) => {
    const { token } = await req.json();

    if (!token || typeof token !== 'string') {
        return NextResponse.json({ message: 'Invalid or missing token' }, { status: 400 });
    }

    const existingToken = await getVerificationTokenByToken(token);

    console.log('existingToken', existingToken);

    if (!existingToken) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    console.log('hasExpired', hasExpired);

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

    console.log('existingUser', existingUser);

    const updatedUser = await prisma.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: existingUser.email,
        },
    });

    console.log('updatedUser', updatedUser);

    const deletedToken = await prisma.verificationToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    console.log(deletedToken);

    return NextResponse.json(updatedUser, { status: 200 });
};
