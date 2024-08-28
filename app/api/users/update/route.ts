import { NextRequest, NextResponse } from 'next/server';

import cloudinary from '@/lib/cloudinary';
import { authenticate } from '@/middlewares/authenticate';

import { updateUser } from '../services';

export const PATCH = async (req: NextRequest) => {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { _id } = user;

    const formData = await req.formData();
    const avatar = formData.get('avatar') as File;
    if (formData.getAll('avatar').length > 1) {
        return NextResponse.json(
            { message: 'Only one image can be uploaded for avatar' },
            { status: 400 }
        );
    }
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
                .upload_stream(
                    { folder: 'aqua-track/avatars', public_id: _id },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                )
                .end(buffer);
        });

        avatarUrl = uploadResponse.secure_url;
    }

    const userData = await updateUser({ _id }, { ...rest, avatar: avatarUrl });

    if (!userData) {
        return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json(
        {
            message: 'User updated successfully',
            user: {
                name: userData.name,
                email: userData.email,
                gender: userData.gender,
                weight: userData.weight,
                activeTime: userData.activeTime,
                waterIntake: userData.waterIntake,
                avatar: userData.avatar,
            },
        },
        { status: 200 }
    );
};
