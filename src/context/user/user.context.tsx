import { LocalstorageKey } from "@/constans/localstorage.constant";
import { useLocalStorage } from "@/hooks/useLocalStorage.hooks";
import {
  getKYCstatusWithUser,
  getUser,
  registerUserService,
} from "@/services/auth.service";
import { handleErrors } from "@/services/error.service";
import { IUser, IUserKYC } from "@/types/user.type";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";

type UserContextType = {
  user: IUser;
  verificationState: IUserKYC;
  handleRegister: (payload: any) => void;
  handleVerificationState: (userid: string) => void;
  handleLogout: () => void;
};
export const UserContext = React.createContext({} as UserContextType);

type UserContextProviderProps = {
  children: React.ReactNode;
};

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const router = useRouter();
  const { setItem, removeItem, getItem } = useLocalStorage();
  const [user, setUser] = React.useState<IUser>({} as IUser);
  const [verificationState, setVerificationState] = React.useState<IUserKYC>(
    {} as IUserKYC
  );

  useEffect(() => {
    //getting localStorage USER value and set as default context user
    const getLocalUser = getItem(LocalstorageKey.USER);
    const localuser = getLocalUser ? JSON.parse(getLocalUser) : ({} as IUser);
    setUser(localuser);

    //getting localStorage USERSTATE value and set as default context verificationState
    const getLocalVerificationState = getItem(LocalstorageKey.USERSTATE);
    const localverificationState = getLocalVerificationState
      ? JSON.parse(getLocalVerificationState)
      : ({} as IUserKYC);
    setVerificationState(localverificationState);
  }, []);

  //register user on success update context and localstorage and redirect to verify page
  const handleRegister = async (payload: any) => {
    const responseVerification = await registerUserService(payload);
    if (handleErrors(responseVerification, enqueueSnackbar)) {
      return;
    }
    const response = await getKYCstatusWithUser(
      responseVerification.data.userId
    );

    setVerificationState(response?.kyc?.data);
    setItem(LocalstorageKey.USERSTATE, JSON.stringify(response?.kyc?.data));

    setUser(response?.user?.data);
    setItem(LocalstorageKey.USER, JSON.stringify(response?.user?.data));

    if (verificationState?.userId) {
      router.push(`verify/${verificationState.userId}`);
    }
  };

  const handleVerificationState = async (userid: string) => {
    if (!userid) return;
    const response = await getKYCstatusWithUser(userid);

    setVerificationState(response?.kyc?.data);
    setItem(LocalstorageKey.USERSTATE, JSON.stringify(response?.kyc?.data));

    setUser(response?.user?.data);
    setItem(LocalstorageKey.USER, JSON.stringify(response?.user?.data));
  };

  const handleLogout = () => {
    enqueueSnackbar("LOGOUT");
    removeItem(LocalstorageKey.USER);
    removeItem(LocalstorageKey.USERSTATE);
    removeItem(LocalstorageKey.WALLETS);
    removeItem(LocalstorageKey.RATES);
    setUser({} as IUser);
    setVerificationState({} as IUserKYC);
    router.push(`/`);
  };

  const value = {
    user,
    verificationState,
    handleRegister,
    handleVerificationState,
    handleLogout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
