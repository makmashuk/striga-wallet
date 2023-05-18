import { useUserContext } from "@/context/user";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepContent,
  Button,
  Paper,
} from "@mui/material";
import KYCVerify from "../modules/KYCVerify";
import UserProfile from "../modules/UserProfile";
import VerifyMobileEmail from "../modules/VerifyMobileEmail/VerifyMobileEmail";
import { useState } from "react";

export default function VerifyTemplateStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const { verificationState } = useUserContext();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const getCurrentStatus = (index: number) => {
    if (
      index === 0 &&
      verificationState?.emailVerified &&
      verificationState?.mobileVerified
    ) {
      return false;
    }
    if (index === 1 && !verificationState?.missingFields) {
      return false;
    }
    return true;
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.contentComponent}
              <Box sx={{ mb: 2, display: "flex" }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  color="success"
                  size="large"
                  sx={{
                    mt: 1,
                    mr: 1,
                    display: getCurrentStatus(index) ? "none" : "block",
                  }}
                  disabled={getCurrentStatus(index)}
                >
                  {index === 0 || 1 ? "Continue" : ""}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

const steps = [
  {
    id: 1,
    label: "Verify Mobile & Email",
    contentComponent: <VerifyMobileEmail />,
  },
  {
    id: 2,
    label: "Update Personal Information",
    contentComponent: <UserProfile />,
  },
  {
    id: 3,
    label: "Verify KYC",
    contentComponent: <KYCVerify />,
  },
];
