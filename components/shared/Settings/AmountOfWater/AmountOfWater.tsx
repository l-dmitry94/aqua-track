import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from '../ProfileData/ProfileData.types';

import fields from './fields';

import scss from './AmountOfWater.module.scss';

const AmountOfWater: FC<IProfileData> = ({ register, errors }) => {
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
                {fields.map(({ name, type, label, placeholder }) => (
                    <Input
                        key={name}
                        register={register}
                        name={name as NameValues}
                        type={type}
                        label={label}
                        placeholder={placeholder}
                        errors={errors}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default AmountOfWater;
