'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import Container from '@/components/ui/Container';

import CustomCharts from '../CustomCharts/CustomCharts';
import HeaderMonthInfo from '../HeaderMonthInfo/HeaderMonthInfo';

import '@/styles/_calendar.scss';

const MonthInfo = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isCalendarVisible, setIsCalendarVisible] = useState(true);
    console.log(selectedDate);
    // Handle date change in the calendar
    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setSelectedDate(date);
    };

    // Change months
    const handleMonthChange = (newMonth: dayjs.Dayjs) => {
        setCurrentMonth(newMonth);
    };

    // Toggle view between calendar and charts
    const toggleView = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    // Create a custom header component that will use props
    const CustomCalendarHeader = (props: any) => (
        <HeaderMonthInfo
            {...props}
            isCalendarVisible={isCalendarVisible}
            onToggleView={toggleView}
        />
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
                <Box sx={{ mt: 3 }}>
                    {isCalendarVisible ? (
                        <DateCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            slots={{ calendarHeader: CustomCalendarHeader }}
                        />
                    ) : (
                        <CustomCharts />
                    )}
                </Box>
            </Container>
        </LocalizationProvider>
    );
};

export default MonthInfo;
