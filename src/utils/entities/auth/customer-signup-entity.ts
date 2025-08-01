export interface CustomerSignUpInitialEntity {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  agreeToTerms: boolean;
  avatar: string;
  userType: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}
