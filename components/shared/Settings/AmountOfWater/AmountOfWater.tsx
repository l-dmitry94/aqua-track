import { FC, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from '../ProfileData/ProfileData.types';

import scss from './AmountOfWater.module.scss';

const AmountOfWater: FC<IProfileData> = ({ register, errors, setValue, user }) => {
    useEffect(() => {
        if (user?.volume) {
            setValue('volume', user?.volume);
        }
    }, [setValue, user?.volume]);

    return (
        <Box component="div" className={scss.wrapper}>
            <Box component="div" className={scss.amount}>
                <Typography variant="body2" className={scss.title}>
                    The required amount of water in liters per day:
                </Typography>
                <Typography variant="body2" className={scss.text}>
                    1.8 L
                </Typography>
            </Box>

            <Box component="div" className={scss.inputWrapper}>
                <Input
                    register={register}
                    name={'volume' as NameValues}
                    type="text"
                    label="Write down how much water you will drink:"
                    placeholder="How much water you will drink"
                    errors={errors}
                />
            </Box>
        </Box>
    );
};

export default AmountOfWater;
