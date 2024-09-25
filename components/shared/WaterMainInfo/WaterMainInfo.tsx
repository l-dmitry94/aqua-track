import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import {
    AddWaterButton,
    CustomItemBox,
    ProgressBar,
} from '@/components/shared/WaterMainInfo/index';
import AuthWrapper from '@/components/shared/Welcome/AuthWrapper';

import BG_IMG from '../../../public/images/bottle_bg.png';

import styles from './water-main-info.module.scss';

const WaterMainInfo = () => {
    return (
        <AuthWrapper backgroundColor="green" fullHeight={true}>
            <Box component="div" className={styles.box}>
                <CustomItemBox className="mt-[78px]">
                    <Typography className="mb-[6px] text-[14px] font-bold leading-[1]">
                        1.5 L
                    </Typography>
                    <Typography className="text-[10px] font-normal leading-[1]">
                        My daily norma
                    </Typography>
                </CustomItemBox>
                <Image src={BG_IMG} alt={'bg'} className={styles.img} />
                <CustomItemBox className="absolute left-1/2 top-1/2 translate-x-[-50%]">
                    <ProgressBar />
                </CustomItemBox>
                <AddWaterButton />
            </Box>
        </AuthWrapper>
    );
};

export default WaterMainInfo;
