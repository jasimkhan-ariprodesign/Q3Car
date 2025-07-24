export const AUTH_ENDPOINTS = {
  REGISTER_CUSTOMER: '/auth/start-registration',
  SETPASSWORD_CUSTOMER: '/auth/complete-registration',

  LOGIN: '/auth/signin', // common for both sp-customer

  SEND_OTP_TO_EMAIL: '/auth/send-mail',
  VERIFY_EMAIL: '/auth/verify-mail',

  SEND_OTP_TO_PHONE: '/auth/send-otp',
  VERIFY_PHONE: '/auth/verify-otp',
};
