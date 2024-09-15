import { Box } from '@mui/material';

import BoxDailyInfo from './DailyInfo/BoxDailyInfo';
import CustomCalendar from './CustomCalendar';
import datas from './data.json';
import UserBar from './UserBar';

import scss from './TrackerInfo.module.scss';

const TrackerInfo = () => {
    return (
        <Box component="section" className={scss.boxTrackerInfo}>
            <UserBar />
            <BoxDailyInfo data={datas} />
            <CustomCalendar />
        </Box>
    );
};

export default TrackerInfo;
