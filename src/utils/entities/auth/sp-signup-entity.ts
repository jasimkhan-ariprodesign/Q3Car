export interface SPSignUpInitialEntity {
  fullName:           string;
  email:              string;
  countryCode:        string;
  phone:              string;
  avatar:             string;
  driverLicense:      string;
  driverLicenseImage: string;
  insuranceNumber:    string;
  insuranceImage:     string;
  userType:           string;
  isEmailVerified:    boolean;
  isPhoneVerified:    boolean;
  agreeToTerms:       boolean;
}