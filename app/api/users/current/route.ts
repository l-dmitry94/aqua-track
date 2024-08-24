import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const userHeader = req.headers.get('X-User');

    if (!userHeader) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { name, email } = JSON.parse(userHeader);

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
