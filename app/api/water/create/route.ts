import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { createWaterEntry } from '../services';

interface JwtPayload {
    id: string;
}

const SECRET_KEY: string = process.env.JWT_SECRET as string;

const verifyToken = (token: string): Promise<JwtPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err || !decoded) return reject(err);
            resolve(decoded as JwtPayload);
        });
    });
};

export const POST = async (req: NextRequest) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    let user: JwtPayload | null = null;

    try {
        user = await verifyToken(token);
    } catch (error) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { date, volume }: { date: string; volume: number } = await req.json();

    if (!date || volume === undefined) {
        return NextResponse.json(
            { message: 'Bad Request: Missing required fields' },
            { status: 400 }
        );
    }

    try {
        const waterEntry = await createWaterEntry(user.id, new Date(date), volume);
        return NextResponse.json(waterEntry, { status: 201 });
    } catch (error) {
        console.error('Error creating water entry:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
