import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup.string().email().required('You must enter your email.'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Invalid password.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  // name: yup.string().required('You must enter your full name.'),
  // company: yup.string().required('You must enter your company.'),
  // location: yup
  //   .string()
  //   .min(5, 'Enter your complete location.')
  //   .required('You must enter your location.'),
});
