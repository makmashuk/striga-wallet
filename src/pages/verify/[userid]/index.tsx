import CenterLayout from "@/components/layouts/CenterLayout";
import DashLayout from "@/components/layouts/DashLayout";
import VerifyTemplateStepper from "@/components/templates/VerifyTemplate";

import { Card, Typography } from "@mui/material";
import React from "react";

function Index() {
  return (
    <DashLayout>
      <CenterLayout>
        <Card>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Complete and Verify Profile
          </Typography>
          <VerifyTemplateStepper />
        </Card>
      </CenterLayout>
    </DashLayout>
  );
}

export default Index;
