import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { IVolumeCounter } from './VolumeCounter.types';

import scss from './VolumeCounter.module.scss';

const VolumeCounter: FC<IVolumeCounter> = ({ onIncrement, onDecrement, amount }) => {
    const t = useTranslations('Water');

    return (
        <Box component="div" className={scss.counterWrapper}>
            <Typography variant="body2" className={scss.counterTitle}>
                {t('amountWater')}
            </Typography>
            <Box component="div" className={scss.counter}>
                <button className={scss.btn} type="button" onClick={onDecrement}>
                    <Image src="/icons/minus.svg" alt="minus" width={40} height={40} />
                </button>
                <span className={scss.amount}>{`${amount} ${t('ml')}`}</span>
                <button className={scss.btn} type="button" onClick={onIncrement}>
                    <Image src="/icons/plus.svg" alt="minus" width={40} height={40} />
                </button>
            </Box>
        </Box>
    );
};

export default VolumeCounter;
