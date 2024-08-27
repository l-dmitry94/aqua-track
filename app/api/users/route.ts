import { NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import { allUsers } from './services';

export const GET = async () => {
    await connectMongoDB();
    const users = await allUsers();

    return NextResponse.json(users);
};
