import { NextRequest, NextResponse } from 'next/server';

import { connectMongoDB } from '@/lib/mongodb';

import cloudinary from '../../config/cloudinary';
import { updateUser } from '../services';

export const PATCH = async (req: NextRequest) => {
    await connectMongoDB();

    const userHeader = req.headers.get('X-User');

    if (!userHeader) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { id } = JSON.parse(userHeader);

    const formData = await req.formData();
    const avatar = formData.get('avatar') as File;
    const rest = Object.fromEntries(formData.entries());

    let avatarUrl = null;

    if (avatar) {
        const reader = avatar.stream().getReader();
        const chunks: Uint8Array[] = [];
        let done = false;

        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            if (value) {
                chunks.push(value);
            }
        }

        const buffer = Buffer.concat(chunks);

        const uploadResponse = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: 'aqua-track/avatars', public_id: id }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
                .end(buffer);
        });

        avatarUrl = uploadResponse.secure_url;
    }

    const user = await updateUser({ _id: id }, { ...rest, avatar: avatarUrl });

    if (!user) {
        return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json(
        {
            message: 'User updated successfully',
            user: {
                name: user.name,
                email: user.email,
                gender: user.gender,
                weight: user.weight,
                activeTime: user.activeTime,
                waterIntake: user.waterIntake,
                avatar: user.avatar,
            },
        },
        { status: 200 }
    );
};
