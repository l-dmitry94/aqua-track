'use client';

import React from 'react';
import { Avatar, Box, Menu, Typography } from '@mui/material';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useUserButton } from '@/hooks/useUserButton';

import { UserBarProps } from '../types';

import MenuItems from './MenuItems';
import UserModal from './UserModal';

import scss from './UserButton.module.scss';

const UserButton: React.FC<UserBarProps> = ({ name, image }) => {
    const {
        anchorEl,
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
            <Button
                aria-controls={open ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                className={scss.btn}
            >
                <Typography component="p" className={scss.text}>
                    {name}
                </Typography>
                <Avatar alt="User Avatar" src={image} />
                <Icon
                    variant={'chevron-down'}
                    className={`${scss.svg} ${open ? scss.rotate : ''}`}
                />
            </Button>

            <Menu
                className={scss.menu}
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                slotProps={{
                    paper: {
                        style: { width: anchorEl ? anchorEl.clientWidth : 'auto' },
                    },
                }}
            >
                <MenuItems
                    handleLogoutClick={handleLogoutClick}
                    handleSettingsClick={handleSettingsClick}
                />
            </Menu>

            {modalType && (
                <UserModal
                    open={Boolean(modalType)}
                    onClose={handleModalClose}
                    modalType={modalType}
                    onLogoutConfirm={modalType === 'logout' ? handleLogoutConfirm : undefined}
                />
            )}
        </Box>
    );
};

export default UserButton;
