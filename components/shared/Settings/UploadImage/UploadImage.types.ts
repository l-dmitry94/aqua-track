import { UseFormSetValue } from 'react-hook-form';

import { FormValues } from '@/components/ui/Form/Form.types';

export interface IUploadImage {
    setValue: UseFormSetValue<FormValues>;
    avatar?: string;
}
