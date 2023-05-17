import { useContext } from "react";
import { WalletContext } from "./wallet.context";

export default function useWalletContext() {
  return useContext(WalletContext);
}
