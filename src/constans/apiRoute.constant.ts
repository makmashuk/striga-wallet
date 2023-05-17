export const AUTH_ROUTE = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/user/create",
  VERIFY_MOBILE: "/user/verify-mobile",
  VERIFY_EMAIL: "/user/verify-email",
  RESEND_SMS: "/user/resend-sms",
  RESEND_EMAIL: "/user/resend-email",
  UPDATE_USER: "/user/update",
  CREATE_USER: "/user/create",
  KYC_START: "/user/kyc/start",
  SIMULATE_KYC: "/simulate/user/kyc",
};

export const WALLET_ROUTE = {
  CREATE: "/wallets/create",
  GET_WALLET_BY_ID: "/wallets/get",
  GET_WALLET_BY_USER: "/wallets/get/all",
  ENRICH: "/wallets/account/enrich",
  SWAPS: "/wallets/swap",
  EURO_DEPOSIT: "/simulate/accounts/deposit",
  TRADE_RATE: "/trade/rates",
  ACCOUNT_STATEMENT: "wallets/get/account/statement",
};
