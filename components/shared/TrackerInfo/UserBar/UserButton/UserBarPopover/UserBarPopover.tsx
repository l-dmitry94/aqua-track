import React from 'react';
import { Avatar, Box, Menu, Typography } from '@mui/material';
import clsx from 'clsx';

import Icon from '@/components/ui/Icon';

import MenuItems from '../MenuItems';

import { UserBarPopoverProps } from './UserBarPopover.types';

import scss from './UserBarPopover.module.scss';

const UserBarPopover: React.FC<UserBarPopoverProps> = ({
    open,
    anchorEl,
    handleClick,
    handleClose,
    name,
    image,
    handleLogoutClick,
    handleSettingsClick,
}) => {
    return (
        <>
            <Box component="div" onClick={handleClick} className={scss.btn}>
                <Typography component="p" className={scss.text}>
                    {name}
                </Typography>
                <Avatar alt="User Avatar" src={image} />
                <Icon variant={'chevron-down'} className={clsx(scss.svg, open && scss.rotate)} />
            </Box>

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
        </>
    );
};

export default UserBarPopover;
