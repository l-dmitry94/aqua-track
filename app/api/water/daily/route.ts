import { NextRequest, NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { getDailyWaterEntries } from '../services';

export const GET = async (req: NextRequest) => {
    await connectMongoDB();
    
    const { pathname } = new URL(req.url);
    const segments = pathname.split('/');
    const userId = segments[segments.length - 1];

    console.log('Received userId:', userId); // Логування отриманого userId

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
        const entries = await getDailyWaterEntries(userId);
        console.log('Entries:', entries); // Логування отриманих записів
        return NextResponse.json(entries);
    } catch (error) {
        console.error('Error fetching daily water entries:', error); // Логування помилок
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
};

