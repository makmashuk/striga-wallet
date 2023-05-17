import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import apiClient from "@/services/apiClient";
import { enqueueSnackbar } from "notistack";

const useFetchData = (
  url: string,
  method: AxiosRequestConfig["method"],
  payload?: AxiosRequestConfig["data"]
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await apiClient({
          url,
          method,
          data: payload,
        });
        if (response.data.errorCode) {
          response.data.errorDetails.forEach((detail: any) => {
            enqueueSnackbar(detail.msg);
          });
        }
        setData(response.data.data);
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }

        setError(error.response);
      }
      setLoading(false);
    };

    fetchData();
  }, [url, method, payload]);

  return { data, loading, error };
};

export default useFetchData;
