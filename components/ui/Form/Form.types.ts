import { ReactNode } from 'react';
import { FieldErrors, UseControllerProps, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import * as yup from 'yup';

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister extends UserLogin {
    repeatPassword: string;
}

export interface ISettings {
    name?: string;
    email?: string;
    gender: 'woman' | 'man';
    weight?: number;
    activeTime?: number;
    volume?: number;
    image?: string;
    publicId?: string;
}

export type FormValues = UserLogin & UserRegister & ISettings;
export type NameValues = keyof UserLogin & keyof UserRegister & keyof ISettings;

export interface IForm {
    validationSchema?: yup.AnyObjectSchema;
    onSubmit: (data: FormValues) => void;
    children: (
        register: UseFormRegister<FormValues>,
        control: UseControllerProps<FormValues>['control'],
        setValue: UseFormSetValue<FormValues>,
        errors: FieldErrors<FormValues>
    ) => ReactNode;
}
