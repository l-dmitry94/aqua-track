'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/ui/Button';

import { LogoutProps } from './LogoutProps.types';

import scss from './Logout.module.scss';

const Logout: React.FC<LogoutProps> = ({ onLogoutConfirm, handleModalClose }) => {
    return (
        <Box component="div">
            <Typography component="p" className={scss.text}>
                Do you really want to leave?
            </Typography>
            <Box component={'div'} className={scss.buttons}>
                <Button onClick={onLogoutConfirm} variant="contained" className={scss.btn}>
                    Log out
                </Button>
                <Button onClick={handleModalClose} variant="outlined" className={scss.btn}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default Logout;
