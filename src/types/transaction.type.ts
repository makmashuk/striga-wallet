export type ITransaction = {
  accountId: string;
  balanceAfter: { amount: string; currency: string };
  balanceBefore: { amount: string; currency: string };
  credit: string;
  destinationSyncedOwnerId: string;
  exchangeRate: string;
  id: string;
  memo: string;
  memoPayer: string;
  sourceSyncedOwnerId: string;
  syncedOwnerId: string;
  timestamp: string;
  txSubType: string;
  txType: string;
};

export type ITransactionData = {
  count: number;
  total: number;
  transactions: ITransaction[];
};
