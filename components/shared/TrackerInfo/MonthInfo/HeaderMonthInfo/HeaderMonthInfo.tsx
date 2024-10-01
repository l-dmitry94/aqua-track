import React from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import Icon from '@/components/ui/Icon';

import { HeaderMonthInfoProps } from './HeaderMonthInfo.types';

import scss from './HeaderMonthInfo.module.scss';

const HeaderMonthInfo: React.FC<HeaderMonthInfoProps> = (props) => {
    const { currentMonth, onMonthChange, isCalendarVisible, onToggleView } = props;
    const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
    const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');

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

                    <Typography className={scss.textDate} variant="body2">
                        {currentMonth.format('MMMM, YYYY')}
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