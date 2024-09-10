'use client';

import { Box } from '@mui/material';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

import { update } from '@/api/auth.api';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { FormValues } from '@/components/ui/Form/Form.types';
import Title from '@/components/ui/Title';

import AdditionalInfo from './AdditionalInfo';
import AmountOfWater from './AmountOfWater';
import DailyNorma from './DailyNorma';
import GenderIdentity from './GenderIdentity';
import ProfileData from './ProfileData';
import UploadImage from './UploadImage';

import scss from './Settings.module.scss';

const Settings = () => {
    const { data: session, update: updateSession } = useSession();

    console.log(session);

    const handleSubmit = async (data: FormValues) => {
        const normalizeData = {
            ...data,
            activeTime: Number(data.activeTime),
            weight: Number(data.weight),
            volume: Number(data.volume),
        };

        await update(normalizeData);

        updateSession({ ...session, ...data });
    };

    return (
        <Form onSubmit={handleSubmit}>
            {(register, control, setValue, errors) => (
                <Box component="div" className={scss.settings}>
                    <Title className={clsx(scss.title, scss.titleSettings)}>Settings</Title>

                    <UploadImage avatar={session?.user?.image} setValue={setValue} />

                    <Box component="div" className={scss.wrapper}>
                        <Box component="div">
                            <GenderIdentity
                                control={control}
                                gender={session?.user?.gender}
                                setValue={setValue}
                            />
                            <ProfileData
                                register={register}
                                errors={errors}
                                user={session?.user}
                                setValue={setValue}
                            />
                            <DailyNorma />
                        </Box>

                        <Box component="div">
                            <AdditionalInfo
                                register={register}
                                errors={errors}
                                user={session?.user}
                                setValue={setValue}
                            />
                            <AmountOfWater
                                register={register}
                                errors={errors}
                                user={session?.user}
                                setValue={setValue}
                            />
                        </Box>
                    </Box>

                    <Button type="submit" variant="contained">
                        Save
                    </Button>
                </Box>
            )}
        </Form>
    );
};

export default Settings;
