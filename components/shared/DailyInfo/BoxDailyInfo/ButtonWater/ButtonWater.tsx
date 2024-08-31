'use client';
import React from 'react';
import { Typography } from '@mui/material';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

import scss from './ButtonWater.module.scss';

const ButtonWater = () => {
    return (
        <Button className={scss.waterBtn}>
            <Icon variant={'plus'} className={scss.svg} />
            <Typography component="p" className={scss.text}>
                Add water
            </Typography>
        </Button>
    );
};

export default ButtonWater;
