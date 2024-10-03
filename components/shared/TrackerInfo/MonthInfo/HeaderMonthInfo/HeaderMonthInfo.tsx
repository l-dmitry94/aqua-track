import React from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import dayjs from 'dayjs';

import Icon from '@/components/ui/Icon';
import { useWaterStore } from '@/zustand/water/store';

import { HeaderMonthInfoProps } from './HeaderMonthInfo.types';

import scss from './HeaderMonthInfo.module.scss';

const HeaderMonthInfo: React.FC<HeaderMonthInfoProps> = (props) => {
    const { onMonthChange, isCalendarVisible, onToggleView } = props;

    const { setCurrentMonth, currentMonthState } = useWaterStore();

    const selectNextMonth = () => {
        const newMonth = dayjs(currentMonthState).add(1, 'month');
        onMonthChange(newMonth, 'left');
        setCurrentMonth(newMonth.format('YYYY-MM'));
    };

    const selectPreviousMonth = () => {
        const newMonth = dayjs(currentMonthState).subtract(1, 'month');
        onMonthChange(newMonth, 'right');
        setCurrentMonth(newMonth.format('YYYY-MM'));
    };

    return (
        <Box component="div" className={scss.wrapper}>
            <Typography component="h3" className={scss.title}>
                {isCalendarVisible ? 'Month' : 'Statistics'}
            </Typography>
            <Box component="div" className={scss.buttons}>
                <Box component="div" className={scss.navMonth}>
                    <IconButton onClick={selectPreviousMonth} title="Previous month">
                        <Icon variant="chevron-left" className={clsx(scss.svg, scss.right)} />
                    </IconButton>

                    <Typography id="month" className={scss.textDate} variant="body2">
                        {dayjs(currentMonthState).format('MMMM, YYYY')}
                    </Typography>

                    <IconButton onClick={selectNextMonth} title="Next month">
                        <Icon variant="chevron-left" className={scss.svg} />
                    </IconButton>
                </Box>

                <IconButton onClick={onToggleView}>
                    <Icon
                        variant="pie-chart"
                        className={clsx(scss.svg, isCalendarVisible && scss.active)}
                    />
                </IconButton>
            </Box>
        </Box>
    );
};

export default HeaderMonthInfo;
