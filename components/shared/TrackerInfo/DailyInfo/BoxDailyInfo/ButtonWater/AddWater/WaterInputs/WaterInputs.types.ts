import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { FormValues } from '@/components/ui/Form/Form.types';

export interface IWaterInputs {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    setValue: UseFormSetValue<FormValues>;
    amount: number;
    onSetEmount: any;
    value?: string | number | undefined;
    currentDate: Date;
}