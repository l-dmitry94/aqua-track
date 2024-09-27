'use client';
import React, { useEffect, useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';

import { getWaterProcentDay } from '@/helpers/getwaterProcentDay';

import data from '../../data.json';
import HeaderMonthInfo from '../HeaderMonthInfo/HeaderMonthInfo';

import BadgeWaterProcent from './BadgeWaterProcent';
import { AllWaterProcentDataType, CustomCalendarProps } from './CustomCalendar.types';

import scss from './CustomCalendar.module.scss';

const CustomCalendar: React.FC<CustomCalendarProps> = ({
    selectedDate,
    handleDateChange,
    isLoading,
    toggleView,
    isCalendarVisible,
}) => {
    const [waterProcentData, setWaterProcentData] = useState({});
    const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
    const searchParams = useSearchParams();
    const dateParam = searchParams.get('date');
    const currentMonth = dateParam ? format(new Date(dateParam), 'MM') : format(new Date(), 'MM');
    console.log(currentMonth);

    useEffect(() => {
        const allWaterProcentData: AllWaterProcentDataType = {};
        const startOfMonth = dayjs(currentMonth).startOf('month');
        const endOfMonth = dayjs(currentMonth).endOf('month');

        // масив усіх днів у місяці
        const allDaysInMonth = [];
        for (
            let day = startOfMonth;
            day.isBefore(endOfMonth.add(1, 'day'));
            day = day.add(1, 'day')
        ) {
            allDaysInMonth.push(day.format('YYYY-MM-DD'));
        }

        // відсотки для днів, для яких є дані
        data.entries.forEach((entry) => {
            const date = dayjs(entry.date).format('YYYY-MM-DD');
            const volumes = data.entries
                .filter((item) => item.date === date)
                .map((item) => item.volume);
            const waterProcent = getWaterProcentDay(volumes, data.normaDailyWater);
            allWaterProcentData[date] = waterProcent;
        });

        // дні, яких немає, з відсотком 0
        allDaysInMonth.forEach((date) => {
            if (!allWaterProcentData[date]) {
                allWaterProcentData[date] = 0;
            }
        });

        setWaterProcentData(allWaterProcentData);

        const daysWithData: string[] = Object.keys(allWaterProcentData);
        setHighlightedDays(daysWithData.map((date) => dayjs(date).date())); // саме тут кладуться всі дні
    }, [currentMonth]);

    const CustomCalendarHeader = (props: any) => (
        <HeaderMonthInfo
            {...props}
            onToggleView={toggleView}
            isCalendarVisible={isCalendarVisible}
        />
    );

    return (
        <DateCalendar
            className={scss.calendar}
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
            slots={{ calendarHeader: CustomCalendarHeader, day: BadgeWaterProcent }}
            slotProps={{
                day: {
                    highlightedDays,
                    waterProcentData,
                } as any,
            }}
            renderLoading={() => <DayCalendarSkeleton />}
            loading={isLoading}
        />
    );
};

export default CustomCalendar;
