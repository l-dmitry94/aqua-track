'use client';
import React, { useEffect, useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';

import { getWaterProcentDay } from '@/helpers/getwaterProcentDay';
import { useWaterStore } from '@/zustand/water/store';

import HeaderMonthInfo from '../HeaderMonthInfo/HeaderMonthInfo';

import BadgeWaterProcent from './BadgeWaterProcent';
import { AllWaterProcentDataType, CustomCalendarProps } from './CustomCalendar.types';

import scss from './CustomCalendar.module.scss';

const CustomCalendar: React.FC<CustomCalendarProps> = ({
    handleDateChange,
    isLoading,
    toggleView,
    isCalendarVisible,
}) => {
    const { data } = useSession();
    const { currentMonthState, monthlyWater } = useWaterStore();
    const [waterProcentData, setWaterProcentData] = useState({});
    const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

    useEffect(() => {
        const allWaterProcentData: AllWaterProcentDataType = {};
        const startOfMonth = dayjs(currentMonthState).startOf('month');
        const endOfMonth = dayjs(currentMonthState).endOf('month');

        // масив усіх днів у місяці
        const allDaysInMonth = [];
        for (
            let day = startOfMonth;
            day.isBefore(endOfMonth.add(1, 'day'));
            day = day.add(1, 'day')
        ) {
            allDaysInMonth.push(day.format('YYYY-MM-DD'));
        }

        const normaDailyWater = data?.user?.volume;
        // тут об'єм води за кожен день
        const waterByDate: Record<string, number[]> = {};

        monthlyWater.forEach((entry) => {
            const date = dayjs(entry.date).format('YYYY-MM-DD');
            if (!waterByDate[date]) {
                waterByDate[date] = [];
            }
            waterByDate[date].push(entry.volume);
        });

        //  відсотки
        Object.keys(waterByDate).forEach((date) => {
            const volumesForDate = waterByDate[date];
            const waterProcent = getWaterProcentDay(volumesForDate, normaDailyWater);
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
    }, [currentMonthState, monthlyWater, data?.user?.volume]);

    const CustomCalendarHeader = (props: any) => (
        <HeaderMonthInfo
            {...props}
            currentMonth={dayjs(currentMonthState)}
            onToggleView={toggleView}
            isCalendarVisible={isCalendarVisible}
        />
    );

    return (
        <DateCalendar
            className={scss.calendar}
            value={dayjs(currentMonthState)}
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
