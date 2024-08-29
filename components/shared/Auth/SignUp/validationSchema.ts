import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup
        .string()
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address')
        .required(),
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Invalid password')
        .required("Password can't be empty"),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

export default validationSchema;
