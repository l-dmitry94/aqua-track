import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { findUser } from '../services';

export const GET = async (req: NextRequest) => {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userData = await findUser({ _id: user._id });

    if (!userData) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { name, email, gender, weight, activeTime, waterIntake, avatar } = userData;

    return NextResponse.json(
        {
            user: {
                name,
                email,
                gender,
                weight,
                activeTime,
                waterIntake,
                avatar,
            },
        },
        { status: 200 }
    );
};
