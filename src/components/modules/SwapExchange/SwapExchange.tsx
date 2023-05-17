import DashLayout from "@/components/layouts/DashLayout";
import { useWalletContext } from "@/context/wallet";
import { IValidAccount, IWallet } from "@/types/wallet.type";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import EuroIcon from "@mui/icons-material/Euro";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import WalletIcon from "@mui/icons-material/Wallet";
import { instantSwaps } from "@/services/wallet.service";
import { useUserContext } from "@/context/user";
import {
  getMinTradeValue,
  filterCryptocurrenciesAccount,
  getSourceRate,
  getValidSources,
} from "@/services/swap.service";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

function SwapExchange() {
  const [formValues, setFormValues] = useState({
    selectedWallet: {} as IWallet,
    selectedSource: {} as IValidAccount,
    selectedDestination: {} as IValidAccount,
    amount: "",
    memo: "",
    validation: false,
    validAccounts: [] as IValidAccount[],
    validSources: [] as any,
    validSourceRates: [] as any,
    sourceRate: {},
    minAmount: 0,
  });
  const [loading, setLoading] = useState(false);

  //get context values
  const { walletinfo, getUserWallets, rates } = useWalletContext();
  const { user: currentUser } = useUserContext();

  useEffect(() => {
    getUserWallets(currentUser?.userId);
  }, [currentUser?.userId]);

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

  const handleWalletChange = useCallback(
    (wallet: any) => {
      // setSelectedWallet(wallet);
      let validACC: any = [];
      for (let i = 0; i < walletinfo?.wallets?.length; i++) {
        if (walletinfo?.wallets[i]?.walletId === wallet) {
          const allAccounts = walletinfo?.wallets[i]?.accounts;
          validACC = filterCryptocurrenciesAccount(allAccounts);
          // setvalidtAccounts(validAccounts);
          break;
        }
      }
      //updating form state
      setFormValues((prevState) => ({
        ...prevState,
        selectedWallet: wallet,
        validAccounts: validACC,
        selectedDestination: {} as IValidAccount,
        validSources: [] as any,
        validSourceRates: [] as any,
        sourceRate: {},
        minAmount: 0,
        selectedSource: {} as IValidAccount,
        amount: "",
        memo: "Memo",
      }));
    },
    [walletinfo]
  );

  const handleDestinationChange = useCallback(
    (account: IValidAccount) => {
      const validSources = getValidSources(account, rates);
      const filteredValidSources: any = [];
      for (let acc of validSources) {
        for (let obj of formValues.validAccounts) {
          if (acc.currency === obj.currencyType) {
            filteredValidSources.push(obj);
          }
        }
      }
      // setvalidtAccountsSources();
      setFormValues((prevState) => ({
        ...prevState,
        selectedDestination: { ...account },
        validSources: [...filteredValidSources],
        validSourceRates: validSources,
        selectedSource: {} as IValidAccount,
        amount: "",
        memo: `TO - ${account?.currencyType}`,
      }));
    },
    [rates, formValues.validAccounts]
  );
  const handleSourceChange = useCallback(
    (account: IValidAccount) => {
      //getting the rate for the source account
      const rateForTheSource = getSourceRate(
        formValues?.validSourceRates,
        account
      );
      //getting the min trade value
      const minValue = getMinTradeValue(
        rateForTheSource,
        formValues.selectedDestination
      );
      //updating form state
      setFormValues((prevState) => ({
        ...prevState,
        selectedSource: { ...account },
        minAmount: minValue ? minValue : 0,
        amount: "",
        memo: formValues.memo + `:  From - ${account?.currencyType}`,
      }));
    },
    [
      formValues.selectedDestination,
      formValues.validSourceRates,
      formValues.memo,
    ]
  );

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const amount = event.target.value;
    setFormValues((prevState) => ({
      ...prevState,
      amount,
      validation: true,
    }));
  };

  const handleMemoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const memo = event.target.value;
    setFormValues((prevState) => ({
      ...prevState,
      memo,
    }));
  };
  const handleSwapExchange = async () => {
    setLoading(true);
    const payload = {
      userId: currentUser?.userId,
      sourceAccountId: formValues.selectedSource?.accountId,
      destinationAccountId: formValues.selectedDestination?.accountId,
      memo: formValues.memo,
      amount: formValues.amount,
      simulateFailure: false,
    };

    setTimeout(async () => {
      try {
        const data = await instantSwaps(payload);
        if (data?.id) {
          handleResetForm();
          getUserWallets(currentUser?.userId);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  const handleResetForm = () => {
    setFormValues({
      selectedWallet: {} as IWallet,
      selectedSource: {} as IValidAccount,
      selectedDestination: {} as IValidAccount,
      amount: "",
      memo: "",
      validAccounts: [] as IValidAccount[],
      validSources: [] as any,
      validSourceRates: [] as any,
      sourceRate: {},
      minAmount: 0,
      validation: false,
    });
    setLoading(false);
  };

  function getOptionLabel(option: any): any {
    return `${option.currencyType} | Balance : ${option.availableBalance?.amount} ${option.availableBalance?.currency}`;
  }
  function getInputValue(type: string) {
    if (type === "Source") {
      if (formValues?.selectedSource?.currencyType) {
        return `${formValues.selectedSource?.currencyType} - ${formValues.selectedSource?.availableBalance?.amount}`;
      } else {
        return "";
      }
    }
    if (type === "Dest") {
      if (formValues.selectedDestination?.currencyType) {
        return `${formValues.selectedDestination?.currencyType} - ${formValues.selectedDestination?.availableBalance?.amount}`;
      } else {
        return "";
      }
    }
  }
  return (
    <>
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
            <Box>
              <FormControl fullWidth>
                <InputLabel id="wallet-label">Select Wallet</InputLabel>
                <Select
                  labelId="wallet-label"
                  id="wallet-select"
                  value={formValues.selectedWallet}
                  label="Select Wallet"
                  onChange={(e) => handleWalletChange(e.target.value)}
                >
                  {walletinfo?.wallets?.map((item, index) => {
                    return (
                      <MenuItem
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1em",
                        }}
                        key={item?.walletId}
                        value={item?.walletId}
                      >
                        <WalletIcon color="primary" /> Wallet {index + 1}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Autocomplete
                id="destination"
                options={formValues.validAccounts}
                getOptionLabel={getOptionLabel}
                onChange={(event: any, newValue: any | null) => {
                  handleDestinationChange(newValue);
                }}
                inputValue={getInputValue("Dest")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <ArrowCircleRightIcon />
                        </InputAdornment>
                      ),
                    }}
                    label="To Account"
                  />
                )}
                isOptionEqualToValue={(option, value) => option === value}
              />
            </Box>

            <Box>
              <Autocomplete
                id="source"
                options={formValues.validSources}
                getOptionLabel={getOptionLabel}
                onChange={(event: any, newValue: any | null) => {
                  handleSourceChange(newValue);
                }}
                inputValue={getInputValue("Source")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <ArrowCircleLeftIcon />
                        </InputAdornment>
                      ),
                    }}
                    label="From Account"
                  />
                )}
                isOptionEqualToValue={(option, value) => option === value}
              />
            </Box>

            <Box>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  value={formValues.amount}
                  onChange={handleAmountChange}
                  startAdornment={
                    <InputAdornment position="end">
                      {getIcon(formValues?.selectedSource?.currencyType)}
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {formValues?.selectedSource?.availableBalance?.currency}
                    </InputAdornment>
                  }
                  aria-describedby="helper-text"
                  inputProps={{
                    "aria-label": "Amount",
                  }}
                />
                {formValues?.minAmount > 0 && (
                  <FormHelperText id="ohelper-text">
                    Min Transfer Amount -{" "}
                    <b>
                      {" "}
                      {formValues.minAmount.toFixed(0)} -{" "}
                      {formValues?.selectedSource?.availableBalance?.currency}
                    </b>
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="memo"
                  label="Memo"
                  value={formValues.memo}
                  onChange={handleMemoChange}
                  variant="outlined"
                />
              </FormControl>
            </Box>
            <Box>
              <LoadingButton
                size="large"
                fullWidth
                onClick={handleSwapExchange}
                loading={loading}
                loadingIndicator="Swapping..."
                variant="contained"
                disabled={!formValues.validation}
              >
                <span> Swap Exchange</span>
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </DashLayout>
    </>
  );
}

export default SwapExchange;
