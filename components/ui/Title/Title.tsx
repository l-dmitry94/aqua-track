import { FC, ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import clsx from 'clsx';

import scss from './Title.module.scss';

interface ITitle extends TypographyProps {
    children: ReactNode;
}

const Title: FC<ITitle> = ({ className, children, ...props }) => {
    return (
        <Typography variant="h2" className={clsx(scss.title, className)} {...props}>
            {children}
        </Typography>
    );
};

export default Title;
