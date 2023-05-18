import { KYC_STATUS } from "@/constans/kycstatus.constant";
import { useUserContext } from "@/context/user";
import { simulateKYCWithUser, startKYCWithUser } from "@/services/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Box, Button, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

function KYCVerify() {
  // Get user context and verification state
  const {
    user: currentUser,
    verificationState,
    handleVerificationState,
  } = useUserContext();

  const router = useRouter();

  // State variables for loading and simulation
  const [simulatedKYC, setSimulatedKYC] = useState(false);
  const [loadingStartKYC, setLoadingStartKYC] = useState(false);
  const [loadingSimulateKYC, setLoadingSimulateKYC] = useState(false);
  const [loadingCheckingKYC, setLoadingCheckingKYC] = useState(false);

  // Handle KYC verification
  const handleKYCVerification = useCallback(async () => {
    setLoadingStartKYC(true);
    try {
      const data = await startKYCWithUser(currentUser?.userId);
      if (data?.token) {
        handleVerificationState(data?.userId);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingStartKYC(false);
    }
  }, [currentUser?.userId, handleVerificationState]);

  // Handle simulated KYC verification
  const handleSimulateKYCVerification = useCallback(async () => {
    setLoadingSimulateKYC(true);
    try {
      const data = await simulateKYCWithUser(currentUser?.userId);
      if (data === "OK") {
        handleVerificationState(data?.userId);
        setSimulatedKYC(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingSimulateKYC(false);
    }
  }, [currentUser?.userId, handleVerificationState]);

  // Handle KYC status update check
  const handleKYCUpdateCheck = useCallback(async () => {
    setLoadingCheckingKYC(true);
    try {
      handleVerificationState(currentUser?.userId);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingCheckingKYC(false);
    }
  }, [currentUser?.userId, handleVerificationState]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          gap: "1em",
          minHeight: "15em",
        }}
      >
        {verificationState.status === KYC_STATUS.NOT_STARTED && (
          <>
            <Alert variant="outlined" severity="error">
              Start KYC Verification
            </Alert>
            <LoadingButton
              size="large"
              fullWidth
              onClick={handleKYCVerification}
              loading={loadingStartKYC}
              loadingIndicator="Started..."
              variant="contained"
              disabled={!!verificationState?.missingFields}
            >
              <span> Start Now</span>
            </LoadingButton>
          </>
        )}

        {verificationState.status === KYC_STATUS.INITIATED && (
          <>
            <Alert sx={{ width: "100%" }} variant="outlined" severity="info">
              <strong>KYC Inititated . Please Simulate the Verification</strong>
            </Alert>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
            <Box sx={{ width: "100%" }}>
              {simulatedKYC ? (
                <LoadingButton
                  size="large"
                  fullWidth
                  onClick={handleKYCUpdateCheck}
                  loading={loadingCheckingKYC}
                  loadingIndicator="Checking..."
                  variant="contained"
                  disabled={
                    !(verificationState.status === KYC_STATUS.INITIATED)
                  }
                >
                  <span> Check Status Update</span>
                </LoadingButton>
              ) : (
                <LoadingButton
                  size="large"
                  fullWidth
                  onClick={handleSimulateKYCVerification}
                  loading={loadingSimulateKYC}
                  loadingIndicator="Simulating..."
                  variant="contained"
                  disabled={
                    !(verificationState.status === KYC_STATUS.INITIATED)
                  }
                >
                  <span> Simulate Now</span>
                </LoadingButton>
              )}
            </Box>
          </>
        )}

        {verificationState.status === KYC_STATUS.APPROVED && (
          <>
            <Alert variant="outlined" severity="success">
              <strong>KYC Verified! All Done </strong>
            </Alert>
            <Button
              fullWidth
              onClick={() => router.push("/dashboard")}
              variant="contained"
              color="info"
            >
              Go To Dashboard
            </Button>
          </>
        )}
      </Box>
    </>
  );
}

export default KYCVerify;
