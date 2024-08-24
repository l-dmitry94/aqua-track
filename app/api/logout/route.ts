import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

export const POST = async (req: NextRequest) => {
    await connectMongoDB();

    return NextResponse.json(req);
};
