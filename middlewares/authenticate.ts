import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

import { findUser } from '@/app/api/users/services';
import { connectMongoDB } from '@/lib/mongodb';

export const authenticate = async (req: NextRequest) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return null;
    }

    await connectMongoDB();

    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await findUser({ _id: id });

    if (!user || !user.token) {
        return null;
    }

    return user;
};
