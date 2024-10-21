import { Box } from '@mui/material';

import BoxDailyInfo from './DailyInfo/BoxDailyInfo';
import MonthInfo from './MonthInfo/MonthInfo';
import UserBar from './UserBar';

import scss from './TrackerInfo.module.scss';

const TrackerInfo = () => {
    return (
        <Box component="section" className={scss.boxTrackerInfo}>
            <UserBar />
            <BoxDailyInfo />
            <MonthInfo />
        </Box>
    );
};

export default TrackerInfo;
