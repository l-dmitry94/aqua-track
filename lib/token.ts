import { nanoid } from 'nanoid';

import { getVerificationTokenByEmail } from '@/helpers/verificationTokens';
import prisma from '@/prisma/prisma';

const generateVerificationToken = async (email: string) => {
    const token = nanoid();

    const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            identifier: email,
            token,
            expires: new Date(expires),
        },
    });

    return verificationToken;
};

export default generateVerificationToken;
