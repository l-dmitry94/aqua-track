import { FC } from 'react';
import { Box } from '@mui/material';

import { IIcon } from './Icon.types';

const Icon: FC<IIcon> = ({ variant, className }) => {
    return (
        <Box component="svg" className={className}>
            <Box component="use" href={`/icons/icons.svg#icon-${variant}`}></Box>
        </Box>
    );
};

export default Icon;
