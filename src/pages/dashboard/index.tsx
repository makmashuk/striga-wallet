import DashLayout from "@/components/layouts/DashLayout";
import Wallet from "@/components/modules/Wallet/Wallet";
import React from "react";

function Index() {
  return (
    <>
      <DashLayout>
        <Wallet />
      </DashLayout>
    </>
  );
}

export default Index;
