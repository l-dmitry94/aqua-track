import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import '../styles/globals.scss';

export const metadata: Metadata = {
    title: 'Aqua Track',
    description: 'Record daily water intake and track',
};

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '700'],
});

interface IRootLayout {
    children: ReactNode;
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
    return (
        <html lang="en">
            <Box component="body" className={poppins.className}>
                {children}
            </Box>
        </html>
    );
};

export default RootLayout;
