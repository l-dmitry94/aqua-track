import { ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import * as yup from 'yup';

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister extends UserLogin {
    name: string;
}

export type FormValues = UserLogin & UserRegister;
export type NameValues = keyof UserLogin & keyof UserRegister;

export interface UserForm {
    validationSchema?: yup.AnyObjectSchema;
    operation: (data: FormValues) => Promise<void>;
    children: (register: UseFormRegister<FormValues>, errors: FieldErrors<FormValues>) => ReactNode;
}
