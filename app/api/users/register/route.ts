import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

export const POST = async (req: NextRequest) => {
    const { name, email, password } = await req.json();
    await connectMongoDB();
    await User.create({ name, email, password });
    return NextResponse.json({ message: 'User successfully created' });
};
