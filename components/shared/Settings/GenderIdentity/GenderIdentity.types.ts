import { UseControllerProps, UseFormSetValue } from 'react-hook-form';

import { FormValues } from '@/components/ui/Form/Form.types';

export interface IGenderIdentity {
    control: UseControllerProps<FormValues>['control'];
    gender: 'woman' | 'man';
    setValue: UseFormSetValue<FormValues>;
}
