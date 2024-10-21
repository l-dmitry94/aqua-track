'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import {
    AddWaterButton,
    CustomItemBox,
    ProgressBar,
} from '@/components/shared/WaterMainInfo/index';
import {
    SkeletonNorma,
    SkeletonProgressBar,
} from '@/components/shared/WaterMainInfo/Skeleton/skeleton';
import AuthWrapper from '@/components/shared/Welcome/AuthWrapper';
import { useWaterStore } from '@/zustand/water/store';

import BG_IMG from '../../../public/images/bottle_bg.png';

import styles from './water-main-info.module.scss';

const WaterMainInfo = () => {
    const { data: session } = useSession();

    const { dailyWater, fetchDailyWater, isLoading, currentDate } = useWaterStore();

    const volume = session?.user?.volume / 1000;

    useEffect(() => {
        fetchDailyWater(currentDate);
    }, [currentDate]);

    const totalWater = dailyWater.reduce((prev, curr) => prev + curr.volume, 0);
    return (
        <AuthWrapper backgroundColor="green" fullHeight={true} className={styles.container}>
            <Box component="div" className={styles.box}>
                {isLoading ? (
                    <SkeletonNorma />
                ) : (
                    <CustomItemBox className="mt-[78px]">
                        <Typography className={styles.dailyNormalValue}>{volume} L</Typography>
                        <Typography className={styles.dailyNormalDescription}>
                            My daily norma
                        </Typography>
                    </CustomItemBox>
                )}
                <Image src={BG_IMG} alt={'bg'} priority className={styles.img} />
                {isLoading ? (
                    <SkeletonProgressBar />
                ) : (
                    <CustomItemBox className={styles.progressBarBox}>
                        <ProgressBar goal={volume} totalWater={totalWater} />
                    </CustomItemBox>
                )}
                <AddWaterButton />
            </Box>
        </AuthWrapper>
    );
};

export default WaterMainInfo;
