import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { getMonthlyWaterEntries } from '../services';

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

export const GET = async (req: NextRequest) => {
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

    try {
        const entries = await getMonthlyWaterEntries(user.id);
        return NextResponse.json(entries);
    } catch (error) {
        console.error('Error fetching monthly water entries:', error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
};
