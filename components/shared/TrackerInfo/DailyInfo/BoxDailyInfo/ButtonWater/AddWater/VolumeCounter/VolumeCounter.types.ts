import { UseFormSetValue } from 'react-hook-form';

import { FormValues } from '@/components/ui/Form/Form.types';

export interface IVolumeCounter {
    onIncrement: () => void;
    onDecrement: () => void;
    amount: number;
    setValue: UseFormSetValue<FormValues>;
}
