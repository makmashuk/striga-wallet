import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import styles from "./style.module.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { MuiTelInput } from "mui-tel-input";
import {
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  useFormControl,
} from "@mui/material";
import { useRouter } from "next/router";
import { IUserRegistration } from "@/types/user.type";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "@/context/user";
import { countryCodes } from "@/constans/formconstant";
import {
  generateRandomName,
  generateRandomEmail,
  generateRandomNumber,
} from "@/services/helper.service";

const defaultUser = {
  firstName: generateRandomName(),
  lastName: generateRandomName(),
  email: generateRandomEmail(),
  mobile: {
    countryCode: "+880",
    number: generateRandomNumber(),
  },
  address: {
    addressLine1: "127/Free",
    city: "Tallinn",
    postalCode: "11111",
    country: "EE",
  },
};
const Register = () => {
  const router = useRouter();

  // State variables for user and loading
  const [user, setUser] = useState<IUserRegistration>(defaultUser);
  const [loading, setLoading] = useState(false);

  const { user: currentUser, handleRegister } = useUserContext();

  // State variable for phone number
  const [phone, setPhone] = useState(
    defaultUser.mobile.countryCode + defaultUser.mobile.number
  );

  // Handle phone number change
  const handlePhoneChange = (phoneNumber: any) => {
    const code = phoneNumber.substring(0, 4);
    const updatedMobile = {
      countryCode: code,
      number: phoneNumber.replace(code, ""),
    };
    setPhone(phoneNumber);
    setUser({ ...user, mobile: updatedMobile });
  };

  // Redirect if user is already registered
  useEffect(() => {
    if (currentUser?.userId) {
      router.push(`verify/${currentUser.userId}`);
    }
  }, [currentUser, router]);

  // Handle register button click
  const handleRegisterClick = (event: any) => {
    event.preventDefault();
    const registerPayload = { ...user };
    setLoading(true);
    setTimeout(async () => {
      try {
        const data: any = await handleRegister(registerPayload);
        if (data) {
          router.push(`verify/${currentUser.userId}`);
        }
      } catch (e) {
        enqueueSnackbar("SERVER ERR!", { variant: "error" });
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  // Helper component for email validation message
  function EmailHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "Enter valid email";
      }

      return "* verification needed";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

  return (
    <Grid container className={styles.card} sx={{ padding: "2em" }} spacing={1}>
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
            <TextField
              name="Email"
              label="Email"
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
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box component="form" noValidate autoComplete="off">
          <FormControl sx={{ width: "100%" }}>
            <TextField
              name="Address1"
              label="Address Line"
              value={user.address.addressLine1}
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
            <TextField
              value={user.address.city}
              label="City"
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
            <TextField
              value={user.address.postalCode}
              type="number"
              label="Postal Code"
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
            labelId="country"
            value={user.address.country}
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
      <Grid item xs={12}>
        <Divider sx={{ margin: "1em 0" }}></Divider>
        <LoadingButton
          size="large"
          fullWidth
          onClick={handleRegisterClick}
          loading={loading}
          loadingIndicator="Registering..."
          variant="contained"
          // disabled={!formValues.validation}
        >
          <span> Register Now</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
export default Register;
