import { FC } from 'react';
import { Box } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from '../ProfileData/ProfileData.types';

import scss from './AdditionalInfo.module.scss';

const AdditionalInfo: FC<IProfileData> = ({ register, errors, user }) => {
    const fields = [
        {
            name: 'weight',
            type: 'string',
            label: 'Your weight in kilograms:',
            defaultValue: user?.weight,
            placeholder: 'Enter your weight',
        },
        {
            name: 'activeTime',
            type: 'string',
            label: 'The time of active participation in sports:',
            defaultValue: user?.activeTime,
            placeholder: 'Enter your time of active participation',
        },
    ];
    return (
        <Box component="div" className={scss.wrapper}>
            {fields.map(({ name, type, label, placeholder, defaultValue }) => (
                <Input
                    key={name}
                    name={name as NameValues}
                    register={register}
                    errors={errors}
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    light
                    defaultValue={defaultValue}
                />
            ))}
        </Box>
    );
};

export default AdditionalInfo;
