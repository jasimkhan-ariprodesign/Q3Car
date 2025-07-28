// src/validations/schemas.ts
import * as Yup from 'yup';

export const _signupSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Full name is too short').max(50, 'Full name is too long').required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
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

export const _loginSchema = Yup.object().shape({
  email: Yup.string().required('Email or phone is required'),
  password: Yup.string().required('Password required'),
});

export const _forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('Email or Phone is required'),
});

export const _setPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[0-9])|(?=.*[!@#$%^&*])/, 'Password must contain at least 1 number or a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});
