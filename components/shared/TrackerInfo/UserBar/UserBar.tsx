'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import UserButton from './UserButton';

import scss from './UserBar.module.scss';

const UserBar: React.FC = () => {
    const t = useTranslations('UserBar');

    const { data: userInfo } = useSession();
    const image = userInfo?.user?.image;
    const fullName = userInfo?.user?.name ? userInfo.user.name : 'User';
    const firstName = fullName.split(' ')[0]; // тільки перше слово

    // якщо довше ім'я за 15 символів
    const displayName = firstName.length > 15 ? firstName.slice(0, 15) + '...' : firstName;
    return (
        <Box component="div" className={scss.wrapper}>
            <Typography component="p" className={scss.text}>
                {t('hello')}
                <Typography component="span" className={scss.name}>{`, ${displayName}`}</Typography>
            </Typography>
            <UserButton name={displayName} image={image} />
        </Box>
    );
};

export default UserBar;
