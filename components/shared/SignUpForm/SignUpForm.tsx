// import Form, { NameValues } from 'components/ui/Form';
// import Input from 'components/ui/Input';
// import fields from './fields';
// import Button from 'components/ui/Button';
// import validationSchema from './validationSchema';
// import useAuthState from 'store/auth/useAuthState';
// import scss from './RegisterForm.module.scss';

// const RegisterForm = () => {
//   const registerOperation = useAuthState((state) => state.register);
//   return (
//     <Form validationSchema={validationSchema} operation={registerOperation}>
//       {(register, errors) => (
//         <>
//           <div className={scss.wrapper}>
//             {fields.map(({ type, name, placeholder }) => (
//               <Input
//                 key={name}
//                 register={register}
//                 type={type}
//                 errors={errors}
//                 name={name as NameValues}
//                 placeholder={placeholder}
//               />
//             ))}
//           </div>
//           <Button type="submit">Register Now</Button>
//         </>
//       )}
//     </Form>
//   );
// };

// export default RegisterForm;