import { FC, useEffect } from 'react';
import { Box } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from '../ProfileData/ProfileData.types';

import scss from './AdditionalInfo.module.scss';

const AdditionalInfo: FC<IProfileData> = ({ register, errors, user, setValue }) => {
    const fields = [
        {
            name: 'weight',
            type: 'text',
            label: 'Your weight in kilograms:',
            placeholder: 'Enter your weight',
        },
        {
            name: 'activeTime',
            type: 'text',
            label: 'The time of active participation in sports:',
            placeholder: 'Enter your time of active participation',
        },
    ];

    useEffect(() => {
        if (user?.weight !== undefined) {
            setValue('weight', user.weight);
        }
        if (user?.activeTime !== undefined) {
            setValue('activeTime', user.activeTime);
        }
    }, [user, setValue]);

    return (
        <Box component="div" className={scss.wrapper}>
            {fields.map(({ name, type, label, placeholder }) => (
                <Input
                    key={name}
                    name={name as NameValues}
                    register={register}
                    errors={errors}
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    light
                />
            ))}
        </Box>
    );
};

export default AdditionalInfo;
