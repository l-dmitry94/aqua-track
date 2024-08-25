import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { createWaterEntry } from '../services';

export const POST = async (req: NextRequest) => {
    console.log('POST request received');
    console.log('X-User header:', req.headers.get('X-User')); // Логування X-User

    await connectMongoDB();

    const userHeader = req.headers.get('X-User');
    if (!userHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = JSON.parse(userHeader);
    console.log('Parsed user:', user);

    const { date, volume } = await req.json();
    console.log('Request Data:', { date, volume }); // Логування даних запиту

    if (!date || volume === undefined) {
        return NextResponse.json({ message: 'Bad Request: Missing required fields' }, { status: 400 });
    }

    try {
        const waterEntry = await createWaterEntry(user._id, new Date(date), volume);
        return NextResponse.json(waterEntry, { status: 201 });
    } catch (error) {
        console.error('Error creating water entry:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};