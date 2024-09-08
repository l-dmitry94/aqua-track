'use client';

import { Box } from '@mui/material';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Title from '@/components/ui/Title';

import AdditionalInfo from './AdditionalInfo';
import AmountOfWater from './AmountOfWater';
import DailyNorma from './DailyNorma';
import GenderIdentity from './GenderIdentity';
import ProfileData from './ProfileData';
import UploadImage from './UploadImage';

import scss from './Settings.module.scss';

const Settings = () => {
    const session = useSession();
    console.log(session);

    return (
        <Form onSubmit={() => {}}>
            {(register, control, errors) => (
                <Box component="div" className={scss.settings}>
                    <Title className={clsx(scss.title, scss.titleSettings)}>Settings</Title>

                    <UploadImage register={register} />

                    <Box component="div" className={scss.wrapper}>
                        <Box component="div">
                            <GenderIdentity control={control} />
                            <ProfileData register={register} errors={errors} />
                            <DailyNorma />
                        </Box>

                        <Box component="div">
                            <AdditionalInfo register={register} errors={errors} />
                            <AmountOfWater register={register} errors={errors} />
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
