import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

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

    return NextResponse.json(
        {
            message: 'User registered successfully',
        },
        { status: 201 }
    );
};
