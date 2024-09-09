import { ReactNode } from 'react';
import { FieldErrors, UseControllerProps, UseFormRegister } from 'react-hook-form';
import * as yup from 'yup';

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister extends UserLogin {
    repeatPassword: string;
}

export interface ISettings {
    name: string;
    email: string;
    gender: 'woman' | 'man';
    weight: number;
    activeTime: number;
    waterIntake: number;
    avatar: FileList | null;
}

export type FormValues = UserLogin & UserRegister & ISettings;
export type NameValues = keyof UserLogin & keyof UserRegister;

export interface IForm {
    validationSchema?: yup.AnyObjectSchema;
    onSubmit: (data: FormValues) => void;
    children: (
        register: UseFormRegister<FormValues>,
        control: UseControllerProps<FormValues>['control'],
        errors: FieldErrors<FormValues>
    ) => ReactNode;
}
