import { FC } from 'react';
import { Box } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import fields from './fields';
import { IProfileData } from './ProfileData.types';

import scss from './ProfileData.module.scss';

const ProfileData: FC<IProfileData> = ({ register, errors }) => {
    return (
        <Box component="div" className={scss.wrapper}>
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
    );
};

export default ProfileData;
