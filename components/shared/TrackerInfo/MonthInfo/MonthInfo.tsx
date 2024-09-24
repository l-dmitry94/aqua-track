'use client';

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import CustomCharts from './CustomCharts/CustomCharts';
import CustomCalendar from './CustomCalendar';

import scss from './MonthInfo.module.scss';

const MonthInfo = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isCalendarVisible, setIsCalendarVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('date', formattedDate);

        router.push(`/tracker?${queryParams.toString()}`, { scroll: true });
    }, [selectedDate, router]);

    useEffect(() => {
        const fetchData = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        };

        fetchData();
    }, [currentMonth, selectedDate]);

    const handleDateChange = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
    };

    const handleMonthChange = (newMonth: dayjs.Dayjs) => {
        setCurrentMonth(newMonth);
    };

    const toggleView = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component="div" className={scss.boxCalendar}>
                {isCalendarVisible ? (
                    <CustomCalendar
                        selectedDate={selectedDate}
                        handleDateChange={handleDateChange}
                        isLoading={isLoading}
                        toggleView={toggleView}
                        isCalendarVisible={isCalendarVisible}
                        currentMonth={currentMonth}
                    />
                ) : (
                    <CustomCharts
                        currentMonth={currentMonth}
                        onMonthChange={handleMonthChange}
                        onToggleView={toggleView}
                    />
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default MonthInfo;
