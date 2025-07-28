// src/validations/schemas.ts
import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email or phone is required'),
  password: Yup.string().required('Password required'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('Email or Phone is required'),
});

export const SetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[0-9])|(?=.*[!@#$%^&*])/, 'Password must contain at least 1 number or a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const CustomerSignupSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Full name is too short').max(50, 'Full name is too long').required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  countryCode: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only numbers')
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .required('Phone number is required'),

  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),

  isEmailVerified: Yup.boolean().oneOf([true], 'Email is not verified'),
  isPhoneVerified: Yup.boolean().oneOf([true], 'Phone number is not verified'),
});

export const SPSignupSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Full name is too short').max(50, 'Full name is too long').required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  countryCode: Yup.string().required('Country code is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .required('Phone number is required'),

  driverLicense: Yup.string().required('Driver license is required'),
  driverLicenseImage: Yup.string().required('Driver license image is required'),

  insuranceNumber: Yup.string().required('Insurance number is required'),
  insuranceImage: Yup.string().required('Insurance image is required'),

  isEmailVerified: Yup.boolean().oneOf([true], 'Email is not verified'),
  isPhoneVerified: Yup.boolean().oneOf([true], 'Phone number is not verified'),

  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});
