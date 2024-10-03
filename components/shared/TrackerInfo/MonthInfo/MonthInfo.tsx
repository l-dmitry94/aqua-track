'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { useWaterStore } from '@/zustand/water/store';

import CustomCharts from './CustomCharts/CustomCharts';
import CustomCalendar from './CustomCalendar';

import scss from './MonthInfo.module.scss';

const MonthInfo = () => {
    const {
        currentDate,
        setCurrentDate,
        setCurrentMonth,
        fetchMonthlyWater,
        isLoading,
        currentMonthState,
    } = useWaterStore();
    const [isCalendarVisible, setIsCalendarVisible] = useState(true);
    // const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchMonthlyWater(currentMonthState);
        // setIsLoading(false);
    }, [currentMonthState, fetchMonthlyWater]);

    const handleDateChange = (date: dayjs.Dayjs) => {
        setCurrentDate(dayjs(date).format('YYYY-MM-DD'));
    };

    const handleMonthChange = (newMonth: dayjs.Dayjs) => {
        setCurrentMonth(newMonth.format('YYYY-MM-DD'));
    };

    const toggleView = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component="div" className={scss.boxCalendar}>
                {isCalendarVisible ? (
                    <CustomCalendar
                        selectedDate={dayjs(currentDate)}
                        handleDateChange={handleDateChange}
                        isLoading={isLoading}
                        toggleView={toggleView}
                        isCalendarVisible={isCalendarVisible}
                    />
                ) : (
                    <CustomCharts onMonthChange={handleMonthChange} ontoggleView={toggleView} />
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default MonthInfo;
