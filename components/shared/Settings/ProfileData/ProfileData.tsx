import { FC } from 'react';
import { Box } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from './ProfileData.types';

import scss from './ProfileData.module.scss';

const ProfileData: FC<IProfileData> = ({ register, errors, user }) => {
    const fields = [
        {
            name: 'name',
            type: 'text',
            label: 'Your name',
            defaultValue: user?.name,
            placeholder: 'Enter your name',
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            defaultValue: user?.email,
            placeholder: 'Enter your email',
        },
    ];
    return (
        <Box component="div" className={scss.wrapper}>
            {fields.map(({ name, type, label, placeholder, defaultValue }) => (
                <Input
                    key={name}
                    register={register}
                    name={name as NameValues}
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    errors={errors}
                />
            ))}
        </Box>
    );
};

export default ProfileData;
