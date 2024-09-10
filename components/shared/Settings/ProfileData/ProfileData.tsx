import { FC, useEffect } from 'react';
import { Box } from '@mui/material';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from './ProfileData.types';

import scss from './ProfileData.module.scss';

const ProfileData: FC<IProfileData> = ({ register, errors, user, setValue }) => {
    useEffect(() => {
        if (user?.name !== undefined) {
            setValue('name', user?.name || '');
        }

        if (user?.email !== undefined) {
            setValue('email', user?.email || '');
        }
    }, [setValue, user?.email, user?.name]);
    const fields = [
        {
            name: 'name',
            type: 'text',
            label: 'Your name',
            placeholder: 'Enter your name',
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
        },
    ];
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
