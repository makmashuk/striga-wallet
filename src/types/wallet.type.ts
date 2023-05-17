export type IWallet = {
  accounts: IAccount[];
  comment: string;
  createdAt: string;
  ownerType: string;
  syncedOwnerId: string;
  walletId: string;
};

export type IWalletInfo = {
  wallets: IWallet[];
  total: number;
  count: number;
};
type AvailableBalance = {
  amount: string;
  currency: string;
};

export type IValidAccount = {
  currencyType: string;
  length: number;
  accountId: string;
  parentWalletId: string;
  ownerId: string;
  ownerType: string;
  createdAt: string;
  availableBalance: AvailableBalance;
  linkedCardId: string;
  status: string;
  permissions: string[];
  enriched: boolean;
};

export type IAccount = {
  [key: string]: {
    length: number;
    includes(arg0: string): unknown;
    accountId: string;
    parentWalletId: string;
    currency: string;
    ownerId: string;
    ownerType: string;
    createdAt: string;
    availableBalance: AvailableBalance;
    linkedCardId: string;
    status: string;
    permissions: string[];
    enriched: boolean;
  };
};
