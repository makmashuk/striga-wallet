import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { MuiTelInput } from "mui-tel-input";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useFormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useFetchData from "@/hooks/useFetchData.hooks";
import { IUserRegistration } from "@/types/user.type";

const defaultUser = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: {
    countryCode: "+372",
    number: "",
  },
  address: {
    addressLine1: "",
    city: "",
    postalCode: "",
    country: "Estonia",
  },
};
const countries = ["Sweden", "USA", "Estonia", "Franch", "Belgium"];
const Register = () => {
  const router = useRouter();

  const [user, setUser] = useState<IUserRegistration>(defaultUser);
  const [loadingState, setLoadingState] = useState(false);
  const [phone, setPhone] = React.useState(defaultUser.mobile.countryCode);
  //   const { data, loading } = useFetchData("ping", "POST");

  const handlePhoneChange = (phoneNumber: any) => {
    const code = phoneNumber.substring(0, 4); // +372
    const updatedMobile = {
      countryCode: code,
      number: phoneNumber.replace(code, ""), // 1212121,
    };
    setPhone(phoneNumber);
    setUser({ ...user, mobile: updatedMobile });
  };

  const handleLoginClick = (event: any) => {
    event.preventDefault();
    const registerPayload = { ...user };

    registerUser(registerPayload);
    console.log(registerPayload);
  };
  function EmailHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "Enter valid email";
      }

      return "verification needed";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  function PhoneHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "Enter valid Mobile ";
      }

      return "verification needed";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

  return (
    <Grid
      container
      sx={{
        padding: 2,
        margin: "auto",
        textAlign: "center",
        maxWidth: { xs: "100%", md: "40%" },
      }}
      spacing={2}
    >
      <Grid
        item
        xs={12}
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up Here
        </Typography>
      </Grid>
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
            <OutlinedInput
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Please enter email"
            />
            <EmailHelperText />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box component="form" noValidate autoComplete="off">
          <MuiTelInput
            sx={{ width: "100%" }}
            value={phone}
            onChange={handlePhoneChange}
          />
          <PhoneHelperText />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box component="form" noValidate autoComplete="off">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="address">Address Line </InputLabel>

            <OutlinedInput
              value={user.address.addressLine1}
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
      <Grid item xs={4}>
        <Box component="form" noValidate autoComplete="off">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="city">City</InputLabel>

            <OutlinedInput
              value={user.address.city}
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
      <Grid item xs={4}>
        <Box component="form" noValidate autoComplete="off">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="postal">Postal Code</InputLabel>

            <OutlinedInput
              value={user.address.postalCode}
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
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="country">Country</InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            value={user.address.country}
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
            {countries.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLoginClick}
          loading={loadingState}
          size="large"
        >
          Register Now
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
export default Register;
