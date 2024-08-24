import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    const user = req.headers.get('X-User-Id');
    console.log(user);
    return NextResponse.json({ user });
};
