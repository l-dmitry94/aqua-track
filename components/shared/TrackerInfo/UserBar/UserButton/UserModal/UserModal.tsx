'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

import Settings from '@/components/shared/Settings';
import Button from '@/components/ui/Button';
import CustomModal from '@/components/ui/CustomModal';

import { UserModalProps } from './UserModalProps.types';

import scss from './UserModal.module.scss';

const UserModal: React.FC<UserModalProps> = ({ open, onClose, modalType, onLogoutConfirm }) => {
    return (
        <CustomModal
            open={open}
            onClose={onClose}
            title={modalType === 'logout' ? 'Log Out' : 'Settings'}
            variant="primary"
            centerTitle={true}
            profile={modalType === 'settings'}
        >
            {modalType === 'logout' ? (
                <>
                    <Typography component="p" className={scss.text}>
                        Do you really want to leave?
                    </Typography>
                    <Box component={'div'} className={scss.buttons}>
                        <Button onClick={onLogoutConfirm} variant="contained" className={scss.btn}>
                            Log out
                        </Button>
                        <Button onClick={onClose} variant="outlined" className={scss.btn}>
                            Cancel
                        </Button>
                    </Box>
                </>
            ) : (
                <Settings />
            )}
        </CustomModal>
    );
};

export default UserModal;
