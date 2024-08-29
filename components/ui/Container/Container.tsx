import { FC } from 'react';
import { Container as MuiContainer, ContainerProps } from '@mui/material';
import clsx from 'clsx';

import scss from './Container.module.scss';

interface IContainer extends ContainerProps {}

const Container: FC<IContainer> = ({ children, className }) => {
    return <MuiContainer className={clsx(scss.container, className)}>{children}</MuiContainer>;
};

export default Container;
