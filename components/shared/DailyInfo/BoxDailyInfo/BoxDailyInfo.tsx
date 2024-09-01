'use client';
import React from 'react';
import { Box, List, Typography } from '@mui/material';

import CustomScrollBar from '@/components/ui/Scrollbar/Srollbar';
import { formatDate, isTodayDate } from '@/helpers/formatDate';
import { formatTime } from '@/helpers/formatTime';

import data from '../data.json';
import { DailyInfoResponse } from '../types';

import ButtonWater from './ButtonWater';
import ItemListDailyInfo from './ItemListDailyInfo';

import scss from './BoxDailyInfo.module.scss';

const BoxDailyInfo: React.FC<{ data: DailyInfoResponse }> = () => {
    const { currentDate, entries } = data;
    const date = new Date(currentDate);
    const displayDate = isTodayDate(date) ? 'Today' : formatDate(date);

    return (
        <Box component="div" className={scss.wrapper}>
            <Box component="div" className={scss.topBox}>
                <Typography component="h3" className={scss.h2}>
                    {displayDate}
                </Typography>
                <ButtonWater />
            </Box>
            <CustomScrollBar style={{ maxWidth: '100%', height: 'auto' }}>
                <List className={scss.list}>
                    {entries.map((item) => {
                        const dateObj = new Date(item.date);
                        const formattedTime = formatTime(dateObj);

                        return (
                            <ItemListDailyInfo
                                key={item._id}
                                dataItem={{ time: formattedTime, volume: item.volume }}
                            />
                        );
                    })}
                </List>
            </CustomScrollBar>
        </Box>
    );
};

export default BoxDailyInfo;
