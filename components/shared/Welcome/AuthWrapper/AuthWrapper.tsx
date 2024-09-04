import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';

import scss from './AuthWrapper.module.scss';

interface IAuthWrapper {
    children?: ReactNode;
    backgroundColor?: 'gray' | 'green';
    fullHeight?: boolean;
}

const AuthWrapper: FC<IAuthWrapper> = ({ children, fullHeight, backgroundColor = 'gray' }) => {
    return (
        <Box component="section" className={clsx(scss.logoSection, fullHeight && scss.fullHeight)}>
            <Box component="div" className={clsx(scss.wrapper, scss[backgroundColor])}>
                <Link href="/" className={scss.logo}>
                    AQUATRACK
                </Link>
                {children}
            </Box>
        </Box>
    );
};

export default AuthWrapper;
