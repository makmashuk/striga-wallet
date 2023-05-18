import { useUserContext } from "@/context/user";
import {
  verifyMobileService,
  resendSMSService,
  resendEmailService,
  verifyEmailService,
} from "@/services/auth.service";
import {
  Grid,
  Button,
  Chip,
  Divider,
  Box,
  duration,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import EmailIcon from "@mui/icons-material/Email";
export default function VerifyMobileEmail() {
  const {
    user: currentUser,
    verificationState,
    handleRegister,
    handleVerificationState,
  } = useUserContext();
  //   console.log(currentUser);

  const [phoneNumber, setPhoneNumber] = useState("+");
  const [loader, setLoader] = useState(false);
  const [missing, setMissing] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const { userid } = router.query;

    if (userid) {
      handleVerificationState(userid as string);
    }
  }, [router]);
  useEffect(() => {
    const phone =
      currentUser?.mobile?.countryCode + currentUser?.mobile?.number || "";
    setPhoneNumber(phone);
  }, [currentUser]);

  const handleMobileVerification = async (userId: string) => {
    const payload = {
      userId: userId,
      verificationCode: "123456",
    };
    const res = await verifyMobileService(payload);
    if (res.data == "Accepted") {
      handleVerificationState(userId);
      console.log("verified");
    }
  };
  const handleRequestMobileVerification = async (userId: string) => {
    const payload = {
      userId: userId,
    };
    setLoader(true);
    const response = await resendSMSService(payload);
    const dateExpires = new Date(response.data.dateExpires);
    const durationMs = new Date().getTime() - dateExpires.getTime();
    console.log(durationMs / 1000);
  };
  const handleRequestEmailVerification = async (userId: string) => {
    const payload = {
      userId: userId,
    };
    const data = await resendEmailService(payload);
    console.log(data);
  };

  const handleEmailVerification = async (userId: string) => {
    const payload = {
      userId: userId,
      verificationId: "123456",
    };
    const res = await verifyEmailService(payload);
    if (res.data == "Accepted") {
      handleVerificationState(userId);
    }
  };
  return (
    <>
      <Box
        sx={{
          gap: "1em",
          display: "flex",
          width: "22em",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {verificationState?.mobileVerified && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <Alert
              sx={{ width: "20em" }}
              icon={<VerifiedUserIcon fontSize="large" color="success" />}
              variant="outlined"
              severity="success"
            >
              <h3>{phoneNumber}</h3>
            </Alert>
            <SmartphoneIcon fontSize="large" color="info" />
          </Box>
        )}

        {!verificationState?.mobileVerified && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              width: "100%",
            }}
          >
            <Button
              onClick={() => handleMobileVerification(verificationState.userId)}
              variant="contained"
              color="info"
            >
              Simulate Mobile verification
            </Button>
            <Button
              variant="text"
              onClick={() =>
                handleRequestMobileVerification(verificationState.userId)
              }
            >
              Request OTP
            </Button>
          </Box>
        )}
        {verificationState?.emailVerified && (
          <Box
            sx={{
              display: "flex",

              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "1em",
            }}
          >
            <Alert
              icon={<VerifiedUserIcon fontSize="large" color="success" />}
              sx={{ width: "20em" }}
              variant="outlined"
              severity="success"
            >
              <h3>{currentUser?.email}</h3>
            </Alert>
            <EmailIcon fontSize="large" color="info" />
          </Box>
        )}

        {!verificationState?.emailVerified && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              width: "100%",
            }}
          >
            <Button
              onClick={() => handleEmailVerification(verificationState.userId)}
              color={"info"}
              variant="contained"
            >
              Simulate Email verification
            </Button>
            <Button
              variant="text"
              onClick={() =>
                handleRequestEmailVerification(verificationState.userId)
              }
            >
              Resend Email
            </Button>
          </Box>
        )}

        {verificationState?.emailVerified &&
          verificationState?.mobileVerified &&
          verificationState?.missingFields && (
            <Box sx={{ margin: "1em 0" }}>
              <Alert severity="warning">
                <AlertTitle>Missing Fields</AlertTitle>
                {/* <Box>
                  {verificationState?.missingFields.map((item, index) => {
                    return (
                      <>
                        <Box key={item + index}>{item}</Box>
                      </>
                    );
                  })}
                </Box> */}
                Complete This Profile — <strong> Continue </strong>
              </Alert>
            </Box>
          )}
      </Box>
      <Divider sx={{ margin: "1em 0" }} />
    </>
  );
}
