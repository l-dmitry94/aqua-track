import { NextResponse } from 'next/server';

import { allUsers } from './services';

export const GET = async () => {
    const users = await allUsers();

    return NextResponse.json(users);
};
