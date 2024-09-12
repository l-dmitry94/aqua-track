import { NextResponse } from 'next/server';

import prisma from '@/prisma/prisma';

export const GET = async () => {
    const users = await prisma.user.findMany();

    return NextResponse.json({ users: users.length });
};
