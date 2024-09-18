import { Box } from '@mui/material';

import BoxDailyInfo from './DailyInfo/BoxDailyInfo';
import datas from './data.json';
import UserBar from './UserBar';

import scss from './TrackerInfo.module.scss';

const TrackerInfo = () => {
    return (
        <Box component="section" className={scss.boxTrackerInfo}>
            <UserBar />
            <BoxDailyInfo data={datas} />
            {/* There will be calendar */}
        </Box>
    );
};

export default TrackerInfo;
