export function handleErrors(response: any, enqueueSnackbar: any) {
  // console.log(response);
  const { data, status } = response;

  const message = data?.message + "-" + data?.errorDetails;
  // enqueueSnackbar(message, { variant: "error" });
  if (response?.data?.errorDetails) {
    if (typeof response.data.errorDetails === "string") {
      const error = JSON.parse(response.data.errorDetails);
      // console.log(error);
      // enqueueSnackbar(error, { variant: "error" });
      const message = response?.data?.message || response?.data?.errorDetails;
      console.log("ED9" + message);
      if (message) {
        enqueueSnackbar(message, { variant: "error" });
      }
      console.log(message);

      const { fieldErrors } = error.exception;
      console.log(fieldErrors);
      for (const key in fieldErrors) {
        if (fieldErrors.hasOwnProperty(key)) {
          fieldErrors[key].forEach((error: any) => {
            enqueueSnackbar(error.message, { variant: "error" });
          });
        }
      }
    } else {
      response.data.errorDetails.forEach((detail: any) => {
        enqueueSnackbar(detail.msg, { variant: "error" });
      });
    }
  }
  if (response?.errorDetails) {
    if (typeof response.errorDetails === "string") {
      const error = JSON.parse(response.errorDetails);
      const { fieldErrors } = error.exception;

      for (const key in fieldErrors) {
        if (fieldErrors.hasOwnProperty(key)) {
          fieldErrors[key].forEach((error: any) => {
            enqueueSnackbar(error.message, { variant: "error" });
          });
        }
      }
    } else {
      response.errorDetails.forEach((detail: any) => {
        enqueueSnackbar(detail.msg, { variant: "error" });
      });
    }
    return true;
  }
  return false;
}
