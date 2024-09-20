import React from 'react';
import { Badge } from '@mui/material';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Dayjs } from 'dayjs';

import scss from './BadgeWaterProcent.module.scss';

const BadgeWaterProcent = (
    props: PickersDayProps<Dayjs> & { highlightedDays?: number[]; waterProcentData?: any }
) => {
    const { highlightedDays = [], day, outsideCurrentMonth, waterProcentData, ...other } = props;

    const dayString = day.format('YYYY-MM-DD');
    const procentValue = waterProcentData[dayString] || 0;

    const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

    return (
        <Badge
            className={scss.badge}
            sx={{
                width: '28px',
            }}
            key={day.toString()}
            overlap="circular"
            badgeContent={isSelected ? `${procentValue}%` : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
};

export default BadgeWaterProcent;
