import React from 'react';
import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import clsx from 'clsx';

import { BadgeWaterProcentProps } from './BadgeWaterProps.types';

import scss from './BadgeWaterProcent.module.scss';
const BadgeWaterProcent: React.FC<BadgeWaterProcentProps> = ({
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    waterProcentData = {},
    ...other
}) => {
    const dayString = day.format('YYYY-MM-DD');
    const procentValue = waterProcentData[dayString] || 0;

    const isSelected = !outsideCurrentMonth && highlightedDays.includes(day.date());

    return (
        <Badge
            className={clsx(scss.badge, procentValue < 100 && scss.btnGray)}
            sx={{
                width: '28px',
            }}
            key={day.toString()}
            overlap="circular"
            badgeContent={isSelected ? `${procentValue}%` : null}
        >
            <PickersDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                className={scss.pickersDay}
            />
        </Badge>
    );
};

export default BadgeWaterProcent;
