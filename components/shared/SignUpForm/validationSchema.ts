import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().matches(/^[a-zA-Z0-9\s_]*$/, "Name can't be empty"),
    email: yup
        .string()
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email address')
        .required(),
    password: yup
        .string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Invalid password')
        .required("Password can't be empty"),
});

export default validationSchema;
