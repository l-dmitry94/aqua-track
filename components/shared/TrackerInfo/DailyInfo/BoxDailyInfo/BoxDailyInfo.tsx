'use client';
import React, { useEffect, useState } from 'react';
import { Box, List, Typography } from '@mui/material';

import CustomScrollBar from '@/components/ui/Scrollbar/Srollbar';
import { formatDate, isTodayDate } from '@/helpers/formatDate';
import { formatTime } from '@/helpers/formatTime';

import { DailyInfoResponse } from '../DailyInfo.types';

import BoxSkeleton from './BoxSkeleton';
import ButtonWater from './ButtonWater';
import ItemListDailyInfo from './ItemListDailyInfo';

import scss from './BoxDailyInfo.module.scss';

const BoxDailyInfo: React.FC<{ data: DailyInfoResponse }> = ({ data }) => {
    const { currentDate, entries } = data;
    const date = new Date(currentDate);
    const displayDate = isTodayDate(date) ? 'Today' : formatDate(date);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an asynchronous request
        const fetchData = () => {
            setTimeout(() => {
                setLoading(false); // Simulate loading completion
            }, 2000);
        };

        fetchData();
    }, []);

    const formattedEntries = entries.map((item) => {
        const dateObj = new Date(item.date);
        const formattedTime = formatTime(dateObj);
        return {
            ...item,
            formattedTime,
        };
    });

    return (
        <Box component="div" className={scss.wrapper}>
            <Box component="div" className={scss.topBox}>
                <Typography component="h3" className={scss.h2}>
                    {displayDate}
                </Typography>
                <ButtonWater />
            </Box>
            {loading ? (
                <BoxSkeleton />
            ) : (
                <CustomScrollBar style={{ maxWidth: '100%', height: 'auto' }}>
                    <List className={scss.list}>
                        {formattedEntries.map((item) => (
                            <ItemListDailyInfo
                                key={item._id}
                                dataItem={{ time: item.formattedTime, volume: item.volume }}
                            />
                        ))}
                    </List>
                </CustomScrollBar>
            )}
        </Box>
    );
};

export default BoxDailyInfo;
