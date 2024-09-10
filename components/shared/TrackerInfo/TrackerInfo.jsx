import { Box } from '@mui/material';

import BoxDailyInfo from './DailyInfo/BoxDailyInfo';
import data from './data.json';
import UserBar from './UserBar';

import scss from './TrackerInfo.module.scss';

const TrackerInfo = () => {
    return (
        <Box component="section" className={scss.boxTrackerInfo}>
            <UserBar name={data.name} image={data.image} />
            <BoxDailyInfo data={data} />
            {/* There will be calendar */}
        </Box>
    );
};

export default TrackerInfo;
