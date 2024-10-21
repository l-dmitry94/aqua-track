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

                if (user) {
                    const isHashed = password.startsWith('$2a$') || password.startsWith('$2b$');

                    if (isHashed) {
                        if (password === user.password) {
                            return user as User;
                        }
                    } else {
                        if (await bcrypt.compare(password, user.password!)) {
                            return user as User;
                        }
                    }
                }

                return null;
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') {
                return true;
            }

            const existingUser = await prisma.user.findUnique({
                where: {
                    id: user.id ?? '',
                },
            });

            if (!existingUser?.emailVerified) {
                return false;
            }

            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update' && session?.email) {
                token.name = session.name;
                token.email = session.email;
                token.gender = session.gender;
                token.activeTime = session.activeTime;
                token.weight = session.weight;
                token.volume = session.volume;
                token.picture = session.image;
                token.publicId = session.publicId;
            }
            if (user) {
                token.id = user.id;
                token.gender = user.gender;
                token.activeTime = user.activeTime;
                token.weight = user.weight;
                token.volume = user.volume;
                token.publicId = user.publicId;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.gender = token.gender;
            session.user.activeTime = token.activeTime;
            session.user.weight = token.weight;
            session.user.volume = token.volume;
            session.user.publicId = token.publicId;
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
