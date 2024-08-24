import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import { findUserByEmail, registerUser, updateUserToken } from '../services';

export const POST = async (req: NextRequest) => {
    await connectMongoDB();

    const { name, email, password } = await req.json();
    const user = await findUserByEmail(email);

    if (user) return NextResponse.json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUser(name, email, hashedPassword);

    const payload = {
        id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '12h',
    });

    await updateUserToken(newUser._id, token);

    if (!newUser) return NextResponse.json({ message: 'User not created' });

    return NextResponse.json({
        user: {
            name: newUser.name,
            email: newUser.email,
        },
        token,
        message: 'User created successfully',
    });
};
