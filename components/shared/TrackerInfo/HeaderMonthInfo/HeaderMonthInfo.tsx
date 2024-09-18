import React, { useState } from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';

import Icon from '@/components/ui/Icon';

import scss from './HeaderMonthInfo.module.scss';

interface HeaderMonthInfoProps extends PickersCalendarHeaderProps<Dayjs> {
    isCalendarVisible: boolean;
    onToggleView: () => void;
}

const HeaderMonthInfo: React.FC<HeaderMonthInfoProps> = (props) => {
    const { currentMonth, onMonthChange, isCalendarVisible } = props;
    const [isCalendar, setIsCalendarVisible] = useState(true);
    console.log(currentMonth);

    const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
    const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');
    const toggleView = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    return (
        <Box component="div" className={scss.wrapper}>
            <Typography component="h3" className={scss.title}>
                {isCalendar || isCalendarVisible ? 'Month' : 'Statistics'}
            </Typography>
            <IconButton onClick={selectPreviousMonth} title="Previous month">
                <Icon variant="chevron-left" className={clsx(scss.svg, scss.right)} />
            </IconButton>

            <Typography className={scss.textDate} variant="body2">
                {currentMonth.format('MMMM, YYYY')}
            </Typography>

            <IconButton onClick={selectNextMonth} title="Next month">
                <Icon variant="chevron-left" className={scss.svg} />
            </IconButton>

            <IconButton onClick={toggleView}>
                <Icon
                    variant="pie-chart"
                    className={clsx(scss.svg, isCalendar || (isCalendarVisible && scss.active))}
                />
            </IconButton>
        </Box>
    );
};

export default HeaderMonthInfo;
