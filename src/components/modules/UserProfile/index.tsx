import {
  countryCodes,
  industryList,
  placeOfBirth,
  purposeOfAccount,
  sourceOfFund,
  transactionVolumn,
} from "@/constans/formconstant";
import { useUserContext } from "@/context/user";
import { updateUserService } from "@/services/auth.service";
import { IUser, IVerifiedUser } from "@/types/user.type";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { use, useEffect, useState } from "react";
import dayjs from "dayjs";
const defaultUser = {
  firstName: "John",
  lastName: "Doe",
  address: {
    addressLine1: "123 Main St",
    city: "Anytown",
    postalCode: "12345",
    country: "EE",
  },
  dateOfBirth: {
    month: 10,
    day: 10,
    year: 1991,
  },
  occupation: "",
  sourceOfFunds: "",
  purposeOfAccount: "",
  selfPepDeclaration: false,
  placeOfBirth: "",
  expectedIncomingTxVolumeYearly: "",
  expectedOutgoingTxVolumeYearly: "",
};

export default function UserProfile() {
  const [user, setUser] = useState<IVerifiedUser>(defaultUser);
  const {
    user: currentUser,
    handleVerificationState,
    verificationState,
  } = useUserContext();

  useEffect(() => {
    const { KYC, createdAt, mobile, email, ...profileUser } = currentUser;
    const mergedUser = Object.assign({}, defaultUser, profileUser);
    setUser(mergedUser);
  }, [currentUser]);

  const [loadingState, setLoadingState] = useState(false);
  const handleUpdateProfileClick = async (event: any) => {
    event.preventDefault();
    try {
      const res = await updateUserService(user);
      if (res.status === 200) {
        handleVerificationState(res?.data?.userId);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDatePicker = (data: any) => {
    const dob = { day: data?.$D, month: data?.$M + 1, year: data.$y };
    setUser({
      ...user,
      dateOfBirth: dob,
    });
  };
  return (
    <>
      <Grid container sx={{ zIndex: "-100" }} spacing={3}>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="fname"
            label="First Name"
            name="fname"
            autoComplete="fname"
            autoFocus
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
            autoComplete="lname"
            autoFocus
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <Box component="form" noValidate autoComplete="off">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="address">Address Line </InputLabel>

              <OutlinedInput
                value={user?.address?.addressLine1}
                id="address"
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: {
                      ...user.address,
                      addressLine1: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box component="form" noValidate autoComplete="off">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="city">City</InputLabel>

              <OutlinedInput
                value={user?.address?.city}
                id="city"
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: {
                      ...user.address,
                      city: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box component="form" noValidate autoComplete="off">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="postal">Postal Code</InputLabel>

              <OutlinedInput
                value={user?.address?.postalCode}
                type="number"
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: {
                      ...user.address,
                      postalCode: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="country">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={user?.address?.country || ""}
              label="Country"
              onChange={(e) =>
                setUser({
                  ...user,
                  address: {
                    ...user.address,
                    country: e.target.value,
                  },
                })
              }
            >
              {countryCodes.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="country">Occupation</InputLabel>
            <Select
              labelId="occu-select-label"
              id="occu-select"
              value={user?.occupation || ""}
              label="Country"
              onChange={(e) => setUser({ ...user, occupation: e.target.value })}
            >
              {industryList.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="ss">Source Of Funds</InputLabel>
            <Select
              labelId="s-select-label"
              id="s-select"
              value={user?.sourceOfFunds || ""}
              label="Source Of Fund"
              onChange={(e) =>
                setUser({ ...user, sourceOfFunds: e.target.value })
              }
            >
              {sourceOfFund.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="country">Purpose Of Account</InputLabel>
            <Select
              labelId="pp-select-label"
              id="pp-select"
              value={user?.purposeOfAccount || ""}
              label="Purpose Of Account"
              onChange={(e) =>
                setUser({ ...user, purposeOfAccount: e.target.value })
              }
            >
              {purposeOfAccount.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="ppb">Place Of birth</InputLabel>
            <Select
              labelId="ppb-select-label"
              id="ppb-select"
              value={user?.placeOfBirth || ""}
              label="Place Of Birth"
              onChange={(e) =>
                setUser({ ...user, placeOfBirth: e.target.value })
              }
            >
              {placeOfBirth.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={handleDatePicker}
                defaultValue={dayjs(
                  `${user.dateOfBirth.year}- ${user.dateOfBirth.month}-${user.dateOfBirth.day}`
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="expectedIncomingTxVolumeYearly">
              Expected Incoming Tx Volume Yearly
            </InputLabel>
            <Select
              labelId="expectedIncomingTxVolumeYearly-select-label"
              id="expectedIncomingTxVolumeYearly-select"
              value={user?.expectedIncomingTxVolumeYearly || ""}
              label="Expected Incoming Tx Volume Yearly"
              onChange={(e) =>
                setUser({
                  ...user,
                  expectedIncomingTxVolumeYearly: e.target.value,
                })
              }
            >
              {transactionVolumn.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="expectedOutgoingTxVolumeYearly">
              Expected Outgoing Tx Volume Yearly
            </InputLabel>
            <Select
              labelId="expectedOutgoingTxVolumeYearly-select-label"
              id="expectedIncomingTxVolumeYearly-select"
              value={user?.expectedOutgoingTxVolumeYearly || ""}
              label="Expected Outgoing Tx Volume Yearly"
              onChange={(e) =>
                setUser({
                  ...user,
                  expectedOutgoingTxVolumeYearly: e.target.value,
                })
              }
            >
              {transactionVolumn.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={user?.selfPepDeclaration}
                onChange={(e) =>
                  setUser({
                    ...user,
                    selfPepDeclaration: !user?.selfPepDeclaration,
                  })
                }
              />
            }
            label="Self Prep Declearation"
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdateProfileClick}
            loading={loadingState}
            size="large"
            disabled={!verificationState?.missingFields}
          >
            Update Profile
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
}
