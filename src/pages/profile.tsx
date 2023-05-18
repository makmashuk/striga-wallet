import DashLayout from "@/components/layouts/DashLayout";
import KYCVerify from "@/components/modules/KYCVerify";
import UserProfile from "@/components/modules/UserProfile/UserProfile";
import VerifyMobileEmail from "@/components/modules/VerifyMobileEmail/VerifyMobileEmail";
import VerifyTemplateStepper from "@/components/templates/VerifyTemplate";
import { Grid } from "@mui/material";
import React from "react";

function profile() {
  return (
    <DashLayout>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          sm={10}
          md={5}
          sx={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            gap: "2em",
          }}
        >
          <UserProfile />
        </Grid>
      </Grid>
    </DashLayout>
  );
}

export default profile;
