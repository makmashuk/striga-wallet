import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import { createWallet } from "@/services/wallet.service";
import { useUserContext } from "@/context/user";
import { useWalletContext } from "@/context/wallet";
import theme from "@/utils/theme";
import WalletIcon from "@mui/icons-material/Wallet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./Wallet.module.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Card,
  Box,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Chip,
  CircularProgress,
  Badge,
  LinearProgress,
} from "@mui/material";
import { IWallet } from "@/types/wallet.type";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";

function Wallet() {
  const { user: currentUser } = useUserContext();

  const { walletinfo, getUserWallets } = useWalletContext();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getUserWallets(currentUser?.userId);
  }, [currentUser?.userId]);

  const handleWalletCreate = async () => {
    setLoading(true);
    const data = await createWallet(currentUser?.userId);
    if (data) {
      setLoading(false);
      getUserWallets(currentUser?.userId);
      enqueueSnackbar(`New Wallet Created ${data.walletId}`, {
        variant: "success",
      });
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1em",
          padding: "1em",
        }}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={styles.centerCard}
        >
          {loading && <CircularProgress color="success" />}
          {!loading && (
            <>
              <AddCircleIcon
                onClick={handleWalletCreate}
                style={{ fontSize: "3.5rem" }}
                color="primary"
              />
              Add New
            </>
          )}
        </Card>
        {walletinfo?.wallets?.map((wallet: IWallet, index) => {
          return (
            <Card key={wallet?.walletId} className={styles.cardWallet}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() =>
                  router.push(
                    `/dashboard/wallet/${wallet?.walletId}?user=${currentUser?.userId}`
                  )
                }
              >
                <Box>
                  <WalletIcon style={{ fontSize: "3rem" }} color="primary" />
                  <Typography component="div" variant="h5">
                    Wallet {index + 1}
                  </Typography>
                </Box>
                <Chip label={wallet.ownerType} size="small" />
              </Box>
              <Typography
                component="div"
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                Account Id : <br />
                {wallet.walletId}
                <ContentCopyIcon
                  sx={{ marginLeft: "2px" }}
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.walletId);
                    enqueueSnackbar(`you just copied ${wallet.walletId}`, {
                      variant: "success",
                    });
                  }}
                />
              </Typography>
            </Card>
          );
        })}
      </Box>
    </>
  );
}

export default Wallet;
