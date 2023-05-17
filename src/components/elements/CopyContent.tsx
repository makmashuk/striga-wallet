import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { enqueueSnackbar } from "notistack";
import { Tooltip } from "@mui/material";

interface PropsType {
  content: string;
}
function CopyContent({ content }: PropsType) {
  return (
    <>
      <Tooltip title="Copy Value">
        <ContentCopyIcon
          sx={{
            marginLeft: "2px",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
          onClick={() => {
            navigator.clipboard.writeText(content);
            enqueueSnackbar(`you just copied ${content}`, {
              variant: "success",
            });
          }}
        />
      </Tooltip>
    </>
  );
}

export default CopyContent;
