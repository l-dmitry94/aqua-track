import { Box } from '@mui/material';

import {
    AddWaterButton,
    CustomItemBox,
    ProgressBar,
} from '@/components/shared/WaterMainInfo/index';

import styles from './water-main-info.module.scss';

const WaterMainInfo = () => {
    return (
        <Box className={styles.box} component="section">
            <h2
                className="text-[18px] font-bold uppercase leading-[1.11] tracking-[-0.01em]"
                style={{ fontFamily: 'Poppins' }}
            >
                Aquatrack
            </h2>
            <CustomItemBox className="mt-[78px]">
                <p className="mb-[6px] text-[14px] font-bold leading-[1]">1.5 L</p>
                <p className="text-[10px] font-normal leading-[1]">My daily norma</p>
            </CustomItemBox>
            <CustomItemBox className="absolute bottom-[120px] left-[50%] translate-x-[-50%]">
                <ProgressBar />
            </CustomItemBox>
            <AddWaterButton />
        </Box>
    );
};

export default WaterMainInfo;
