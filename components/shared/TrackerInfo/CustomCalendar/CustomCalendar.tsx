'use client';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import HeaderMonthInfo from '../HeaderMonthInfo/HeaderMonthInfo';

import scss from './CustomCalendar.module.scss';

export default function CalendarHeaderComponent() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
                <DateCalendar
                    slots={{ calendarHeader: HeaderMonthInfo }} //передаємо HeaderMonthInfo
                    dayOfWeekFormatter={() => ''} //прибирає дні тижня
                    defaultValue={dayjs()}
                    className={scss.boxCalendar}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
