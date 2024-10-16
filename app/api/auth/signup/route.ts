import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import sendVerificationEmail from '@/lib/mail';
import generateVerificationToken from '@/lib/token';
import prisma from '@/prisma/prisma';

export const POST = async (req: NextRequest) => {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
        return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return NextResponse.json(
        {
            message: 'User registered successfully',
        },
        { status: 201 }
    );
};
