import { useLocalStorage } from "@/hooks/useLocalStorage.hooks";
import { getTradeRates, getWalletsByUserId } from "@/services/wallet.service";
import { IWallet, IWalletInfo } from "@/types/wallet.type";
import React, { useEffect, useState } from "react";

type WalletContextType = {
  walletinfo: IWalletInfo;
  getUserWallets: (userId: string) => void;
  rates: any;
};
export const WalletContext = React.createContext({} as WalletContextType);

type WalletContextProviderProps = {
  children: React.ReactNode;
};

export default function WalletContextProvider({
  children,
}: WalletContextProviderProps) {
  // const { setItem, getItem } = useLocalStorage();
  const [walletinfo, setWalletInfo] = useState<IWalletInfo>({} as IWalletInfo);
  const [rates, setRates] = useState({} as any);

  useEffect(() => {
    //fetchAllTheRates
    const getRates = async () => {
      const ratesRes = await getTradeRates();
      if (ratesRes) {
        setRates({ ...ratesRes });
      }
    };
    getRates();
  }, []);

  const getUserWallets = async (userId: any) => {
    const data = await getWalletsByUserId(userId);
    const wallets = data?.wallets;

    const sortedWallets = wallets?.sort((a: IWallet, b: IWallet) => {
      const dateA: any = new Date(a.createdAt);
      const dateB: any = new Date(b.createdAt);
      return dateA - dateB;
    });
    console.log(sortedWallets);
    setWalletInfo({ ...walletinfo, wallets: sortedWallets });
    console.log(walletinfo);
  };

  const value = {
    walletinfo,
    getUserWallets,
    rates,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}
