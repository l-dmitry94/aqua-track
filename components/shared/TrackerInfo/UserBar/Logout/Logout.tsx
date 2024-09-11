'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/ui/Button';
import CustomModal from '@/components/ui/CustomModal';

import { LogoutProps } from './LogoutProps.types';

import scss from './Logout.module.scss';

const Logout: React.FC<LogoutProps> = ({ onLogoutConfirm, isModalOpen, handleModalClose }) => {
    return (
        <CustomModal
            open={isModalOpen}
            onClose={handleModalClose}
            variant="primary"
            title="Log Out"
            centerTitle={true}
        >
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
        </CustomModal>
    );
};

export default Logout;
