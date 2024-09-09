import { FC, FormEvent, useState } from 'react';
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

const UploadImage: FC<IUploadImage> = ({ register, avatar, setValue }) => {
    const [image, setImage] = useState<string | null>(avatar || null);
    const [publicId, setPublicId] = useState<string | null>(null);
    
    if(avatar) {
        setValue('image', avatar);
    }

    const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
        const info = result.info as CloudinaryUploadWidgetInfo;

        if ('secure_url' in info && 'public_id' in info) {
            setImage(info.secure_url);
            setPublicId(info.public_id);
            register('image', { value: info.secure_url });
        }
    };

    const removeImage = async (event: FormEvent) => {
        event.preventDefault();

        try {
            if (publicId) {
                const response = await removeAvatar(publicId);

                if (response.status === 200) {
                    setImage(null);
                    setPublicId('');
                    register('image', { value: null });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box component="div" className={scss.wrapper}>
            {image ? (
                <Box component="div" className={scss.defaultImage}>
                    <Image src={image} alt="avatar" className={scss.image} width={75} height={75} />
                    {publicId && (
                        <Box component="button" onClick={removeImage} className={scss.publicId}>
                            <Icon variant="trash" className={scss.trashIcon} />
                        </Box>
                    )}
                </Box>
            ) : (
                <Box component="div" className={scss.defaultImage}>
                    <Icon className={scss.uploadIcon} variant="plus" />
                </Box>
            )}
            <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleImageUpload}
                className={scss.uploadButton}
            >
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
