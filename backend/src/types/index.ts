export type CountryCode = string;

export interface UserProfile {
  id: string;
  email: string;
  age: number;
  country: CountryCode;
  emailVerified: boolean;
  selfExcluded: boolean;
  sessionLimitMinutes: number;
}

export interface Wallet {
  userId: string;
  demoBalance: number;
  bonusBalance: number;
  realBalance: number;
}
