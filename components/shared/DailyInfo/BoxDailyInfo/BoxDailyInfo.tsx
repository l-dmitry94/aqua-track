import React from 'react';
import { Box, List, Typography } from '@mui/material';

import { formatDate, isToday } from '@/helpers/getDate';

import data from '../data.json';

// import { DailyInfoTypes } from '../types';
import ButtonWater from './ButtonWater';
import ItemListDailyInfo from './ItemListDailyInfo';

import scss from './BoxDailyInfo.module.scss';

const BoxDailyInfo: React.FC = () => {
    const dateObj = new Date(data.date);
    const displayDate = isToday(dateObj) ? 'Today' : formatDate(dateObj);

    const items = Object.entries(data.item).map(([key, value]) => ({
        key,
        value,
    }));
    return (
        <Box component="div" className={scss.wrapper}>
            <Box component="div" className={scss.topBox}>
                <Typography component="h3" className={scss.h2}>
                    {displayDate}
                </Typography>

                <ButtonWater />
            </Box>

            <List className={scss.list}>
                {items.map(({ key, value }) => (
                    <ItemListDailyInfo key={key} dataItem={{ key, value }} />
                ))}
            </List>
        </Box>
    );
};

export default BoxDailyInfo;
