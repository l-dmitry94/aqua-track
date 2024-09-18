import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';

import Container from '@/components/ui/Container';

import scss from './Auth.module.scss';

interface IAuth {
    children: ReactNode;
}

const Auth: FC<IAuth> = ({ children }) => {
    return (
        <Box component="section" className={scss.auth}>
            {/* <Container className={scss.container}> */}
            <Box component="div" className={scss.wrapper}>
                <Link href="/" className={scss.link}>
                    AquaTrack
                </Link>
                <Box component="div" className={scss.content}>
                    {children}
                </Box>
            </Box>
            {/* </Container> */}
        </Box>
    );
};

export default Auth;
