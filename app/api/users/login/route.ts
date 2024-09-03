import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import { findUser, updateUser } from '../services';

export const POST = async (req: NextRequest) => {
    await connectMongoDB();

    const { email, password } = await req.json();
    const user = await findUser({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ message: 'Email or password is wrong' }, { status: 404 });
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '12h',
    });

    await updateUser({ _id: user._id }, { token });

    return NextResponse.json(
        {
            user: {
                name: user.name,
                email: user.email,
                gender: user.gender,
                weight: user.weight,
                activeTime: user.activeTime,
                waterIntake: user.waterIntake,
                avatar: user.avatar,
                token: token,
            },
        },
        { status: 200 }
    );
};
