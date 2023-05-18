import { IUserRegistration, IVerifiedUser } from "@/types/user.type";
import apiClient from "./apiClient";
import { AUTH_ROUTE } from "@/constans/apiRoute.constant";
import { handleErrors } from "./error.service";
import { enqueueSnackbar } from "notistack";

const registerUserService = async (payload: IUserRegistration) => {
  try {
    const { status, data } = await apiClient.post(
      AUTH_ROUTE.CREATE_USER,
      payload
    );

    console.log(status);
    return data;
  } catch (e) {
    console.log(e);
  }
};
const updateUserService = async (payload: IVerifiedUser) => {
  try {
    const response = await apiClient.patch(AUTH_ROUTE.UPDATE_USER, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const verifyMobileService = async (payload: any) => {
  try {
    const response = await apiClient.post(AUTH_ROUTE.VERIFY_MOBILE, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const resendSMSService = async (payload: any) => {
  try {
    const response = await apiClient.post(AUTH_ROUTE.RESEND_SMS, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const resendEmailService = async (payload: any) => {
  try {
    const response = await apiClient.post(AUTH_ROUTE.RESEND_EMAIL, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
const verifyEmailService = async (payload: any) => {
  try {
    const response = await apiClient.post(AUTH_ROUTE.VERIFY_EMAIL, payload);
    if (handleErrors(response, enqueueSnackbar)) {
      return;
    }
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (id: any) => {
  if (!id) return null;
  try {
    const response = await apiClient.get(`user/${id}`);
    return response.data;
  } catch (e: any) {
    console.log(e.response.data);
  }
};
const getKYCstatusWithUser = async (id: any) => {
  if (id === null || id === undefined) return null;
  try {
    const [userResponse, kycResponse] = await Promise.allSettled([
      apiClient.get(`user/${id}`),
      apiClient.get(`user/kyc/${id}`),
    ]);
    const user =
      userResponse.status === "fulfilled" ? userResponse.value.data : null;
    const kyc =
      kycResponse.status === "fulfilled" ? kycResponse.value.data : null;

    return { user, kyc };
  } catch (e: any) {
    console.log(e.response.data);
  }
};
const startKYCWithUser = async (userId: any) => {
  try {
    const payload = {
      userId,
    };
    const response = await apiClient.post(AUTH_ROUTE.KYC_START, payload);
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
const simulateKYCWithUser = async (userId: any) => {
  try {
    const payload = {
      userId,
      status: "APPROVED",
    };
    console.log(payload);
    const response = await apiClient.patch(AUTH_ROUTE.SIMULATE_KYC, payload);
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

export {
  registerUserService,
  verifyEmailService,
  verifyMobileService,
  getUser,
  resendSMSService,
  resendEmailService,
  getKYCstatusWithUser,
  updateUserService,
  startKYCWithUser,
  simulateKYCWithUser,
};
