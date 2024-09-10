import { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import {
    CldUploadButton,
    CloudinaryUploadWidgetInfo,
    CloudinaryUploadWidgetResults,
} from 'next-cloudinary';

import { removeAvatar } from '@/api/auth.api';
import Icon from '@/components/ui/Icon';

import { IUploadImage } from './UploadImage.types';

import scss from './UploadImage.module.scss';

const UploadImage: FC<IUploadImage> = ({ avatar, setValue }) => {
    const [image, setImage] = useState<string | null>(avatar || null);
    const [publicId, setPublicId] = useState<string | null>(null);

    useEffect(() => {
        if (avatar) {
            setImage(avatar);
            setValue('image', avatar);
        }
    }, [avatar, setValue]);

    useEffect(() => {
        if (avatar) {
            const publicId = avatar.split('/').pop()?.split('.')[0];
            setPublicId(publicId || null);
        }
    }, [avatar, setValue]);

    const handleImageUpload = async (result: CloudinaryUploadWidgetResults) => {
        const info = result.info as CloudinaryUploadWidgetInfo;

        if ('secure_url' in info && 'public_id' in info) {
            const prevPublicId = publicId;
            setImage(info.secure_url);
            setPublicId(info.public_id);
            setValue('image', info.secure_url);

            console.log('Previous publicId:', prevPublicId);
            console.log('New publicId:', info.public_id);
        }
    };

    const removeImage = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (publicId) {
            const response = await removeAvatar(publicId);

            if (response.status === 200) {
                setImage(null);
                setPublicId(null);
                setValue('image', null);
            }
        }
    };

    return (
        <Box component="div" className={scss.wrapper}>
            <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleImageUpload}
                className={scss.uploadButton}
            >
                {image ? (
                    <Box component="div" className={scss.defaultImage}>
                        <Image
                            src={image}
                            alt="avatar"
                            className={scss.image}
                            width={75}
                            height={75}
                            priority
                        />
                        <Box component="div" onClick={removeImage} className={scss.publicId}>
                            <Icon variant="trash" className={scss.trashIcon} />
                        </Box>
                    </Box>
                ) : (
                    <Box component="div" className={scss.defaultImage}>
                        <Icon className={scss.uploadIcon} variant="plus" />
                    </Box>
                )}
                <Box component="div" className={scss.imageWrapper}>
                    <Icon className={scss.uploadIcon} variant="upload" />
                    <Typography component="p" className={scss.text}>
                        Upload a photo
                    </Typography>
                </Box>
            </CldUploadButton>
        </Box>
    );
};

export default UploadImage;
