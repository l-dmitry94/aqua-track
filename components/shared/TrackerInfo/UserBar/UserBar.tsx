import React from 'react';
import { Box, Typography } from '@mui/material';

import { UserBarProps } from './types';
import UserButton from './UserButton';

import scss from './UserBar.module.scss';
const UserBar: React.FC<UserBarProps> = ({ name, image }) => {
    return (
        <Box component="div" className={scss.wrapper}>
            <Typography component="p" className={scss.text}>
                {`Hello`}
                <Typography component="span" className={scss.name}>{`, ${name}`}</Typography>
            </Typography>
            <UserButton name={name} image={image} />
        </Box>
    );
};

export default UserBar;
