import { NextRequest, NextResponse } from 'next/server';

import removeImage from '@/helpers/removeAvatar';

export const POST = async (req: NextRequest) => {
    const { publicId } = await req.json();
    console.log(publicId);
    await removeImage(publicId);

    return NextResponse.json({ message: 'image removed' }, { status: 200 });
};
