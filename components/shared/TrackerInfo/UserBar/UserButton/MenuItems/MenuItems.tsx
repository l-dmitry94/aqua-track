import React from 'react';
import { MenuItem } from '@mui/material';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import Icon from '@/components/ui/Icon';
import { IconVariant } from '@/components/ui/Icon';

import data from '../../../data.json';

import scss from './MenuItem.module.scss';

interface UserMenuItemsProps {
    handleLogoutClick: () => void;
    handleSettingsClick: () => void;
}

const UserMenuItems: React.FC<UserMenuItemsProps> = ({
    handleLogoutClick,
    handleSettingsClick,
}) => {
    const t = useTranslations('UserBar');

    const menuItems = [
        {
            label: t('settings'),
            icon: data.label1.icon as IconVariant,
            onClick: handleSettingsClick,
        },
        {
            label: t('logout'),
            icon: data.label2.icon as IconVariant,
            onClick: handleLogoutClick,
        },
    ];

    return (
        <>
            {menuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    onClick={item.onClick}
                    className={clsx(scss.menuItem, index === 0 && scss.active)}
                >
                    <Icon variant={item.icon} className={scss.icon} />
                    {item.label}
                </MenuItem>
            ))}
        </>
    );
};

export default UserMenuItems;
