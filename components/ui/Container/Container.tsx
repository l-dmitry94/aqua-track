import { FC, ReactNode } from 'react';
import { Container as MuiContainer } from '@mui/material';

import scss from './Container.module.scss';

interface IContainer {
    children: ReactNode;
}
const Container: FC<IContainer> = ({ children }) => {
    return <MuiContainer className={scss.container}>{children}</MuiContainer>;
};

export default Container;
