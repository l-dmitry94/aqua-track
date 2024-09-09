import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from '../ProfileData/ProfileData.types';

import scss from './AmountOfWater.module.scss';

const AmountOfWater: FC<IProfileData> = ({ register, errors, user }) => {
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
                    name={'waterIntake' as NameValues}
                    type="string"
                    label="Write down how much water you will drink:"
                    placeholder="How much water you will drink"
                    errors={errors}
                    defaultValue={user?.volume}
                />
            </Box>
        </Box>
    );
};

export default AmountOfWater;
