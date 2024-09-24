'use client';
import React, { useEffect, useState } from 'react';
import { Box, List, Typography } from '@mui/material';
import { format, isToday, parseISO } from 'date-fns';
import { useSearchParams } from 'next/navigation';

import CustomScrollBar from '@/components/ui/Scrollbar/Srollbar';
import { formatTime } from '@/helpers/formatTime';

import { DailyInfoResponse } from '../types';

import BoxSkeleton from './BoxSkeleton';
import ButtonWater from './ButtonWater';
import ItemListDailyInfo from './ItemListDailyInfo';

import scss from './BoxDailyInfo.module.scss';

const BoxDailyInfo: React.FC<{ data: DailyInfoResponse }> = ({ data }) => {
    const searchParams = useSearchParams();
    const dateParam = searchParams.get('date');
    const date = dateParam ? parseISO(dateParam) : new Date();
    const { entries } = data;

    const displayDate = isToday(date) ? 'Today' : format(date, 'd, MMMM');

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
