'use client';
import React from 'react';
import { Box } from '@mui/material';

import Settings from '@/components/shared/Settings';
import CustomModal from '@/components/ui/CustomModal';

import Logout from '../Logout';
import { UserBarProps } from '../UserBar.types';

import UserBarPopover from './UserBarPopover';
import { useUserButton } from './useUserButton';

import scss from './UserButton.module.scss';

const UserButton: React.FC<UserBarProps> = ({ name, image }) => {
    const {
        anchorEl,
        isLogoutOpen,
        isSettinsOpen,
        open,
        handleClick,
        handleClose,
        handleLogoutClick,
        handleSettingsClick,
        handleLogoutConfirm,
        handleModalClose,
    } = useUserButton();

    return (
        <Box component="div" className={scss.wrapper}>
            <UserBarPopover
                {...{
                    open,
                    anchorEl,
                    handleClick,
                    handleClose,
                    name,
                    image,
                    handleLogoutClick,
                    handleSettingsClick,
                }}
            />

            <CustomModal
                open={isLogoutOpen}
                onClose={() => handleModalClose()}
                variant="primary"
                title="Log Out"
                centerTitle={true}
            >
                <Logout onLogoutConfirm={handleLogoutConfirm} handleModalClose={handleModalClose} />
            </CustomModal>

            <CustomModal
                open={isSettinsOpen}
                onClose={() => handleModalClose()}
                variant="primary"
                title="Settings"
                profile
            >
                <Settings onCloseModal={handleModalClose} />
            </CustomModal>
        </Box>
    );
};

export default UserButton;
