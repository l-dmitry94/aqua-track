import { FC } from 'react';
import { Box } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from '../ProfileData/ProfileData.types';

import fields from './fields';

import scss from './AdditionalInfo.module.scss';

const AdditionalInfo: FC<IProfileData> = ({ register, errors }) => {
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
