import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { findUser } from './users/services';

export const middleware = async (req: NextRequest) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const user = await findUser({ _id: id });

        if (!user || !user.token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const response = NextResponse.next();
        response.headers.set(
            'X-User',
            JSON.stringify({ emai: user.email, name: user.name, id: user._id })
        );

        return response;
    } catch {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
};

export const config = {
    matcher: [
        '/api/users/current',
        '/api/users/logout',
        '/api/water/create',
        '/api/water/[id]/update',
        '/api/water/[id]/delete',
        '/api/water/daily',
        '/api/water/monthly'
    ],
};
