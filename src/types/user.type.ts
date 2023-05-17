export type IUserRegistration = {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: {
    countryCode: string;
    number: string;
  };
  address: {
    addressLine1: string;
    city: string;
    country: string;
    postalCode: string;
  };
};

export type IUserKYC = {
  userId: string;
  emailVerified: boolean;
  missingFields: string[];
  mobileVerified: boolean;
  status: string;
  emailVerification?: {
    dateExpires: string;
  };
  mobileVerification?: {
    dateExpires: string;
  };
};
export type IUserVerification = {
  userId: string;
  email: string;
  KYC: {
    emailVerified: boolean;
    mobileVerified: boolean;
    status: string;
  };
  emailVerification: {
    dateExpires: string;
  };
  missingFields: string[];
  mobileVerification: {
    dateExpires: string;
  };
};

type Mobile = {
  countryCode: string;
  number: string;
};

type DateOfBirth = {
  month: number;
  day: number;
  year: number;
};

type Address = {
  addressLine1: string;
  city: string;
  country: string;
  postalCode: string;
};

type KYC = {
  emailVerified: boolean;
  mobileVerified: boolean;
  status: string;
  rejectionComments: object;
};

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  nationality: string;
  mobile: Mobile;
  dateOfBirth: DateOfBirth;
  address: Address;
  occupation: string;
  sourceOfFunds: string;
  purposeOfAccount: string;
  selfPepDeclaration: boolean;
  placeOfBirth: string;
  expectedIncomingTxVolumeYearly: string;
  expectedOutgoingTxVolumeYearly: string;
  KYC: KYC;
  userId: string;
  createdAt: number;
  sourceOfFundsOther: string;
  purposeOfAccountOther: string;
};
export type IVerifiedUser = {
  firstName: string;
  lastName: string;
  address: Address;
  dateOfBirth: DateOfBirth;
  occupation: string;
  sourceOfFunds: string;
  purposeOfAccount: string;
  selfPepDeclaration: boolean;
  placeOfBirth: string;
  expectedIncomingTxVolumeYearly: string;
  expectedOutgoingTxVolumeYearly: string;
};
