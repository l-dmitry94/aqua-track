'use client';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';

import BoxDailyInfo from './DailyInfo/BoxDailyInfo';
import datas from './data.json';
import UserBar from './UserBar';

import scss from './TrackerInfo.module.scss';

const TrackerInfo = () => {
    const userInfo = useSession();
    const fullName = userInfo.data.user.name ? userInfo.data.user.name : 'User';
    const firstName = fullName.split(' ')[0]; // тільки перше слово

    // якщо довше ім'я за 15 символів
    const displayName = firstName.length > 15 ? firstName.slice(0, 15) + '...' : firstName;
    return (
        <Box component="section" className={scss.boxTrackerInfo}>
            <UserBar name={displayName} image={datas.image} />
            <BoxDailyInfo data={datas} />
            {/* There will be calendar */}
        </Box>
    );
};

export default TrackerInfo;
