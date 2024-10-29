import { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from '../ProfileData/ProfileData.types';

import scss from './AmountOfWater.module.scss';

const AmountOfWater: FC<IProfileData> = ({ register, errors, setValue, user }) => {
    const t = useTranslations('Settings');

    const [weight, setWeight] = useState(user?.weight ?? 0);
    const [activeTime, setActiveTime] = useState(user?.activeTime ?? 0);
    const [gender] = useState(user?.gender ?? 'woman');
    const [volume, setVolume] = useState(user?.volume ?? 0);

    const normalizeVolume = volume / 1000;
    const dailyNormaForWoman = weight * 0.03 + activeTime * 0.4;
    const dailyNormaForMan = weight * 0.04 + activeTime * 0.6;

    const dailyNorma =
        normalizeVolume !== 1.8
            ? gender === 'woman'
                ? dailyNormaForWoman
                : dailyNormaForMan
            : 1.8;

    useEffect(() => {
        if (user) {
            setWeight(user.weight ?? 0);
            setActiveTime(user.activeTime ?? 0);
            setVolume(user.volume ?? 0);
            setValue('volume', user.volume ? user.volume / 1000 : 0);
        }
    }, [user, setValue]);

    return (
        <Box component="div" className={scss.wrapper}>
            <Box component="div" className={scss.amount}>
                <Typography variant="body2" className={scss.title}>
                    {t('volumeRequired')}
                </Typography>
                <Typography variant="body2" className={scss.text}>
                    {`${dailyNorma.toFixed(1)} ${t('volumeLetter')}`}
                </Typography>
            </Box>

            <Box component="div" className={scss.inputWrapper}>
                <Input
                    register={register}
                    name={'volume' as NameValues}
                    type="text"
                    label={t('volumeText')}
                    placeholder={t('volumePlaceholder')}
                    errors={errors}
                />
            </Box>
        </Box>
    );
};

export default AmountOfWater;
