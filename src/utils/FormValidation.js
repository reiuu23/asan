import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required('You must enter your email'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});
