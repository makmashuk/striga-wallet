import DashLayout from "@/components/layouts/DashLayout";
import { useUserContext } from "@/context/user";
import {
  depositeEuro,
  enrichAccount,
  getStatementByAccountId,
  getWalletById,
} from "@/services/wallet.service";
import {
  Box,
  Card,
  Typography,
  Chip,
  Tooltip,
  CircularProgress,
  Modal,
  Backdrop,
  Fade,
  Badge,
  LinearProgress,
  Button,
} from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { getPermissionColor } from "@/services/helper.service";
import CopyContent from "@/components/elements/CopyContent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { useRouter } from "next/router";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoadingButton from "@mui/lab/LoadingButton";
import { IAccount, IValidAccount, IWallet } from "@/types/wallet.type";
import { ITransaction, ITransactionData } from "@/types/transaction.type";
import CenterLayout from "@/components/layouts/CenterLayout";
import { useWalletContext } from "@/context/wallet";

const alignmentRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

function WalletId({ walletId, ownerType, accounts }: any) {
  const { user: currentUser } = useUserContext();
  const router = useRouter();
  const { getUserWallets } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [updatedAccounts, setUpdatedAccounts] =
    useState<IValidAccount[]>(accounts);
  const [transactionsData, setTransactionsData] = useState<ITransactionData>(
    {} as ITransactionData
  );

  const handleEnrichAccount = async (accountId: string) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const data = await enrichAccount(accountId, currentUser?.userId);
        if (data?.accountId) {
          const updatedAccount = {
            ...accounts[data?.currency],
            enriched: true,
          };

          setUpdatedAccounts({
            ...updatedAccounts,
            [data?.currency]: { ...updatedAccount },
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  const handleDepositeEuro = async (accountId: string) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const data = await depositeEuro(accountId);
        console.log(accounts);
        if (data.status == 200) {
          const updatedAccount: IValidAccount = {
            ...accounts["EUR"],
            availableBalance: {
              ...accounts["EUR"]?.availableBalance,
              amount:
                parseInt(accounts["EUR"]?.availableBalance?.amount) + 100000,
            },
          };
          // console.log(updatedAccount);
          setUpdatedAccounts({
            ...updatedAccounts,
            ["EUR"]: { ...updatedAccount },
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "60em",
    minWidth: "25em",
    height: "40em",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getAccountStatement = async (accountId: string) => {
    const data = await getStatementByAccountId(accountId, currentUser?.userId);
    setTransactionsData(data);
    setOpen(true);
    console.log(data);
  };

  const accountEntries = useMemo(() => {
    return Object.entries(updatedAccounts);
  }, [updatedAccounts]);
  //returning icon JSX
  const getIcon = (currency: string) => {
    switch (currency) {
      case "EUR":
        return <EuroIcon fontSize="large" color="primary" />;
        break;
      case "BTC":
        return <CurrencyBitcoinIcon fontSize="large" color="primary" />;
        break;
      default:
        return <AttachMoneyIcon fontSize="large" color="primary" />;
    }
  };
  return (
    <>
      <DashLayout>
        <Box
          sx={{
            background: "#e4e4e4",
            padding: "1.5em 1em",
          }}
        >
          <Typography component="div" variant="h6">
            Wallet : {walletId}
            <CopyContent content={walletId} />
          </Typography>

          <Typography component="div" variant="caption">
            Owner : {ownerType}
          </Typography>
        </Box>

        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2em 4em",
          }}
        >
          {accountEntries.map(([currency, account]) => (
            <Fragment key={currency}>
              <Card key={account?.accountId} className="cardWalletAccount">
                <Box>
                  <Box sx={alignmentRow}>
                    <Box sx={alignmentRow}>
                      <Typography
                        component="div"
                        variant="h5"
                        fontWeight={"bold"}
                      >
                        {currency}
                      </Typography>
                      {currency === "EUR" && (
                        <Tooltip title="Simulate Deposite 100EURO">
                          <Button
                            onClick={() =>
                              handleDepositeEuro(account.accountId)
                            }
                            size="small"
                          >
                            Deposite
                          </Button>
                        </Tooltip>
                      )}
                    </Box>
                    <Box sx={alignmentRow}>
                      {getIcon(currency)}

                      <Typography
                        component="div"
                        variant="h6"
                        fontWeight={"bold"}
                      >
                        {account?.availableBalance?.amount}
                      </Typography>
                    </Box>

                    <Box>
                      {account?.enriched && (
                        <MonetizationOnIcon fontSize="large" color="success" />
                      )}

                      {!account?.enriched && (
                        <Tooltip title="Click here to enrich your account">
                          <LoadingButton
                            size="small"
                            color="secondary"
                            onClick={() =>
                              handleEnrichAccount(account.accountId)
                            }
                            // loading={loading}
                            loadingPosition="start"
                            startIcon={<MoneyOffIcon />}
                            variant="contained"
                          >
                            <span>Enrich</span>
                          </LoadingButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box sx={alignmentRow}>
                  <Typography
                    component="div"
                    variant="caption"
                    className="display_f_sb_center"
                    onClick={(e) => getAccountStatement(account?.accountId)}
                    sx={{
                      "&:hover": {
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    Account Id : {account?.accountId}
                  </Typography>
                  <CopyContent content={account?.accountId} />
                </Box>
                <Box sx={{ ...alignmentRow, gap: "1em" }}>
                  {account?.permissions?.map((item) => {
                    return (
                      <Chip
                        key={item}
                        label={item}
                        size="small"
                        color={getPermissionColor(item)}
                      />
                    );
                  })}
                </Box>
              </Card>
            </Fragment>
          ))}
        </Box>
        <Modal
          aria-labelledby="trxModal"
          aria-describedby="trxModal"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={modalStyle}>
              <Badge badgeContent={transactionsData?.total} color="secondary">
                <ReceiptIcon fontSize="large" color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Transaction List
                </Typography>
              </Badge>
              {transactionsData?.total > 0 && (
                <ul style={{ padding: "2em" }}>
                  {transactionsData?.transactions?.map((item: ITransaction) => {
                    return (
                      <li key={item?.accountId}>
                        <Typography
                          variant="button"
                          display="block"
                          gutterBottom
                        >
                          <strong>
                            {new Date(item.timestamp).toDateString()} |
                          </strong>
                          <span>{item.txType + "-" + item?.txSubType} |</span>

                          <span>
                            Balance Before -{" "}
                            <strong>
                              {item?.balanceBefore.amount +
                                " " +
                                item?.balanceBefore.currency}{" "}
                            </strong>{" "}
                            |
                          </span>
                          <span>
                            Balance after -{" "}
                            <strong>
                              {item?.balanceAfter.amount +
                                " " +
                                item?.balanceAfter.currency}
                            </strong>{" "}
                            |
                          </span>
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              )}
              {transactionsData?.total === 0 && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    No Transaction Found !!!
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>
      </DashLayout>
    </>
  );
}

export default WalletId;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const walletId = context?.params?.walletid as string;
  const userId = context?.query?.user as string;
  const walletInfo = await getWalletById(walletId, userId);
  return {
    props: {
      ...walletInfo,
    },
  };
}
