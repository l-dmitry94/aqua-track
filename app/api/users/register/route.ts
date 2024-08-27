import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import { findUser, registerUser, updateUser } from '../services';

export const POST = async (req: NextRequest) => {
    await connectMongoDB();

    const { name, email, password } = await req.json();
    const user = await findUser({ email });

    if (user) return NextResponse.json({ message: 'User already exists' }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUser({ name, email, password: hashedPassword });

    const payload = {
        id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '12h',
    });

    await updateUser({ _id: newUser._id }, { token });

    if (!newUser) return NextResponse.json({ message: 'User not created' }, { status: 500 });

    return NextResponse.json(
        {
            user: {
                name: newUser.name,
                email: newUser.email,
            },
            token,
            message: 'User created successfully',
        },
        { status: 201 }
    );
};
