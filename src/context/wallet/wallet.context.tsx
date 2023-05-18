import { LocalstorageKey } from "@/constans/localstorage.constant";
import { useLocalStorage } from "@/hooks/useLocalStorage.hooks";
import { getTradeRates, getWalletsByUserId } from "@/services/wallet.service";
import { IWallet, IWalletInfo } from "@/types/wallet.type";
import React, { useEffect, useState } from "react";

type WalletContextType = {
  walletinfo: IWalletInfo;
  getUserWallets: (userId: string) => void;
  rates: any;
  fetchAllTheTradeRates: () => void;
};
export const WalletContext = React.createContext({} as WalletContextType);

type WalletContextProviderProps = {
  children: React.ReactNode;
};

export default function WalletContextProvider({
  children,
}: WalletContextProviderProps) {
  const { setItem, getItem } = useLocalStorage();
  const [walletinfo, setWalletInfo] = useState<IWalletInfo>({} as IWalletInfo);
  const [rates, setRates] = useState({} as any);

  useEffect(() => {
    fetchAllTheTradeRates();
  }, []);
  useEffect(() => {
    //getting localStorage WALLETS value and set as default context walletinfo
    const getLocalWalletInfo = getItem(LocalstorageKey.WALLETS);
    const localWalletinfo = getLocalWalletInfo
      ? JSON.parse(getLocalWalletInfo)
      : ({} as IWalletInfo);
    setWalletInfo(localWalletinfo);

    //getting localStorage RATES value and set as default context walletinfo
    const getLocalRates = getItem(LocalstorageKey.RATES);
    const localRates = getLocalRates ? JSON.parse(getLocalRates) : ({} as any);
    setWalletInfo(localRates);
  }, []);
  //fetchAllTheRates and update context state
  const fetchAllTheTradeRates = async () => {
    const ratesRes = await getTradeRates();
    if (ratesRes) {
      setRates({ ...ratesRes });
      setItem(LocalstorageKey.RATES, JSON.stringify(ratesRes));
    }
  };

  //getting the user wallets by userId, sorting with the createdAt value, updating context state
  const getUserWallets = async (userId: any) => {
    const data = await getWalletsByUserId(userId);
    const wallets = data?.wallets;

    const sortedWallets = wallets?.sort((a: IWallet, b: IWallet) => {
      const dateA: any = new Date(a.createdAt);
      const dateB: any = new Date(b.createdAt);
      return dateA - dateB;
    });
    const sortedWalletInfo = { ...walletinfo, wallets: sortedWallets };
    setWalletInfo(sortedWalletInfo);
    setItem(LocalstorageKey.WALLETS, JSON.stringify(sortedWalletInfo));
  };

  const value = {
    walletinfo,
    getUserWallets,
    rates,
    fetchAllTheTradeRates,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
