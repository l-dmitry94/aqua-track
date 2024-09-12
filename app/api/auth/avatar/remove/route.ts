import { NextRequest, NextResponse } from 'next/server';

import cloudinary from '@/lib/cloudinary';

export const POST = async (req: NextRequest) => {
    const { publicId } = await req.json();
    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ message: 'Image removed' }, { status: 200 });
};
