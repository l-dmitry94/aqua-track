'use client';

import { FC, useState } from 'react';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';

import { update } from '@/api/auth/auth.api';
import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import { FormValues } from '@/components/ui/Form/Form.types';
import CustomScrollBar from '@/components/ui/Scrollbar/Srollbar';

import AdditionalInfo from './AdditionalInfo';
import AmountOfWater from './AmountOfWater';
import DailyNorma from './DailyNorma';
import GenderIdentity from './GenderIdentity';
import ProfileData from './ProfileData';
import { ISettings } from './Settings.types';
import UploadImage from './UploadImage';

import scss from './Settings.module.scss';

const Settings: FC<ISettings> = ({ onCloseModal }) => {
    const { data: session, update: updateSession } = useSession();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = async (data: FormValues) => {
        const normalizeData = {
            ...data,
            activeTime: Number(data.activeTime) || session?.user?.activeTime,
            weight: Number(data.weight) || session?.user?.weight,
            volume: Number(data.volume) * 1000 || session?.user?.volume,
        };

        await update(normalizeData);

        updateSession({ ...session, ...normalizeData });

        setIsFormSubmitted(true);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {(register, control, setValue, errors) => (
                <Box component="div" className={scss.settings}>
                    <CustomScrollBar profile style={{ height: '500px', width: '100%' }}>
                        <UploadImage
                            avatar={session?.user?.image}
                            publicId={session?.user?.publicId}
                            setValue={setValue}
                            isFormSubmitted={isFormSubmitted}
                        />
                        <GenderIdentity
                            control={control}
                            gender={session?.user?.gender}
                            setValue={setValue}
                        />
                        <Box component="div" className={scss.wrapper}>
                            <Box component="div" className={scss.box}>
                                <ProfileData
                                    register={register}
                                    errors={errors}
                                    user={session?.user}
                                    setValue={setValue}
                                />
                                <DailyNorma />
                            </Box>

                            <Box component="div" className={scss.box}>
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

                        <Button onClick={onCloseModal} type="submit" variant="contained">
                            Save
                        </Button>
                    </CustomScrollBar>
                </Box>
            )}
        </Form>
    );
};

export default Settings;
