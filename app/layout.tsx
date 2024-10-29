import { FC, ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import Providers from '@/components/Providers';

import '../styles/globals.scss';

export const metadata: Metadata = {
    title: 'Aqua Track',
    description: 'Record daily water intake and track',
};

interface IRootLayout {
    children: ReactNode;
}

const RootLayout: FC<IRootLayout> = async ({ children }) => {
    const session = await getServerSession();
    const locale = await getLocale();

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <Providers session={session}>
                    <NextIntlClientProvider messages={messages}>
                        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                            {children}
                        </AppRouterCacheProvider>
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
