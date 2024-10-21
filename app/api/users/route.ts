import { NextResponse } from 'next/server';

import prisma from '@/prisma/prisma';

export const GET = async () => {
    const users = await prisma.user.findMany();

    const formattedUsers = users.map((user) => {
        return {
            id: user.id,
            image: user.image || null,
        };
    });

    return NextResponse.json(formattedUsers);
};
