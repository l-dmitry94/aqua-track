'use client';
import React, { useEffect } from 'react';
import { Box, List, Typography } from '@mui/material';
import { format, isToday, parseISO } from 'date-fns';

import CustomScrollBar from '@/components/ui/Scrollbar/Srollbar';
import { formatTime } from '@/helpers/formatTime';
import { useWaterStore } from '@/zustand/water/store';

import { DailyInfoResponse } from '../DailyInfo.types';

import BoxSkeleton from './BoxSkeleton';
import ButtonWater from './ButtonWater';
import ItemListDailyInfo from './ItemListDailyInfo';

import scss from './BoxDailyInfo.module.scss';

const BoxDailyInfo: React.FC<{ data: DailyInfoResponse }> = () => {
    const { currentDate, fetchDailyWater, isLoading, dailyWater } = useWaterStore();
    const date = currentDate ? parseISO(currentDate) : new Date();
    const showList = dailyWater.length === 0;

    const displayDate = isToday(date) ? 'Today' : format(date, 'd, MMMM');

    useEffect(() => {
        const fetchData = async () => {
            await fetchDailyWater(format(date, 'yyyy-MM-dd'));
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDate]);

    const formattedEntries = dailyWater.map((item) => {
        const formattedTime = formatTime(item.time);
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
            {isLoading ? (
                <BoxSkeleton />
            ) : (
                <CustomScrollBar style={{ maxWidth: '100%', height: 'auto' }}>
                    {showList ? (
                        <Typography component="p" className={scss.text}>
                            No water entries yet
                        </Typography>
                    ) : (
                        <List className={scss.list}>
                            {formattedEntries.map((item) => (
                                <ItemListDailyInfo
                                    key={item.id}
                                    dataItem={{ time: item.formattedTime, volume: item.volume }}
                                />
                            ))}
                        </List>
                    )}
                </CustomScrollBar>
            )}
        </Box>
    );
};

export default BoxDailyInfo;
