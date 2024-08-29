'use client';

import { Box } from '@mui/material';

import Button from '@/components/ui/Button';
import Form from '@/components/ui/Form';
import Title from '@/components/ui/Title';

import AdditionalInfo from './AdditionalInfo';
import DailyNorma from './DailyNorma';
import GenderIdentity from './GenderIdentity';
import ProfileData from './ProfileData';
import UploadImage from './UploadImage';

import scss from './Settings.module.scss';

const Settings = () => {
    return (
        <Form operation={() => {}}>
            {(register, control, errors) => (
                <Box component="div" className={scss.settings}>
                    <Title className={scss.title}>Settings</Title>

                    <UploadImage register={register} />

                    <Box component="div">
                        <Box component="div">
                            <GenderIdentity control={control} />
                            <ProfileData register={register} errors={errors} />
                            <DailyNorma />
                        </Box>

                        <Box component="div">
                            <AdditionalInfo />
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
