import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import { findUser, registerUser, updateUser } from '../services';

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User registration information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

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
