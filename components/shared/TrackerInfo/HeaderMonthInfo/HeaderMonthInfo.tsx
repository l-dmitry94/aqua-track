import * as React from 'react';
import { Box, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import Icon from '@/components/ui/Icon';

import scss from './HeaderMonthInfo.module.scss';

const HeaderMonthInfo = (props: any) => {
    const { currentMonth, onMonthChange } = props;

    const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
    const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
            }}
        >
            <Stack spacing={1} direction="row">
                <IconButton onClick={selectPreviousMonth} title="Previous month">
                    <Icon variant="chevron-left" className={clsx(scss.svg, scss.right)} />
                </IconButton>
            </Stack>
            <Typography className={scss.textDate} variant="body2">
                {currentMonth.format('MMMM, YYYY')}
            </Typography>
            <Stack spacing={1} direction="row">
                <IconButton onClick={selectNextMonth} title="Next month">
                    <Icon variant="chevron-left" className={scss.svg} />
                </IconButton>
            </Stack>
            <svg>
                <use href="/icons/pie-chart.svg"></use>
            </svg>
            {/* <IconButton> */}
            {/* <Icon variant="pie-chart" /> */}
            {/* </IconButton> */}
        </Box>
    );
};

export default HeaderMonthInfo;
