import { FC, useEffect } from 'react';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

import { NameValues } from '@/components/ui/Form/Form.types';
import Input from '@/components/ui/Input';

import { IProfileData } from '../ProfileData/ProfileData.types';

import scss from './AdditionalInfo.module.scss';

const AdditionalInfo: FC<IProfileData> = ({ register, errors, user, setValue }) => {
    const t = useTranslations('Settings');

    const fields = [
        {
            name: 'weight',
            type: 'text',
            label: t('weightText'),
            placeholder: t('weightPlaceholder'),
        },
        {
            name: 'activeTime',
            type: 'text',
            label: t('activeTimeText'),
            placeholder: t('activeTimePlaceholder'),
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
