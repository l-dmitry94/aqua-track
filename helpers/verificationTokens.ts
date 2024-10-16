import prisma from '@/prisma/prisma';

export const getVerificationTokenByEmail = (email: string) => {
    try {
        const verificationToken = prisma.verificationToken.findFirst({
            where: {
                identifier: email,
            },
        });

        return verificationToken;
    } catch (error) {
        console.log(error);
    }
};

export const getVerificationTokenByToken = (token: string) => {
    try {
        const verificationToken = prisma.verificationToken.findFirst({
            where: {
                token,
            },
        });

        return verificationToken;
    } catch (error) {
        console.log(error);
    }
};
