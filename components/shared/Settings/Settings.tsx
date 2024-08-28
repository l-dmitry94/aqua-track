'use client';
import { useState } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

import Icon from '@/components/ui/Icon';
import Title from '@/components/ui/Title';
import { defaultImage } from '@/public/images/settings';

import scss from './Settings.module.scss';

const Settings = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        } else {
            setPreview(null);
        }
    };

    return (
        <Box component="div" className={scss.settings}>
            <Title className={scss.title}>Settings</Title>

            <Box component="div">
                <Box component="div" className={scss.imageWrapper}>
                    <Image
                        src={preview || defaultImage}
                        width={100}
                        height={100}
                        alt="User Image"
                        priority
                        className={scss.image}
                    />
                </Box>
                <Box component="label" htmlFor="upload">
                    <Icon variant="upload" className={scss.uploadIcon} />
                    Upload a photo
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={onFileChange}
                        id="upload"
                    />
                </Box>
            </Box>

            <Box component="div">
                <Box component="div"></Box>
                <Box component="div"></Box>
            </Box>
        </Box>
    );
};

export default Settings;
