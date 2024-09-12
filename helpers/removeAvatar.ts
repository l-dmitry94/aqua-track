import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { removeImage } from '@/api/auth.api';
import { FormValues } from '@/components/ui/Form/Form.types';

type IRemoveAvatar = (
    publicId: string,
    setValue: UseFormSetValue<FormValues>,
    setImage: Dispatch<SetStateAction<string>>,
    setImagePublicId: Dispatch<SetStateAction<string>>
) => Promise<void>;

const removeAvatar: IRemoveAvatar = async (publicId, setValue, setImage, setImagePublicId) => {
    if (publicId) {
        const response = await removeImage(publicId);

        if (response.status === 200) {
            setValue('image', '');
            setImage('');
            setValue('publicId', '');
            setImagePublicId('');
        }
    }
};

export default removeAvatar;
