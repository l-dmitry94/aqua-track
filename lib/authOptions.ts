import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { FormValues } from '@/components/ui/Form/Form.types';
import prisma from '@/prisma/prisma';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as FormValues;

                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });

                if (user && (await bcrypt.compare(password, user.password!))) {
                    return user as User;
                }

                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.gender = user.gender;
                token.activeTime = user.activeTime;
                token.weight = user.weight;
                token.volume = user.volume;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.gender = token.gender;
            session.user.activeTime = token.activeTime;
            session.user.weight = token.weight;
            session.user.volume = token.volume;
            return session;
        },
    },

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: '/signin',
    },
};
