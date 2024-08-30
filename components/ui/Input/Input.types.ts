import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormValues, NameValues } from '../Form/Form.types';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    name: NameValues;
    type: HTMLInputTypeAttribute;
    register: UseFormRegister<FormValues>;
    errors?: FieldErrors<FormValues>;
    label: string;
    placeholder: string;
    light?: boolean;
}
