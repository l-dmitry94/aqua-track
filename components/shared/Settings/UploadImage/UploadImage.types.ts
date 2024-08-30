import { UseFormRegister } from 'react-hook-form';

import { FormValues } from '@/components/ui/Form/Form.types';

export interface IUploadImage {
    register: UseFormRegister<FormValues>;
}
