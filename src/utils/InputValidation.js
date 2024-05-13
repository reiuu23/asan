import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  identifier: yup.string().min(6).required('You must enter your email/username.'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Invalid password.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

export const registrationSchema = yup.object().shape({
  last_name: yup.string().required('Enter your last name'),
  first_name: yup.string().required('Enter your first name'),
  affiliation: yup
    .string()
    .min(4, 'Minimum of 4 characters')
    .required('This is a required field!'),
  location: yup
    .string()
    .min(6, 'Minimum of 6 characters')
    .required('Enter your last name!'),
  email: yup.string().email().required('Enter your email address'),
  username: yup
    .string()
    .min(5, 'Minimum of 5 characters')
    .required('Enter your last name'),
  password: yup
    .string()
    .required('Enter your password')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  password_confirmation: yup
    .string()
    .required('Re-enter your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});