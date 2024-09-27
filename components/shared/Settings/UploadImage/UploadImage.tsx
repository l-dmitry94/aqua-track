import { FC, FormEvent, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import {
    CldUploadButton,
    CloudinaryUploadWidgetInfo,
    CloudinaryUploadWidgetResults,
} from 'next-cloudinary';

import Icon from '@/components/ui/Icon';
import removeAvatar from '@/helpers/removeAvatar';

import { IUploadImage } from './UploadImage.types';

import scss from './UploadImage.module.scss';

const UploadImage: FC<IUploadImage> = ({ avatar, publicId, setValue, isFormSubmitted }) => {
    const [image, setImage] = useState('');
    const [imagePublicId, setImagePublicId] = useState('');

    useEffect(() => {
        if (avatar) {
            setImage(avatar);
            setValue('image', avatar);
        }
    }, [avatar, setValue]);

    useEffect(() => {
        if (publicId) {
            setImagePublicId(publicId);
            setValue('publicId', publicId);
        }
    }, [publicId, setValue]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!isFormSubmitted) {
                event.preventDefault();
                removeAvatar(imagePublicId, setValue, setImage, setImagePublicId);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [imagePublicId, isFormSubmitted, setValue]);

    const handleImageUpload = async (result: CloudinaryUploadWidgetResults) => {
        const info = result.info as CloudinaryUploadWidgetInfo;

        if ('secure_url' in info && 'public_id' in info) {
            setValue('image', info.secure_url);
            setImage(info.secure_url);

            setValue('publicId', info.public_id);
            setImagePublicId(info.public_id);
        }
    };

    const handleBeforeUpload = async () => {
        console.log(imagePublicId);
        removeAvatar(imagePublicId, setValue, setImage, setImagePublicId);
    };

    const removeImage = async (event: FormEvent) => {
        event.stopPropagation();

        removeAvatar(imagePublicId, setValue, setImage, setImagePublicId);
    };

    return (
        <Box component="div" className={scss.wrapper}>
            <CldUploadButton
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleImageUpload}
                onClick={handleBeforeUpload}
                className={scss.uploadButton}
                options={{ maxFiles: 1 }}
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
