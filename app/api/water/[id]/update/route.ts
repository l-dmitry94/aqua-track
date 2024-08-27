import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { updateWaterEntry } from '../../services';

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

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
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

    const { id } = params;
    const { date, volume }: { date: string; volume: number } = await req.json();

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    if (!date || volume === undefined) {
        return NextResponse.json({ message: 'Date and volume are required' }, { status: 400 });
    }

    try {
        const updatedEntry = await updateWaterEntry(id, user.id, new Date(date), volume);
        if (!updatedEntry) {
            return NextResponse.json(
                { message: 'Entry not found or user unauthorized' },
                { status: 404 }
            );
        }
        return NextResponse.json(updatedEntry, { status: 200 });
    } catch (error) {
        console.error('Error updating water entry:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
