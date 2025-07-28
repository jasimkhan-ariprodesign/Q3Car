import { SPSignUpInitialEntity } from "../../../../utils/entities/auth/sp-signup-entity";

export const SPSignupInitialValues: SPSignUpInitialEntity = {
  fullName:           '',
  email:              '',
  countryCode:        '+1',
  phone:              '',
  avatar:             '',
  driverLicense:      '',
  driverLicenseImage: '',
  insuranceNumber:    '',
  insuranceImage:     '',
  userType:           'ServiceProvider',
  isEmailVerified:    false,
  isPhoneVerified:    false,
  agreeToTerms:       true,
};


