import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormValues } from '@/components/ui/Form/Form.types';

export interface IProfileData {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
}
