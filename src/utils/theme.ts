import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#25D8BD",
      background: "FFC95E",
    },
    secondary: {
      main: "#FFC95E",
    },
  },
  typography: {
    fontSize: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #EDEFF5",
          height: "5em",
          overflow: "hidden",
          zIndex: 1,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          width: "20px",
          height: "16px",
          backgroundColor: "#6992fc",
          color: "#fff",
          borderRadius: "4px",
          right: "-8px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          height: "100%",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "12px 2px",
        },
      },
    },
  },
});
export default theme;
