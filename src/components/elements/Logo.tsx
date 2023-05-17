import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

function Logo() {
  return (
    <>
      <Box>
        <Image src="/striga.png" alt="Logo" width={180} height={80} />
      </Box>
    </>
  );
}

export default Logo;
