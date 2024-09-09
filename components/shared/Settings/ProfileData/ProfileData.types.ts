import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { FormValues, ISettings } from '@/components/ui/Form/Form.types';

export interface IProfileData {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    user?: ISettings | null;
    setValue: UseFormSetValue<FormValues>
}
