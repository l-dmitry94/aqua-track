import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { createWaterEntry } from '../services';

export const POST = async (req: NextRequest) => {
    await connectMongoDB();
    const { userId, date, volume } = await req.json();
    const waterEntry = await createWaterEntry(userId, new Date(date), volume);

    return NextResponse.json(waterEntry, { status: 201 });
};