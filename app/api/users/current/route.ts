import { NextRequest, NextResponse } from 'next/server';

import { authenticate } from '@/middlewares/authenticate';

export const GET = async (req: NextRequest) => {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, email } = user;

    return NextResponse.json(
        {
            user: {
                name,
                email,
            },
        },
        { status: 200 }
    );
};
