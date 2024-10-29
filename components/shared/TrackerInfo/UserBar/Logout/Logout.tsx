'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Button from '@/components/ui/Button';

import { LogoutProps } from './LogoutProps.types';

import scss from './Logout.module.scss';

const Logout: React.FC<LogoutProps> = ({ onLogoutConfirm, handleModalClose }) => {
    const t = useTranslations('Logout');
    return (
        <Box component="div">
            <Typography component="p" className={scss.text}>
                {t('text')}
            </Typography>
            <Box component={'div'} className={scss.buttons}>
                <Button onClick={onLogoutConfirm} variant="contained" className={scss.btn}>
                    {t('logout')}
                </Button>
                <Button onClick={handleModalClose} variant="outlined" className={scss.btn}>
                    {t('cancel')}
                </Button>
            </Box>
        </Box>
    );
};

export default Logout;
