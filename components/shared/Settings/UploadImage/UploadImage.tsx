import { FC, useState } from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';

import Icon from '@/components/ui/Icon';
import { defaultImage } from '@/public/images/settings';

import { IUploadImage } from './UploadImage.types';

import scss from './UploadImage.module.scss';

const UploadImage: FC<IUploadImage> = ({ register }) => {
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
        <Box component="div" className={scss.wrapper}>
            <Box component="div" className={scss.imageWrapper}>
                <Image
                    src={preview || defaultImage}
                    width={100}
                    height={100}
                    alt="User Image"
                    priority
                    className={clsx(scss.defaultImage, preview && scss.image)}
                />
            </Box>
            <Box component="label" htmlFor="upload" className={scss.label}>
                <Icon variant="upload" className={scss.uploadIcon} />
                Upload a photo
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    {...register('avatar')}
                    onChange={onFileChange}
                    id="upload"
                />
            </Box>
        </Box>
    );
};

export default UploadImage;
