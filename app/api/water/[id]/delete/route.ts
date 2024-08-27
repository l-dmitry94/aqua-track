import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { deleteWaterEntry } from '../../services';

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

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
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

    if (!id) {
        return NextResponse.json({ message: 'Entry ID is required' }, { status: 400 });
    }

    try {
        const waterEntry = await deleteWaterEntry(id, user.id);
        if (!waterEntry) {
            return NextResponse.json({ message: 'Entry not found or forbidden' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting water entry:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
