import { WALLET_ROUTE } from "@/constans/apiRoute.constant";
import apiClient from "./apiClient";
import { handleErrors } from "./error.service";
import { enqueueSnackbar } from "notistack";

const createWallet = async (userId: any) => {
  try {
    if (userId === null || userId === undefined) return null;
    const payload = {
      userId,
      includeCustodyOnlyAssets: true,
    };
    const response = await apiClient.post(WALLET_ROUTE.CREATE, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    if (response?.status === 200) {
      console.log(response);
      return response.data.data;
    }
  } catch (e: any) {
    console.log(e);
  }
};
const getWalletsByUserId = async (userId: any) => {
  try {
    if (userId === null || userId === undefined) return null;
    const payload = {
      userId,
      startDate: 1656622800000,
      endDate: Date.now(),
      page: 1,
    };
    const response = await apiClient.post(
      WALLET_ROUTE.GET_WALLET_BY_USER,
      payload
    );
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    if (response?.status === 200) {
      return response.data.data;
    }
  } catch (e: any) {
    console.log(e);
  }
};
const getWalletById = async (walletId: any, userId: any) => {
  try {
    if (userId === null || userId === undefined) return null;
    const payload = {
      userId,
      walletId,
    };
    const response = await apiClient.post(
      WALLET_ROUTE.GET_WALLET_BY_ID,
      payload
    );
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    if (response?.status === 200) {
      return response.data.data;
    }
  } catch (e: any) {
    console.log(e);
  }
};
const getStatementByAccountId = async (accountId: any, userId: any) => {
  try {
    if (userId === null || userId === undefined) return null;
    const payload = {
      userId: userId,
      accountId: accountId,
      startDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      endDate: Date.now(),
      page: 1,
    };
    const response = await apiClient.post(
      WALLET_ROUTE.ACCOUNT_STATEMENT,
      payload
    );
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    if (response?.status === 200) {
      return response.data.data;
    }
  } catch (e: any) {
    console.log(e);
  }
};
const getTradeRates = async () => {
  try {
    const response = await apiClient.post(WALLET_ROUTE.TRADE_RATE);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    // console.log(response);
    if (response?.status === 200) {
      return response.data.data;
    }
  } catch (e: any) {
    console.log(e);
  }
};

const enrichAccount = async (accountId: string, userId: string) => {
  try {
    const payload = {
      userId,
      accountId,
    };
    const response = await apiClient.post(WALLET_ROUTE.ENRICH, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    if (response?.status === 200) {
      enqueueSnackbar(`Account Enriched Succesfully`, { variant: "success" });
      return response.data.data;
    }
  } catch (e: any) {
    console.log(e);
  }
};
const instantSwaps = async (payload: any) => {
  try {
    const response = await apiClient.post(WALLET_ROUTE.SWAPS, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    if (response?.status === 200) {
      let data: any = response?.data?.data;
      if (data && data?.status === "COMMITTED") {
        enqueueSnackbar(
          `Transfered Completed From - ${data?.order?.credit?.currency} To - ${data?.order?.debit?.currency} `,
          { variant: "success" }
        );
      }

      return response.data.data;
    }
  } catch (e: any) {
    console.log(e);
  }
};
const depositeEuro = async (accountId: any) => {
  try {
    if (accountId === null || accountId === undefined) return null;
    const payload = {
      accountId,
      amount: "100000",
    };
    const response = await apiClient.patch(WALLET_ROUTE.EURO_DEPOSIT, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    if (response?.status === 200) {
      enqueueSnackbar(`EUR Deposited Succesfully`, { variant: "success" });
      return response.data.data;
    }
  } catch (e: any) {
    console.log(e);
  }
};
export {
  createWallet,
  getWalletsByUserId,
  getWalletById,
  enrichAccount,
  instantSwaps,
  depositeEuro,
  getTradeRates,
  getStatementByAccountId,
};
