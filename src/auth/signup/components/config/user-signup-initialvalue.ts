import { CustomerSignUpInitialEntity } from '../../../../utils/entities/auth/customer-signup-entity';

export const UserSignupIntialValues: CustomerSignUpInitialEntity = {
  fullName: '',
  email: '',
  countryCode: '+1',
  phone: '',
  agreeToTerms: true,
  avatar: '',
  userType: 'Customer',
  isEmailVerified: false,
  isPhoneVerified: false,
};
