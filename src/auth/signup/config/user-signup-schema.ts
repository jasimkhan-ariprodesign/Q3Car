// signup/config/signup-schema.ts
import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Full name is too short')
    .max(50, 'Full name is too long')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  countryCode: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .required('Phone number is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});
