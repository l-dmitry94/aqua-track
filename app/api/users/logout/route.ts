import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

import { updateUser } from '../services';

export const POST = async (req: NextRequest) => {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { _id } = user;

    const token = null;

    await updateUser({ _id }, { token });

    return new NextResponse(null, { status: 204 });
};
