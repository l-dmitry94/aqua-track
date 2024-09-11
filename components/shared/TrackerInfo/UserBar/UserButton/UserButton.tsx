import React from 'react';
import { Box } from '@mui/material';

import Settings from '@/components/shared/Settings';

import Logout from '../Logout';
import { UserBarProps } from '../types';

import UserBarPopover from './UserBarPopover';
import { useUserButton } from './useUserButton';

import scss from './UserButton.module.scss';

const UserButton: React.FC<UserBarProps> = ({ name, image }) => {
    const {
        anchorEl,
        isModalOpen,
        open,
        modalType,
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
            {modalType === 'logout' ? (
                <Logout
                    isModalOpen={isModalOpen}
                    onLogoutConfirm={handleLogoutConfirm}
                    handleModalClose={handleModalClose}
                />
            ) : (
                <Settings isModalOpen={isModalOpen} handleModalClose={handleModalClose}></Settings>
            )}
        </Box>
    );
};

export default UserButton;
