import { Box } from '@mui/material';

import BoxDailyInfo from '../DailyInfo/BoxDailyInfo';

import scss from './TrackerInfo.module.scss';

const TrackerInfo = () => {
    return (
        <Box component="section" className={scss.boxTrackerInfo}>
            {/* There will be the user header */}
            <BoxDailyInfo />
            {/* There will be calendar */}
        </Box>
    );
};

export default TrackerInfo;
