'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { fetchDailyWater } from '@/api/auth.api';
import {
    AddWaterButton,
    CustomItemBox,
    ProgressBar,
} from '@/components/shared/WaterMainInfo/index';
import AuthWrapper from '@/components/shared/Welcome/AuthWrapper';

import BG_IMG from '../../../public/images/bottle_bg.png';

import styles from './water-main-info.module.scss';

const WaterMainInfo = () => {
    const [water, setWater] = useState();

    const date = useMemo(() => new Date(), []);

    const { data: session } = useSession();

    const volume = session?.user?.volume;

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const fetchWater = useCallback(async () => {
        try {
            const formattedDate = formatDate(date);
            const { totalWater } = await fetchDailyWater(formattedDate);
            setWater(totalWater);
            return totalWater;
        } catch (error: any) {
            console.log(error.data.message);
        }
    }, [date]);

    useEffect(() => {
        fetchWater();
    }, [fetchWater]);

    return (
        <AuthWrapper backgroundColor="green" fullHeight={true}>
            <Box component="div" className={styles.box}>
                <CustomItemBox className="mt-[78px]">
                    <Typography className={styles.dailyNormalValue}>{volume} L</Typography>
                    <Typography className={styles.dailyNormalDescription}>
                        My daily norma
                    </Typography>
                </CustomItemBox>
                <Image src={BG_IMG} alt={'bg'} className={styles.img} />
                <CustomItemBox className={styles.progressBarBox}>
                    <ProgressBar goal={volume} totalWater={water ?? 0} />
                </CustomItemBox>
                <AddWaterButton />
            </Box>
        </AuthWrapper>
    );
};

export default WaterMainInfo;
